const db = require('../models');
const Video = db.video;
var multer = require("../config/multer.config");


exports.getAllVideos = (req, res) => {
  Video.find((err,videos)=>{
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
        status:200,
        data: record,
        message:"Record created succefully"
    });
    })
  });
} 
