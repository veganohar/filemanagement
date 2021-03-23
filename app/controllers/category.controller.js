const { category } = require('../models');
const db = require('../models');
const Category = db.category;


exports.getAllCategories = (req, res) => {
  Category.find((err,categories)=>{
    if (err){
        res.status(500).send({message:err});
        return;
    }
    res.send({
        status:200,
        data: categories.reverse()
    });
})
}

exports.saveNewCategory = (req,res)=>{
    let category = new Category();
    category.name = req.body.name;
    category.save((err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          status:201,
          data: category,
          message:"Record created succefully"
      });
      });
}


exports.updateCategory = (req,res)=>{
    category.updateOne({_id:req.body.id},req.body,(err,resp)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({
            status:204,
            message:"Record Updated succefully"
        });
    })
}

exports.deleteCategory = (req,res)=>{
    Category.deleteOne({_id:req.params.cid},(err,resp)=>{
        if (err){
            res.status(500).send({message:err});
            return;
        }    
        res.send({
            status:204,
            message:"Record Deleted succefully"
        });
    })
} 

