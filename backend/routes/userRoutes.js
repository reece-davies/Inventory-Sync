const express = require('express')
const router = express.Router()

const {LoginUser, SignupUser} = require('../controllers/userController')
const { userVerification  } = require("../middleware/authMiddleware");

// User token verification route (to get user details)
router.post("/", userVerification, (req, res) => {
    res.json({ status: true, username: req.user.username, userId: req.user._id });
  });

// login route
router.post("/login", LoginUser)

// signup route
router.post("/signup", SignupUser)

module.exports = router