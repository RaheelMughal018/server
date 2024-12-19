const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

const { UserServices } = require("../models/userServices");

//update a record, auth, admin,
const createuserservices = async (req, res, next) => {
  console.log(req.body);
  try {
    const data = {
      name: req.body.name,
      detail: req.body.detail,
      subCategoryId: req.body.subCategoryId,
      categoryId: req.body.categoryId,
      userid: req.body.userid,
      image: req.file.path,
      BussnesId: req.body.BussnesId,
      serviceCode: req.body.serviceCode,
      Price: req.body.Price,
      ServiceType: req.body.ServiceType,
      address: req.body.address,
    };
    let userServices = await new UserServices(data);
    if (!userServices) {
      const error = new CustomError("Services is not created", 400);
      next(error);
    }
    let datatosent = {
      message: "Services added",
      userServices,
    };
    userServices.save();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};
const updateuserservices = async (req, res, next) => {
  try {
    let userServices = await UserServices.findOneAndUpdate(
      req.params.id,
      req.body
    );
    if (!userServices) {
      const error = new CustomError("userServices is not available", 400);
      next(error);
    }
    let datatosent = {
      message: "UserServices updated",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Updation Failed", 400);
    next(error);
  }
};
const updateServices = async (req, res, next) => {
  try {
    let { name, detail, ServiceType, Price } = req.body;
    console.log(2);
    let userServices = await UserServices.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          detail,
          ServiceType,
          Price,
        },
      },
      { new: true }
    );

    if (!userServices) {
      const error = new CustomError(
        "no userServices found with that name",
        400
      );
      next(error);
    }

    let datatosent = {
      message: "UserServices updated",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Updation Failed", 400);
    next(error);
  }
};

const getUserServiceByCategory = async (req, res, next) => {
  try {
    let userServices = await UserServices.find({
      subCategoryId: req.params.id,
    })
      .populate("subCategoryId")
      .populate("userid")
      .populate("BussnesId");
    if (!userServices) {
      const error = new CustomError("userServices is not find", 400);
      next(error);
    }
    let datatosent = {
      message: "UserServices detail",
      userServices,
    };
    console.log(userServices);
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getmultiidSub = async (req, res, next) => {
  try {
    console.log(req.body);
    let userServices = await UserServices.find({
      _id: { $in: [...req.body.ids] },
    })
      .populate("subCategoryId")
      .populate("BussnesId")
      .populate("userid");

    if (!userServices) {
      const error = new CustomError("userServices is not find", 400);
      next(error);
    }
    let datatosent = {
      message: "UserServices detail",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError(e, 400);
    next(error);
  }
};
const getalluserservices = async (req, res, next) => {
  try {
    let userServices = await UserServices.find()
      .populate("subCategoryId")
      .populate("BussnesId")
      .populate("userid");

    let datatosent = {
      message: "UserServices list",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Fetching Failed", 400);
    next(error);
  }
};
const getUserservicesByUser = async (req, res, next) => {
  try {
    let userServices = await UserServices.find({
      userid: req.params.id,
    })
      .populate("BussnesId")
      .populate("userid")

      .populate("subCategoryId");

    let datatosent = {
      message: "UserServices list",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Fetching Failed", 400);
    next(error);
  }
};
const deleteServices = async (req, res, next) => {
  try {
    let userServices = await UserServices.findByIdAndDelete(req.params.id);
    if (!userServices) {
      const error = new CustomError("no userServices found", 400);
      next(error);
    }
    let datatosent = {
      message: "subCategory delete",
      userServices,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("deletion failed", 400);
    next(error);
  }
};
//update a record

module.exports = {
  createuserservices,
  updateuserservices,
  getUserServiceByCategory,
  getUserservicesByUser,
  getalluserservices,
  deleteServices,
  getmultiidSub,
  updateServices,
};
