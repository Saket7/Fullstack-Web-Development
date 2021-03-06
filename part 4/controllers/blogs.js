const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

bloglistRouter.get('/:id', async (request, response) => {
  try {
    const resultBlog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(resultBlog.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

bloglistRouter.post('/', async (request, response) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  try {
    const { title, author, url, likes } = request.body

    const user = await User.findById(request.decodedToken.id)

    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user.id,
    })
    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

 
    const populatedBlog = await savedBlog
      .populate('user', { username: 1, name: 1 })
      .execPopulate()

    response.status(201).json(populatedBlog.toJSON())
  } catch (error) {
    response.status(400).end()
  }
})

bloglistRouter.delete('/:id', async (request, response) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(request.params.id)
  const userId = request.decodedToken.id

  if (blog.user.toString() !== userId.toString()) {
    response.status(400).end()
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blogObject = {
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogObject,
    { new: true }
  )


  const populatedBlog = await updatedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate()

  response.json(populatedBlog.toJSON())
})

module.exports = bloglistRouter
