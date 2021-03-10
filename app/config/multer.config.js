var multer  = require('multer');
const path = require("path")
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) {
    let fname = (file.originalname.replace(/[^A-Z0-9]+/ig, "_") + "_" + Date.now() + path.extname(file.originalname)).toLowerCase();
     cb(null , fname);   
  }
});
var upload = multer({ storage: storage,limits: { fileSize: '5mb' } })
module.exports = {  
    multiple : upload.array('videos', 10),
    single : upload.single('video'), 
    none:upload.none(),
    fields:upload.fields([{name:"video", maxCount:1},{name:"thumbnail", maxCount:1}])
}  