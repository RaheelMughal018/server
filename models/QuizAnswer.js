var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var QuizAnswer = mongoose.Schema({
  Answer: [
    {
      type: mongoose.Schema({
        answer: String,
        name: String,
      }),
    },
  ],

  ServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserService",
  },
  SubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

var quizAnswer = mongoose.model("QuizAnswer", QuizAnswer);
module.exports.QuizAnswers = quizAnswer;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
