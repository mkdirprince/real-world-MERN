const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




// log request infos to terminal
const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('----')
  next()
}

// get only the token from a request
const getTokenFrom = request => {

  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}


// function to attach the token into request
const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}


// function to attach the user to request
const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request)

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({error: 'invalid token'})
    }

    request.user = await User.findById(decodedToken.id)
  }

  next()
}


// log error message for unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}


// handle errors in the application
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)


  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: error.message})
  }

  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired'})
  }

  next(error)
}

module.exports = {
  getTokenFrom,
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}