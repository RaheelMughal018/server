var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var Quiz = mongoose.Schema({
  Question: String,
  Answer1: String,
  Answer2: String,
  Answer3: String,

  SubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

var quiz = mongoose.model("Quiz", Quiz);
module.exports.Quiz = quiz;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
