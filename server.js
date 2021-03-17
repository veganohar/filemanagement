const express = require('express');
const app = express();
const port = 3000;
const db = require("./app/models");
const dbconfig = require("./app/config/db.config");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
var dir = "./uploads";
var User = db.user;
var bcrypt = require("bcrypt");
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`);
})
app.use(cors());
app.use(bodyParser.json({limit:"100mb"})); 
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 1000000}));
app.use(express.static('uploads'));
db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.port}/${dbconfig.DB}`,{
  useNewUrlParser:true,
  useUnifiedTechnology:true
}).then(() =>{
  console.log("Connected to DB Successfully");
  createAdmin();

}).catch((err)=>{
  console.error("Error in connecting to DB",err);
  process.exit();
})


createAdmin = ()=>{
  User.estimatedDocumentCount((err,count)=>{
    let pw= "admin"; 
    if(!err&&count===0){
      const user = new User({ 
        username: "admin",
        password: bcrypt.hashSync(pw, 8),
        role : "admin"
      });
      user.save((err,user)=>{
        if (err) {
           console.log(err);
            return;
          }
          console.log(user);
      })
    }
  })
  
}


require('./app/routes/user.routes')(app);
require('./app/routes/video.routes')(app);