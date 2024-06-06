const User = require('../models/userModel')
const mongoose = require('mongoose')

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

        res.status(200).json({email_address, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    LoginUser,
    SignupUser
}