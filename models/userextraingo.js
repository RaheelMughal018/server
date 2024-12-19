var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var extraSchema = mongoose.Schema({
  address: String,

  state: {
    type: String,
  },
  city: {
    default: "no",
    type: String,
  },
  building: {
    default: "no",
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var Extra = mongoose.model("extra", extraSchema);
module.exports.Extra = Extra;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
