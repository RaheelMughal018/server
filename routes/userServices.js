var express = require("express");
const {
  createuserservices,
  updateuserservices,

  getalluserservices,
  getUserServiceByCategory,

  getUserservicesByUser,
  deleteServices,
  getmultiidSub,
  updateServices,
} = require("../controllers/userservices");

const auth = require("../middleware/auth");

var router = express.Router();
const { upload } = require("../multer/fileupload");

/* GET home page. */

// router.get("/", getalluserservices);
// router.get("/:id", getsingleuserservices);
router.post("/", upload.single("image"), createuserservices);
// router.put("/:id", auth, updateuserservices);

router.get("/ServiceUser/:id", getUserservicesByUser);

router.get("/ServiceCategory/:id", getUserServiceByCategory);
router.get("/ServiceUser/:id", getUserservicesByUser);
router.delete("/:id", deleteServices);
router.post("/recommendation", getmultiidSub);
router.get("/", getalluserservices);
router.put("/:id", updateServices);

module.exports = router;
