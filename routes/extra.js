var express = require("express");

const {
  createExtra,
  viewsingleExtra,
  updateExtra,
} = require("../controllers/extrainfo");

const { upload } = require("../multer/fileupload");
var router = express.Router();

/* GET home page. */
router.post("/", createExtra);
router.get("/:id", viewsingleExtra);

router.put("/profile/:id", updateExtra);

module.exports = router;
