const db = require('../models');
const Category = db.category;

checkforDuplicateCatName = (req,res,next)=>{
    let name = req.body.name;
    Category.count({name:name},(err,count)=>{
        if(count>0){
             res.status(400).send({ message: "Category name already exist" });
             return
        }
        next();
    }); 
}



const userMiddleware = {
    checkforDuplicateCatName ,
    
  };
  module.exports = userMiddleware;