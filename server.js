const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

const corsOptions = {
    origin: 'http://35.154.147.11',   // your frontend origin (include protocol and port if any)
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true                  // set true if you use cookies/auth headers
  };
  
app.use(cors(corsOptions));    
app.use(express.json())
app.use(cookieParser())  // ONLY ONCE

// ROUTES
app.use('/api', require('./Routes/register'))
app.use('/api', require('./Routes/login'))
app.use('/api', require('./Routes/home'))
app.use('/api', require('./Routes/addJobs'))
app.use('/api', require('./Routes/allJobs'))
app.use('/api', require('./Routes/deleteJob'))
app.use('/api', require('./Routes/all-jobs-notoken'))

app.get('/', (req,res)=>{
    res.status(200).json({message: "Server Running"})
})

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("Server Connected to DB")
    app.listen(process.env.PORT,"0.0.0.0", ()=>{
        console.log("Server Running on PORT", process.env.PORT)
    })
})
.catch(err=>{
    console.log(err.message);
})