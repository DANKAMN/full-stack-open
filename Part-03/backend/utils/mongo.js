const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const connectionToDatabase = () => {
    mongoose.set('strictQuery', false)

    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((error) => {
            console.log('Error connecting to database', error.message)
        })
}   

module.exports = connectionToDatabase