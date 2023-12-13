const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
  slug: String,
  title: String,
  description: String,
  body: String,
  tagList: [ { type: String } ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  favorited: Boolean,
  favoritesCount: Number,
  following: Boolean,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

articleSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()

    delete returnObject._id
    delete returnObject.__v
  }
})


module.exports = mongoose.model('Article', articleSchema)


