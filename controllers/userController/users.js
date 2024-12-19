const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../../lib/error");
const User = require("../../models/user");
const crypto = require("crypto");

const allusers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      const error = new CustomError("user is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "user list",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    console.log("🚀 ~ file: users.js:22 ~ e:", e);
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const businessusers = async (req, res, next) => {
  try {
    const user = await User.find({ role: "bussness" });
    if (!user) {
      const error = new CustomError("user is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "user list",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const buyingusers = async (req, res, next) => {
  try {
    const user = await User.find({ role: "user" });
    if (!user) {
      const error = new CustomError("user is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "user list",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const approveusers = async (req, res, next) => {
  try {
    const user = await User.find({ status: "true", role: "business" });
    if (!user) {
      const error = new CustomError("user is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "user list",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const updateuser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    if (!user) {
      const error = new CustomError("user is not updated", 400);
      next(error);
    }

    let datatosent = {
      message: "user is updated",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const deleteuser = async (req, res, next) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const error = new CustomError("no user found", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory delete",
      user,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("deletion failed", 400);
    next(error);
  }
};

const updateLogin = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body
    );
    if (!user) {
      const error = new CustomError("user is not updated", 400);
      next(error);
    }

    let datatosent = {
      message: "user is updated",
      user,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};

const confirmEmail = async (req, res) => {
  try {
    console.log(req.body.token);
    const user = await User.findOne({
      resetToken: req.body.token,
    });

    if (!user)
      return res.status(422).json({ error: "Try again session expired" });

    user.resetToken = "";
    user.active = true;
    await user.save();
    res.json({ message: "Email Approved" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  allusers,
  businessusers,
  buyingusers,
  updateuser,
  deleteuser,
  updateLogin,
  confirmEmail,
};
