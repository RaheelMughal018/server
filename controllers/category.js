const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

const { Category } = require("../models/category");

//update a record, auth, admin,
const createCategory = async (req, res, next) => {
  try {
    let category = await new Category(req.body);
    if (!category) {
      const error = new CustomError("category is not created", 400);
      next(error);
    }
    await category.save();
    let datatosent = {
      message: "Category inserted",
      category,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findOneAndUpdate(req.params.id, req.body);
    if (!category) {
      const error = new CustomError("category is not available", 400);
      next(error);
    }
    let datatosent = {
      message: "Category updated",
      category,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Updation Failed", 400);
    next(error);
  }
};

const getsingleCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      const error = new CustomError("category is not find", 400);
      next(error);
    }
    let datatosent = {
      message: "Category detail",
      category,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getallCategory = async (req, res, next) => {
  try {
    let category = await Category.find();
console.log(category)
    let datatosent = {
      message: "Category list",
      category,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Fetching Failed", 400);
    next(error);
  }
  //other way
  // try {
  //   let category = await Category.find();
  //   if (category.length < 1) {

  //     // throw new CustomError("Fetching Faileds", 400);
  //   }
  //   let datatosent = {
  //     message: "Category list",
  //     category,
  //   };
  //   return res.send(datatosent);
  // } catch (e) {
  //   // res.status(e.code || 500).send({ error: e.message });
  // }
};

//update a record

module.exports = {
  createCategory,
  updateCategory,
  getsingleCategory,
  getallCategory,
};
