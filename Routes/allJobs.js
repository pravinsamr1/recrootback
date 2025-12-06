const express = require('express')
const router = express.Router()
const alljobs = require('../Models/add-job')
const verify = require('../auth/verifyToken')

router.get('/all-jobs',verify,async(req,res)=>{
     try {
          const jobData = await alljobs.find({})

          res.status(200).json({message : "All jobs", jobData})
     } catch (error) {
          res.status(500).json({message : error.message})
     }
})

module.exports = router