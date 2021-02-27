const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
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


verfyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }
    jwt.verify(token,"fimemanagement",(err,decode)=>{
        if(err){
            return res.status(401).send({ message: "Invalid Token" });
        }
        next();
    })
}

const userMiddleware = {
    checkforDuplicateUserName ,
    verfyToken
  };
  module.exports = userMiddleware;