const express = require("express");
const { CustomError } = require("../lib/error");

const { Extra } = require("../models/userextraingo");
let router = express.Router();

const createExtra = async (req, res, next) => {
  try {
    let extra = await new Extra(req.body);
    if (!extra) {
      const error = new CustomError("extra is not created", 400);
      next(error);
    }
    let datatosent = {
      message: "extra created",
      extra,
    };
    await extra.save();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};

//update a record
const viewsingleExtra = async (req, res, next) => {
  try {
    const extra = await Extra.findOne({ userId: req.params.id });
    if (!extra) {
      const error = new CustomError("extra is not fetched", 400);
      next(error);
    }

    let datatosent = {
      message: "extra list",
      extra,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};

const updateExtra = async (req, res, next) => {
  try {
    let extra = await Extra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!extra) {
      const error = new CustomError("no extra found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "booking updated",
      extra,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

module.exports = {
  createExtra,

  viewsingleExtra,
  updateExtra,
};
