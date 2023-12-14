const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')


// Routers 
const articleRouter = require('./controllers/article')
const userRouter = require('./controllers/user')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const profilesRouter = require('./controllers/profiles')
const tagsRouter = require('./controllers/tags')


// import middleware
const middleware = require('./utils/middleware')


// connect to mongoose DB
mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then( () => {
  logger.info('connected to MongoDB')
})
.catch(error => {
  logger.error('error connecting to MongoDB', error.message)
})

// use cors and express json
app.use(cors())
app.use(express.json())


// use the requestlogger and tokenExtractor middleware
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


// set url for routers and add middleware if neccesary
app.use('/api/articles', middleware.userExtractor,articleRouter)
app.use('api/user', middleware.userExtractor, userRouter)
app.use('/api/users', usersRouter)
app.use('/api/profiles', middleware.userExtractor, profilesRouter)
app.use('/api/users/login', loginRouter)
app.use('/api/tags', tagsRouter)


// last middlewares to handle errors or unknown request
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app


