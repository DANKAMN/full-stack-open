const mongoose = require('mongoose')

// Define the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

// Transform returned document (to remove _id and __v)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create the model
module.exports = mongoose.model('Person', personSchema)