var express = require("express");
const {
  CreateBooking,
  getUserBookings,
  updateBookingStatus,
  getOwnerBookings,
  updateBooking,
  getBookings,
  updateBookingPayment,
  getServiceBookings,
} = require("../controllers/Booking");

const auth = require("../middleware/auth");
const {
  valueNotEmpty,
} = require("../middleware/CustomValidator/CustomValidator");
const { validate } = require("../middleware/CustomValidator/validatehandler");
const { upload } = require("../multer/fileupload");
var router = express.Router();

/* GET home page. */
router.post("/", CreateBooking);
router.get("/:id", getUserBookings);
router.put("/", updateBookingStatus);
router.get("/owner/:id", getOwnerBookings);
router.put("/:id", updateBookingStatus);
router.put("/Payment/:id", upload.single("payment"), updateBookingPayment);
router.get("/serviceBookings/:id", getServiceBookings);

router.get("/", getBookings);

module.exports = router;
