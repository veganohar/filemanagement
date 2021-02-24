const db = require('../models');
const bycript = require('bcrypt');
const User = db.user;

exports.getAllUsers = (req,res) =>{
    User.find((err,users)=>{
        if (err){
            res.status(500).send({message:err});
            return;
        }
        res.send({
            status:200,
            data: users.reverse()
        });
    })
}

exports.registerUser = async (req,res) =>{
    let obj = req.body;
        const user = new User();
         for(let p in obj){
             user[p] = obj[p];
         }
         user.password = await bycript.hash(user.password,8);
         user.save((err,resp)=>{
            if (err){
                res.status(500).send({message:err});
                return;
            }
            res.send({
                status:200,
                data: resp
            });
        })
    }

    exports.signin = (req,res)=>{
        let creds = req.body;
        User.findOne({username:creds.username},(err,user)=>{
            if (err){
                res.status(500).send({message:err});
                return;
            }
            if(!user){
                return res.status(404).send({ message: "User Not found." });
            }
            
            let isValidPw = bycript.compareSync(
                creds.password,
                user.password    
            );
            if(!isValidPw){
                res.status(401).send("Invalid Password");
                return;
            }
            res.send({
                status:200,
                message: "Successfully Logged In"
            });
        })
    }