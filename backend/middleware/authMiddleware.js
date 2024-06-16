const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data._id) // POTENTIALLY JUST ID
      if (user) return res.json({ status: true, user: user.email_address })
      else return res.json({ status: false })
    }
  })
}