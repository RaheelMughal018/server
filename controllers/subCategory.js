const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

const { subCategory } = require("../models/subcategory");

//update a record, auth, admin,
const createSubCategory = async (req, res, next) => {
  try {
    console.log(2);
    let subCate = {
      image: req.file.path,
      name: req.body.name,
      detail: req.body.detail,

      categoryId: req.body.categoryId,
    };
    console.log(subCate);
    let subcategory = await new subCategory(subCate);
    if (!subcategory) {
      const error = new CustomError(
        "please carefully fill all the fields",
        400
      );
      next(error);
    }
    await subcategory.save();
    let datatosent = {
      message: "subCategory updated",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("creation failed", 400);
    next(error);
  }
};
const updateSubCategorywithImage = async (req, res, next) => {
  try {
    let { name, detail } = req.body;
    let subcategory = await subCategory.findOneAndUpdate(req.params.id, {
      name,
      detail,
      image: req.file.path,
    });
    if (!subcategory) {
      const error = new CustomError("no subcategory found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory updated",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};
const updateSubCategory = async (req, res, next) => {
  try {
    let { name, detail } = req.body;
    console.log(2);
    let subcategory = await subCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          detail,
        },
      },
      { new: true }
    );
    console.log(3, subcategory);
    if (!subcategory) {
      const error = new CustomError("no subcategory found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory updated",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

const getsingleSubCategory = async (req, res, next) => {
  try {
    let subcategory = await subCategory
      .findById(req.params.id)
      .populate("categoryId");
    if (!subcategory) {
      const error = new CustomError("not subcategories found", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory detail",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getallSubCategory = async (req, res, next) => {
  try {
    let subcategory = await subCategory.find().populate("categoryId");
    if (!subcategory) {
      const error = new CustomError("no subcategory", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory list",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getbyCategory = async (req, res, next) => {
  console.log(req.params.id);
  try {
    let subcategory = await subCategory
      .find({
        categoryId: req.params.id,
      })
      .populate("categoryId");
    console.log(subcategory);
    if (!subcategory) {
      const error = new CustomError("no category", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory list",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const deleteSubCategory = async (req, res, next) => {
  try {
    let subcategory = await subCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      const error = new CustomError("no subcategory found", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory delete",
      subcategory,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("deletion failed", 400);
    next(error);
  }
};
//update a record

module.exports = {
  createSubCategory,
  updateSubCategory,
  getsingleSubCategory,
  getallSubCategory,
  getbyCategory,
  deleteSubCategory,
  updateSubCategorywithImage,
};
