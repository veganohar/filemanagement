const express = require('express');
const app = express();
const port = 3000;
const db = require("./app/models");
const dbconfig = require("./app/config/db.config");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
var dir = "./uploads";
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.static('uploads'));
db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.port}/${dbconfig.DB}`,{
  useNewUrlParser:true,
  useUnifiedTechnology:true
}).then(() =>{
  console.log("Connected to DB Successfully");
}).catch((err)=>{
  console.error("Error in connecting to DB",err);
  process.exit();
})

require('./app/routes/user.routes')(app);
require('./app/routes/video.routes')(app);