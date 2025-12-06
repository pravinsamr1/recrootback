const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const dotenv = require('dotenv')


const authRoute = (req,res,next)=>{
    const token = req.cookies.token;  // ✅ read token from cookie

    if (!token) {
        return res.status(401).json({ message: "No token, unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // save user data
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports = authRoute