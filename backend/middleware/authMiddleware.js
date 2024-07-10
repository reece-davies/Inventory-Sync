const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.userVerification = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        try {
            const user = await User.findById(decoded._id);
            if (!user) {
                return res.status(404).json({ status: false, message: 'User not found' });
            }

            req.user = user; // Attach user to request object
            next(); // Proceed to next middleware or route handler
        } catch (error) {
            res.status(500).json({ status: false, message: 'Server error', error: error.message });
        }
    });
};
