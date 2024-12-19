var express = require("express");
const { getallCategory, updateCategory } = require("../controllers/category");
const {
  getallSubCategory,
  getsingleSubCategory,
  createSubCategory,
  updateSubCategory,
  getbyCategory,
  deleteSubCategory,
  updateSubCategorywithImage,
} = require("../controllers/subCategory");
const auth = require("../middleware/auth");
const {
  valueNotEmpty,
  validateId,
} = require("../middleware/CustomValidator/CustomValidator");
const { validate } = require("../middleware/CustomValidator/validatehandler");
const { upload } = require("../multer/fileupload");
var router = express.Router();

/* GET home page. */
router.get("/", getallSubCategory);
router.get("/:id", getsingleSubCategory);
router.post("/", upload.single("image"), createSubCategory);
router.put("/:id", updateSubCategory);
router.get("/byCategory/:id", getbyCategory);
router.delete("/:id", deleteSubCategory);
router.put("/image/:id", upload.single("image"), updateSubCategorywithImage);

module.exports = router;
