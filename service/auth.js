const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.jwtSecret; 

// Function to create a JWT token
const createToken = (user) => {
    const payload = { username: user.username, role: user.role };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Function to verify a JWT token
const verifyToken = (token) => {
    if (!token) return null;
    return jwt.verify(token, secret);
};

module.exports = { createToken, verifyToken };