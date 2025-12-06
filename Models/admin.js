const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Admin', Admin)