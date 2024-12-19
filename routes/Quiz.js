const {
  createQuiz,
  getAllQuiz,
  deleteQuiz,
  getSubQuiz,
  updateQuiz,
  getSingleQuiz,
} = require("../controllers/Quiz");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", createQuiz);
router.get("/", getAllQuiz);
router.delete("/:id", deleteQuiz);
router.get("/:id", getSubQuiz);
router.put("/:id", updateQuiz);
router.get("/single/:id", getSingleQuiz);

module.exports = router;
