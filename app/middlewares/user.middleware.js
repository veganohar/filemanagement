const db = require('../models');
const User = db.user;

checkforDuplicateUserName = (req,res,next)=>{
    let uname = req.body.username;
    User.count({username:uname},(err,count)=>{
        if(count>0){
             res.status(400).send({ message: "Username already exist" });
             return
        }
        next();
    }); 
}

const userMiddleware = {
    checkforDuplicateUserName 
  };
  module.exports = userMiddleware;