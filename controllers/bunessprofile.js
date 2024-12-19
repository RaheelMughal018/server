const express = require("express");
const { CustomError } = require("../lib/error");
const { Bussness } = require("../models/bussnessuser");
let router = express.Router();

const createbuesness = async (req, res, next) => {
  try {
    let data = {
      address: req.body.address,
      categoryId: req.body.categoryId,
      bussnessstatus: req.body.bussnessstatus,
      accountLink: req.body.accountLink,
      userId: req.body.userId,
      bussnessname: req.body.bussnessname,
      about: req.body.about,
      cnic: req.file.path,
    };

    let bussness = await new Bussness(data);
    if (!bussness) {
      const error = new CustomError("bussness is not created", 400);
      next(error);
    }
    let datatosent = {
      message: "bussness created",
      bussness,
    };
    await bussness.save();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};
const viewbussnessUser = async (req, res, next) => {
  try {
    const bussness = await Bussness.find()
      .populate("userId")
      .populate("categoryId");
    if (!bussness) {
      const error = new CustomError("bussness is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "bussness list",
      bussness,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
//update a record
const viewsinglebussness = async (req, res, next) => {
  try {
    const bussness = await Bussness.findOne({ userId: req.params.id }).populate(
      "categoryId"
    );
    if (!bussness) {
      const error = new CustomError("bussness is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "bussness list",
      bussness,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let bussness = await Bussness.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!bussness) {
      const error = new CustomError("no bussness found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "booking updated",
      bussness,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};
const updateAccount = async (req, res, next) => {
  try {
    let { accountNo } = req.body;

    let bussness = await Bussness.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          accountNo,
        },
      },
      { new: true }
    );

    if (!bussness) {
      const error = new CustomError("no bussness found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "booking updated",
      bussness,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

module.exports = {
  createbuesness,
  viewbussnessUser,
  updateAccount,
  viewsinglebussness,
  updateProfile,
};
