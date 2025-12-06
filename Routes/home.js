const express = require('express');
const router = express.Router();
const adminAuth = require('../auth/verifyToken');
const Admin = require('../Models/admin');

router.get('/home', adminAuth, async (req, res) => {
    try {
        // Get all admins (only username and id)
        const admins = await Admin.find({}, "username");

        res.status(200).json({
            message: "Welcome Admin",
            loggedInUser: req.user.username,
            admins: admins
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;