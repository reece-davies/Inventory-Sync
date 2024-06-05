const User = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const LoginUser = async (req, res) => {
    res.json({mssg: "Login user"})
}

// signup user
const SignupUser = async (req, res) => {
    res.json({mssg: "Signup user"})
}


module.exports = {
    LoginUser,
    SignupUser
}