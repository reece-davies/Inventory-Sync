const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// function to create token
const CreateToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const LoginUser = async (req, res) => {
    res.json({mssg: "Login user"})
}

// signup user
const SignupUser = async (req, res) => {
    //res.json({mssg: "Signup user"})
    const {email_address, password, username} = req.body
    
    try {
        const user = await User.signup(email_address, password, username)

        // create token
        const token = CreateToken(user._id)

        res.status(200).json({email_address, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    LoginUser,
    SignupUser
}