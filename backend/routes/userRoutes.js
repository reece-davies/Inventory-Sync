const express = require('express')
const router = express.Router()

const {LoginUser, SignupUser} = require('../controllers/userController')
const { userVerification  } = require("../middleware/authMiddleware");

// user token verification
router.post("/", userVerification)

// login route
router.post("/login", LoginUser)

// signup route
router.post("/signup", SignupUser)

module.exports = router