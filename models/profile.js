const mongoose = require('mongoose')

// profile schema
const profileSchema = new mongoose.Schema({
  username: String,
  bio: String,
  image: String,
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ]
})


// clean profile schema
profileSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v
  }
})


module.exports = mongoose.model('Profile', profileSchema)


