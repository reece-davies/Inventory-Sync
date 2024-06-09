const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

    // validation
    if (!email_address || !password || !username) {
        throw Error("All fields must be filled out")
    }

    if (!validator.isEmail(email_address)) {
        throw Error("Email is not valid")
    }
    
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    } 

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

// static login method
userSchema.statics.login = async function(email_address, password) {

    if (!email_address || !password) {
        throw Error("All fields must be filled out")
    }

    const user = await this.findOne({ email_address })
    //const usernameExists = await this.findOne({ username })

    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)