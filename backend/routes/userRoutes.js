const express = require('express')
const router = express.Router()

const {LoginUser, SignupUser} = require('../controllers/userController')

// login route
router.get("/login", LoginUser)

// signup route
router.get("/signup", SignupUser)

module.exports = router