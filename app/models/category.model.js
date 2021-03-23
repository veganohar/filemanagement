const mongoose = require('mongoose');

const Category = mongoose.model(
    'Category',
    new mongoose.Schema({
        name:String,
        createdOn:{
            type:Date,
            default:Date.now
        }    
    })
);

module.exports = Category;