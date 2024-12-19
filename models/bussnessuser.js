var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var bussnessSchema = mongoose.Schema({
  address: String,
  bussnessname: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  accountNo: {
    default: "No",
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bussnessstatus: String,
  accountLink: String,
  about: String,
  cnic: String,
});

var Bussness = mongoose.model("bussnessUser", bussnessSchema);
module.exports.Bussness = Bussness;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
