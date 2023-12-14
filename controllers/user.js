const userRouter = require('express').Router()
const User = require('../models/user')


// Endpoint for getting a user
userRouter.get('/', async (request, response) => {

  const authenticatedUser = request.user
  response.json(authenticatedUser)
})


// Endpoint for updating user details
userRouter.put('/:id', async (request, response) => {
    
    const {email, bio, image} = request.body

    const updatedUser = User.findByIdAndUpdate(request.params.id, {email, bio, image}, {new: true})

    response.json(updatedUser)

})

