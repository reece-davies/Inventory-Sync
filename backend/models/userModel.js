const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

// static signup method 
userSchema.statics.signup = async function(email_address, password, username) {

    // duplicate check for email_address and username
    const emailExists = await this.findOne({ email_address })
    const usernameExists = await this.findOne({ username })

    if (emailExists) {
        throw Error("Email already in use")
    }

    if (usernameExists) {
        throw Error("Username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email_address, password: hash, username })

    return user
}

module.exports = mongoose.model('User', userSchema)