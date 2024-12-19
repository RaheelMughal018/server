var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");
var subcategoryRouter = require("./routes/subCategory");
var bussness = require("./routes/bussness");
var quiz = require("./routes/Quiz");
var service = require("./routes/userServices");
var QuizAnswer = require("./routes/QuizAnswer");
var Bookings = require("./routes/bookings");
var reviews = require("./routes/review");
var extra = require("./routes/extra");
const database = require("./database/database");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
database();
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/Bussness", bussness);
app.use("/api/service", service);
app.use("/api/QuizAnswer", QuizAnswer);
app.use("/api/reviews", reviews);

app.use("/api/booking", Bookings);
app.use("/api/quiz", quiz);
app.use("/api/extra", extra);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res
    .status(error.code || 500)
    .send({ error: error.message || "An unknown error has occured" });
});
module.exports = app;
