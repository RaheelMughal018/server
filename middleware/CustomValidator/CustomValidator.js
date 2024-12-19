const mongoose = require("mongoose");

const { body, check, query } = require("express-validator");
const User = require("../../models/user");

const validateEmailExist = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ error: "User with given Email already exist" });
    }
  } catch (e) {
    console.log("🚀 ~ file: CustomValidator.js:15 ~ e:", e);
    return res.status(400).send({ error: e });
  }
  next();
};
const validatepasswordconfirm = (req, res, next) => {
  try {
    if (req.body.password != req.body.confirmPassword)
      return res.status(400).send({ error: "Password Not Match" });
  } catch (e) {
    console.log("🚀 ~ file: CustomValidator.js:25 ~ e:", e);
    return res.status(400).send({ error: e });
  }
  next();
};

const validateCorrectEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(402).send({ error: "User Not Registered" });
    else req.user = user;
  } catch (e) {}
  next();
};

const validateCorrectPassword = async (req, res, next) => {
  try {
    let isValid = await req.user.isValidPassword(req.body.password);
    console.log(isValid);
    if (!isValid)
      return res.status(401).send({ error: "Password is incorrect" });
  } catch (e) {
    console.log(e);
  }
  next();
};

const valueNotEmpty = (value) => {
  return body(value).notEmpty().withMessage(`${value} cannot be empty`);
};

const validateId = (id) => {
  return check(id).custom((value) => {
    const validId = mongoose.Types.ObjectId.isValid(value);
    if (!validId) return Promise.reject("invalid id");
    return validId;
  });
};

module.exports = {
  validateEmailExist,
  validatepasswordconfirm,
  valueNotEmpty,
  validateId,
  validateCorrectPassword,
  validateCorrectEmail,
};
