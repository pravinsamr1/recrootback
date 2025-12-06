const express = require('express')
const Admin = require('../Models/admin')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/admin-login', async(req,res)=>{
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All Fields Required" })
        }

        const user = await Admin.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "Admin Not Registered" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({ message: "Admin LoggedIN" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router