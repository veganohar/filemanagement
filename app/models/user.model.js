const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username:String,
        password:String,
        isActive:Boolean,
        role:{
            type:String,
            default:"user"
        }    
    })
);

module.exports = User;