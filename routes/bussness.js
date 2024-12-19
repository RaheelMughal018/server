var express = require("express");
const {
  createbuesness,
  viewbussnessUser,
  viewsinglebussness,
  updateAccount,
  updateProfile,
} = require("../controllers/bunessprofile");

const auth = require("../middleware/auth");

const { upload } = require("../multer/fileupload");
var router = express.Router();

/* GET home page. */
router.post("/", upload.single("cnic"), createbuesness);
router.get("/", viewbussnessUser);
router.get("/:id", viewsinglebussness);
router.put("/:id", updateAccount);
router.put("/profile/:id", updateProfile);

module.exports = router;
