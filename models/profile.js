const mongoose = require('mongoose')


const profileSchema = new mongoose.Schema({
  username: String,
  bio: String,
  image: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  ]
})

profileSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v
  }
})


module.exports = mongoose.model('Profile', profileSchema)


