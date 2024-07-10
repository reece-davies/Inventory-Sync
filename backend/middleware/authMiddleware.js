const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data._id)
      //req.user = user
      if (user) return res.json({ status: true, username: user.username, userId: user._id }) // or username? (online guide uses username)
      else return res.json({ status: false })
    }
  })
}