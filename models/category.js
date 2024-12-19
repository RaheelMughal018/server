var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var categorySchema = mongoose.Schema({
  name: String,
});

var Category = mongoose.model("Category", categorySchema);
module.exports.Category = Category;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
