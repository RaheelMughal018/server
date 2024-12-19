var express = require("express");
const {
  getallCategory,
  updateCategory,
  getsingleCategory,
  createCategory,
} = require("../controllers/category");
const auth = require("../middleware/auth");
const {
  valueNotEmpty,
} = require("../middleware/CustomValidator/CustomValidator");
const { validate } = require("../middleware/CustomValidator/validatehandler");
var router = express.Router();

/* GET home page. */
router.get("/", getallCategory);
// router.get("/:id", validate([valueNotEmpty("name")]), getsingleCategory);
router.post("/", createCategory);
router.get("/:id", getsingleCategory);

router.put("/:id", updateCategory);

module.exports = router;
