var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var subCategorySchema = mongoose.Schema({
  name: String,
  detail: String,
  image: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

var subCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports.subCategory = subCategory;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
