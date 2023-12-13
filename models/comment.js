const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v
  }
})


module.exports = mongoose.model('Comment', commentSchema)


