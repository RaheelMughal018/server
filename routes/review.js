var express = require("express");
const {
  createReview,
  getReview,
  getReviews,
} = require("../controllers/review");

const auth = require("../middleware/auth");
const {
  valueNotEmpty,
} = require("../middleware/CustomValidator/CustomValidator");
const { validate } = require("../middleware/CustomValidator/validatehandler");
var router = express.Router();

/* GET home page. */
// router.get("/", getallCategory);
// router.get("/:id", validate([valueNotEmpty("name")]), getsingleCategory);
router.post("/", createReview);
router.get("/all", getReviews);
router.get("/:id", getReview);

// router.get("/:id", getsingleCategory);

// router.put("/:id", updateCategory);

module.exports = router;
