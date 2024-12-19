var express = require("express");
const { QuizAnswer, getAnswer } = require("../controllers/QuizAnswer");
var router = express.Router();

/* GET home page. */
router.post("/", QuizAnswer);
router.get("/:id", getAnswer);
module.exports = router;
