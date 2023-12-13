const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')


const articleRouter = require('./controllers/article')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const profilesRouter = require('./controllers/profiles')
const tagsRouter = require('./controllers/tags')
const middleware = require('./utils/middleware')


mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then( () => {
  logger.info('connected to MongoDB')
})
.catch(error => {
  logger.error('error connecting to MongoDB', error.message)
})


app.use(cors())
app.use(express.json())


app.use(middleware.requestLogger)


app.use('/api/articles', articleRouter)
app.use('/api/users', usersRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/users/login', loginRouter)
app.use('/api/tags', tagsRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app


