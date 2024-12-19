var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var ReviewScheme = mongoose.Schema({
  comment: { default: "no comment", type: String },
  rating: String,
  ServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserService",
  },
  BookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var review = mongoose.model("review", ReviewScheme);
module.exports.review = review;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
