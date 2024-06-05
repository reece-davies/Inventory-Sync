const express = require('express')
const router = express.Router()

const {LoginUser, SignupUser} = require('../controllers/userController')

// login route
router.post("/login", LoginUser)

// signup route
router.post("/signup", SignupUser)

module.exports = router