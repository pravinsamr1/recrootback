const express = require('express')
const router = express.Router()
const alljobs = require('../Models/add-job')
const verify = require('../auth/verifyToken')

router.delete('/delete-job/:id',verify,async(req,res)=>{
     try {
          const id = req.params.id
          const jobData = await alljobs.findOneAndDelete(id)

          if(!jobData){
               return res.status(400).json({message : "No Job Found"})
          }

          res.status(200).json({message : "Job Deleted", jobData})
     } catch (error) {
          res.status(500).json({message : error.message})
     }
})

module.exports = router;