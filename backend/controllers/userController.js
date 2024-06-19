const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// function to create token
const CreateToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.TOKEN_SECRET, { expiresIn: '3d' })
}

// login user
const LoginUser = async (req, res, next) => {
    const {email, password} = req.body

    let emptyFields = []

    if(!email) {
        emptyFields.push('email')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the required fields", emptyFields})
    }
    
    try {
        const user = await User.login(email, password)

        // create token
        const token = CreateToken(user._id)

        // assign cookie?
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
          });
          res.status(201).json({ message: "User logged in successfully", success: true });
          next()

        //res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const SignupUser = async (req, res, next) => {
    //res.json({mssg: "Signup user"})
    const {email, password, username} = req.body

    let emptyFields = []

    if(!email) {
        emptyFields.push('email')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(!username) {
        emptyFields.push('username')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the required fields", emptyFields})
    }
    
    try {
        const user = await User.signup(email, password, username)

        // create token
        const token = CreateToken(user._id)

        // Assign cookie?
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
          });
          res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
          next();

        //res.status(200).json({email, token}) //no longer required
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    LoginUser,
    SignupUser
}