const bycrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')



// Endpoint for all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('articles')

  response.json(users)
})



// Endpoint for new user
usersRouter.post('/', async (request, response) => {

  const {email, username, password} = request.body 

  if (!email || !username || !password) {
    return response.status(400).json({error: "email or username or password is required"})
  }

  const saltRounds = 10
  const passwordHash = await bycrypt.hash(password, saltRounds)


  const user = new User({
    email,
    username,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})