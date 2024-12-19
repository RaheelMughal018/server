const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const login = async (req, res, next) => {
  try {
    let token = jwt.sign(
      {
        _id: req.user._id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email,
        phoneNo: req.user.phoneNo,
        active: req.user.active,
      },
      "jwtPrivateKey"
    );
    let datatoRetuen = {
      message: "Login Successfully",
      token: token,
      status: req.user.status,
      role: req.user.role,
      id: req.user._id,
      active: req.user.active,
    };
    return res.status(200).send(datatoRetuen);
  } catch (e) {
    return res.status(402).send({ error: "Something Goes wrong" });
  }
};
module.exports = { login };
