const express = require('express')
const router = express.Router()
const alljobs = require('../Models/add-job')


router.get('/all-jobs/recroot',async(req,res)=>{
     try {
          const jobData = await alljobs.find({})

          res.status(200).json({message : "All jobs", jobData})
     } catch (error) {
          res.status(500).json({message : error.message})
     }
})

module.exports = router;