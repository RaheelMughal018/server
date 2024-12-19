const express = require("express");
const { CustomError } = require("../lib/error");
const { booking } = require("../models/Booking");
let router = express.Router();

const { UserServices } = require("../models/userServices");

//update a record, auth, admin,
const CreateBooking = async (req, res, next) => {
  try {
    let bookings = await new booking(req.body);
    if (!bookings) {
      const error = new CustomError("bookings is not created", 400);
      next(error);
    }
    let datatosent = {
      message: "bookings added",
      bookings,
    };
    bookings.save();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("bookings failed", 400);
    next(error);
  }
};

const getOwnerBookings = async (req, res, next) => {
  try {
    let Booking = await booking
      .find({ OwnerId: req.params.id })
      .populate("ServiceId")
      .populate("UserId");
    if (!Booking) {
      const error = new CustomError("not Booking found", 400);
      next(error);
    }
    let datatosent = {
      message: "Booking detail",
      Booking,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getBookings = async (req, res, next) => {
  try {
    let Booking = await booking.find().populate("ServiceId").populate("UserId");
    if (!Booking) {
      const error = new CustomError("not Booking found", 400);
      next(error);
    }
    let datatosent = {
      message: "Booking detail",
      Booking,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getUserBookings = async (req, res, next) => {
  try {
    let Booking = await booking
      .find({ UserId: req.params.id })
      .populate("ServiceId")
      .populate("OwnerId")
      .populate("UserId");
    if (!Booking) {
      const error = new CustomError("not Booking found", 400);
      next(error);
    }
    let datatosent = {
      message: "Booking detail",
      Booking,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const getServiceBookings = async (req, res, next) => {
  try {
    let Booking = await booking
      .find({ ServiceId: req.params.id })
      .populate("ServiceId")
      .populate("OwnerId")
      .populate("UserId");
    if (!Booking) {
      const error = new CustomError("not Booking found", 400);
      next(error);
    }
    let datatosent = {
      message: "Booking detail",
      Booking,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("fetching failed", 400);
    next(error);
  }
};
const updateBookingStatus = async (req, res, next) => {
  try {
    let { status, canceledBy } = req.body;
    let Booking = await booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: status,
        canceledBy,
      },
      { new: true }
    );
    if (!Booking) {
      const error = new CustomError("no Booking found with that name", 400);
      next(error);
    }
    console.log(Booking);
    let datatosent = {
      message: "Booking updated",
      Booking,
    };
    console.log();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

const updateBookingPayment = async (req, res, next) => {
  try {
    let { status } = req.body;
    let Booking = await booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        screenshot: req.file.path,
        PaymentStatus: 1,
      },
      { new: true }
    );
    if (!Booking) {
      const error = new CustomError("no Booking found with that name", 400);
      next(error);
    }
    console.log(Booking);
    let datatosent = {
      message: "Booking updated",
      Booking,
    };
    console.log();
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    let { status } = req.body;

    let booking = await booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
        },
      },
      { new: true }
    );

    if (!booking) {
      const error = new CustomError("no booking found with that name", 400);
      next(error);
    }
    let datatosent = {
      message: "booking updated",
      booking,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("updation failed", 400);
    next(error);
  }
};

module.exports = {
  CreateBooking,
  getServiceBookings,
  getUserBookings,
  updateBookingPayment,
  getOwnerBookings,
  updateBookingStatus,
  updateBooking,
  getBookings,
};
