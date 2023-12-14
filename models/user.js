const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


// user schema
const userSchema = new mongoose.Schema({
  email: String,
  username: {
    type: String,
    minLength: 3,
    unique: true
  },
  passwordHash: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    }
  ]
})


// clean up schema
userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v

    delete returnObject.passwordHash
  }
})

// plugin for uniqueness
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)


