const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.video = require('./video.model');
db.category = require('./category.model');
module.exports = db;