const mongoose = require('mongoose');

const Video = mongoose.model(
    'Video',
    new mongoose.Schema({
        title:String,
        video:String,
        thumbnail:String,
        create_on:{
            type:Date,
            default: Date.now
        }      
    })
);

module.exports = Video;