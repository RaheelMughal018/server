var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var BookingSchema = mongoose.Schema({
  NumberClients: Number,
  Price: Number,
  Address: String,

  Building: String,
  City: String,
  State: String,
  Message: String,
  Date: String,
  Time: String,
  canceledBy: { default: "Client", type: String },
  status: {
    type: Number,
    default: 0,
  },
  PaymentStatus: {
    type: Number,
    default: 0,
  },
  screenshot: {
    type: String,
    default: "No",
  },
  ServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserService",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  OwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var booking = mongoose.model("Booking", BookingSchema);
module.exports.booking = booking;
//for sign up
// module.exports.validateUserLogin = validateUserLogin; // for login
