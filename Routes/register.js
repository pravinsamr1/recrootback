const express = require('express')
const Admin = require('../Models/admin')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/admin-register', async(req,res)=>{
    try {
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json({message:"All Fields Required"})
        }

        const checkUser = await Admin.findOne({username})

        if(checkUser){
            return res.status(400).json({message: "Admin Already Registred"})
        }

        const hashpass = await bcrypt.hash(password, 10)

        await Admin.create({
            username,
            password: hashpass,
        })

        res.status(200).json({message: "Admin Registred"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router