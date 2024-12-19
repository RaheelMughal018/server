const express = require("express");
const { CustomError } = require("../lib/error");
let router = express.Router();

// Assuming CustomError is defined here
const { Quiz } = require("../models/PalmistQuiz");

const createQuiz = async (req, res, next) => {
  try {
    const { Question, Answer1, Answer2, Answer3 } = req.body;

    // Validate input
    if (!Question || !Answer1 || !Answer2 || !Answer3) {
      return next(new CustomError("All fields are required", 400));
    }

    // Create a new instance of the Quiz model
    const quiz = new Quiz(req.body);

    // Save the instance to the database
    const savedQuiz = await quiz.save();

    // Send success response
    return res.status(201).json({
      message: "Quiz created successfully",
      quiz: savedQuiz,
    });
  } catch (e) {
    console.error("Error creating quiz:", e); // Log the error for debugging
    return next(new CustomError("Quiz creation failed", 500));
  }
};

const getAllQuiz = async (req, res, next) => {
  try {
    let quiz = await Quiz.find().populate("SubCategoryId");
    console.log(quiz);
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
const getSingleQuiz = async (req, res, next) => {
  try {
    let quiz = await Quiz.findById(req.params.id).populate("SubCategoryId");
    console.log(quiz);
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
const deleteQuiz = async (req, res, next) => {
  try {
    let quizP = await Quiz.findByIdAndDelete(req.params.id);
    if (!quizP) {
      const error = new CustomError("no quizP found", 400);
      next(error);
    }
    let datatosent = {
      message: "quizP delete",
      quizP,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("deletion failed", 400);
    next(error);
  }
};
const getSubQuiz = async (req, res, next) => {
  try {
    let quiz = await Quiz.find({ SubCategoryId: req.params.id }).populate(
      "SubCategoryId"
    );
    console.log(quiz);
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

const updateQuiz = async (req, res, next) => {
  try {
    const { Question, Answer1, Answer2, Answer3 } = req.body;
    let quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Question,
          Answer1,
          Answer2,
          Answer3,
        },
      },
      { new: true }
    );
    if (!quiz) {
      const error = new CustomError("quiz is not available", 400);
      next(error);
    }
    let datatosent = {
      message: "quiz updated",
      quiz,
    };
    return res.send(datatosent);
  } catch (e) {
    const error = new CustomError("Updation Failed", 400);
    next(error);
  }
};
// const updateCategory = async (req, res, next) => {
//   try {
//     let quiz = await Category.findOneAndUpdate(req.params.id, req.body);
//     if (!quiz) {
//       const error = new CustomError("quiz is not available", 400);
//       next(error);
//     }
//     let datatosent = {
//       message: "Category updated",
//       quiz,
//     };
//     return res.send(datatosent);
//   } catch (e) {
//     const error = new CustomError("Updation Failed", 400);
//     next(error);
//   }
// };

// const getallCategory = async (req, res, next) => {
//   try {
//     let quiz = await Category.find();
//     console.log(quiz);
//     let datatosent = {
//       message: "Category list",
//       quiz,
//     };
//     return res.send(datatosent);
//   } catch (e) {
//     const error = new CustomError("Fetching Failed", 400);
//     next(error);
//   }
//   //other way
//   // try {
//   //   let quiz = await Category.find();
//   //   if (quiz.length < 1) {

//   //     // throw new CustomError("Fetching Faileds", 400);
//   //   }
//   //   let datatosent = {
//   //     message: "Category list",
//   //     quiz,
//   //   };
//   //   return res.send(datatosent);
//   // } catch (e) {
//   //   // res.status(e.code || 500).send({ error: e.message });
//   // }
// };

//update a record

module.exports = {
  createQuiz,
  getAllQuiz,
  deleteQuiz,
  getSubQuiz,
  updateQuiz,
  getSingleQuiz,
};
