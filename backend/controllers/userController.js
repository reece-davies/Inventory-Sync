const User = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const LoginUser = async (req, res) => {
    //res.json({mssg: "GET all groups"})
    try {
        //
        res.status(200).json(group)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const SignupUser = async (req, res) => {
    res.json({mssg: "Signup user"})
    
}


module.exports = {
    LoginUser,
    SignupUser
}