const express = require('express')
const jobs = require('../Models/add-job')
const verify = require('../auth/verifyToken')
const router = express.Router()

router.post('/add-jobs', verify, async (req, res) => {
  try {
    const { jobname, experience, salary, location, description } = req.body;

    if (!jobname || !experience || !salary || !location || !description) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    // Insert job
    const newJob = await jobs.create({
      jobname,
      experience,
      salary,
      location,
      description
    });

    res.status(200).json({ message: "Job Added", job: newJob });

  } catch (error) {
    // Duplicate key error handling
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Job name already exists",
        duplicateField: error.keyValue
      });
    }

    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;