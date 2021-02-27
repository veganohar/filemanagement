const controller = require("../controllers/user.controller");
const { usermiddleware } = require("../middlewares");

module.exports = function (app){
    app.use(function(req,res,next){
        req.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post("/api/users/signin",controller.signin);
    app.get("/api/users/getAllUsers",[usermiddleware.verfyToken],controller.getAllUsers);
    app.post("/api/users/registerUser",[usermiddleware.checkforDuplicateUserName],controller.registerUser); 
}


