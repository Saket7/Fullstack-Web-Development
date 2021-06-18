const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Usermodel = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body
    const user = await Usermodel.findOne({ username })
    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false

    if (!user || !passwordCorrect) {
      return response.status(401).json({
        error: 'username or password invalid',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = loginRouter
