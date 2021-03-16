const controller = require("../controllers/video.controller");
const { usermiddleware } = require("../middlewares");
module.exports = function (app){
    app.use(function(req,res,next){
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post("/api/videos/saveNewVideo",[usermiddleware.verfyToken],controller.saveNewVideo);
    app.get("/api/videos/getAllVideos",controller.getAllVideos);
    app.delete("/api/videos/removeVideo/:vid",[usermiddleware.verfyToken],controller.removeVideo);
}


