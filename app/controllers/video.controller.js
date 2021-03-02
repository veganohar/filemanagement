const db = require('../models');
const User = db.user;
var multer = require("../config/multer.config");
exports.getAllVideos = (req,res)=>{

} 


exports.saveNewVideo = (req,res)=>{
    multer.single(req,res,(err)=>{
        if (err) {
           return res.status(400).send(err);
          }
        //   console.log(req.files);
          res.send("testing");
    });
} 
