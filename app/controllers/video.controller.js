const db = require('../models');
const Video = db.video;
var multer = require("../config/multer.config");
var fs = require('fs');


exports.getAllVideos = (req, res) => {
  Video.find().populate("category").exec((err,videos)=>{
    if (err){
        res.status(500).send({message:err});
        return;
    }
    res.send({
        status:200,
        data: videos.reverse()
    });
})
}

exports.saveNewVideo = (req, res) => {
  multer.fields(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    let video = new Video();
    video.title = req.body.title;
    video.video = req.files.video[0].filename;
    video.thumbnail = req.files.thumbnail[0].filename;
    video.save(err, record => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        status:201,
        data: record,
        message:"Record created succefully"
    });
    })
  });
} 


exports.removeVideo = (req, res) => {
  Video.findOneAndDelete({_id:req.params.vid},(err,response)=>{
    if (err){
        res.status(500).send({message:err});
        return;
    }
    let files = [response.video,response.thumbnail];
    deleteFiles(files, (err)=> {
      if (err) {
        console.log(err);
      } else {
        console.log('all files removed');
      }
      res.send({
        status:204,
        message: "Record Deleted Successfully"
    });
    });
})
}


function deleteFiles(files, callback){
  var i = files.length;
  files.forEach(filepath=>{
    fs.unlink(`uploads/${filepath}`, (err)=> {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}
