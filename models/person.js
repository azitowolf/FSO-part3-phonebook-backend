const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI
debugger
console.log('connecting to', url)
mongoose.set('useCreateIndex', true)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {type: String, unique: true, minlength: 3},
    number: {type: String, minLength: 8},
  })
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)