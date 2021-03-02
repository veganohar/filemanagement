const controller = require("../controllers/video.controller");

module.exports = function (app){
    app.use(function(req,res,next){
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post("/api/videos/saveNewVideo",controller.saveNewVideo);
    app.get("/api/videos/getAllVideos",controller.getAllVideos);

}


