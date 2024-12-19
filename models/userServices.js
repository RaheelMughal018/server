var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userServicesScheme = mongoose.Schema({
  name: String,
  detail: String,
  address: String,
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  BussnesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bussnessUser",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,

  serviceCode: {
    type: String,
  },
  Price: Number,
  ServiceType: {
    type: String,
  },
});

var userServices = mongoose.model("UserService", userServicesScheme);
module.exports.UserServices = userServices;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
