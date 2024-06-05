const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email_address: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)