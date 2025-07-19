const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [8, 'Phone number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number (e.g. 09-1234567)`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
