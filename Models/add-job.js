const mongoose = require('mongoose')

const addJobs = new mongoose.Schema({
     jobname:{type: String,
          required : true,
          unique : true
     },
     experience:
     {
          type: String,
          required: true
     },
     salary:{
          type: String,
          required : true
     },
     location:{
          type: String,
          required: true
     },
     description:{
          type: String,
          required: true
     }
},{
     timestamps: true
})


module.exports = mongoose.model('Jobs', addJobs)