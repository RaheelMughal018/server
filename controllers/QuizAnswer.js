const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

const { Quiz } = require("../models/PalmistQuiz");
const { QuizAnswers } = require("../models/QuizAnswer");

//update a record, auth, admin,

const getAnswer = async (req, res, next) => {
  try {
    let quiz = await QuizAnswers.find({
      SubCategoryId: req.params.id,
    })
      .populate("SubCategoryId")
      .populate("ServiceId");

    console.log("🚀 ~ quiz-----------back line 18", quiz);
    let datatosent = {
      message: "Quiz list",
      quiz,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Fetching Failed", 400);
    next(error);
  }
};
const QuizAnswer = async (req, res, next) => {
  try {
    console.log(req.body);
    let quizAnswer = await new QuizAnswers(req.body);
    if (!quizAnswer) {
      const error = new CustomError("quizAnswer is not created", 400);
      next(error);
    }
    await quizAnswer.save();
    let datatosent = {
      message: "Quiz inserted",
      quizAnswer,
    };

    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Creation failed", 400);
    next(error);
  }
};

module.exports = {
  QuizAnswer,
  getAnswer,
};
