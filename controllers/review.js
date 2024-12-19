const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

const { review } = require("../models/review");

//update a record, auth, admin,
const createReview = async (req, res, next) => {
  try {
    let Reviews = await new review(req.body);
    if (!Reviews) {
      const error = new CustomError("Reviews is not created", 400);
      next(error);
    }
    await Reviews.save();
    let datatosent = {
      message: "Category inserted",
      Reviews,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    let Reviews = await Category.findOneAndUpdate(req.params.id, req.body);
    if (!Reviews) {
      const error = new CustomError("Reviews is not available", 400);
      next(error);
    }
    let datatosent = {
      message: "Category updated",
      Reviews,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Updation Failed", 400);
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    let Reviews = await review.find({ ServiceId: req.params.id });
    if (!Reviews) {
      const error = new CustomError("Reviews is not find", 400);
      next(error);
    }
    let datatosent = {
      message: "Category detail",
      Reviews,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getReviews = async (req, res, next) => {
  try {
    console.log(2);
    let Reviews = await review.find();
    console.log(Reviews);
    if (!Reviews) {
      const error = new CustomError("Reviews is not find", 400);
      next(error);
    }
    let datatosent = {
      message: "Category detail",
      Reviews,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};

//update a record

module.exports = {
  createReview,
  getReview,
  getReviews,
};
