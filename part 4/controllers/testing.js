const router = require('express').Router()
const Blog = require('../models/blog')
const Usermodel = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await Usermodel.deleteMany({})

  response.status(204).end()
})

module.exports = router
