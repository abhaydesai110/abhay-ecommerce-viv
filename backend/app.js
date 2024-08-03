var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const {passwordEncryptor, passwordDecryptor} = require("./utilities/helper");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
console.log("process.env.MONGO_URI", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once("open", () => {
    console.log("Well done! , connected with mongoDB database");
  })
  .on("error", (error) => {
    console.log("Oops! database connection error:" + error);
  });
const adminPaths = [
  {pathUrl: "/login", routerFile: "login"},
  {pathUrl: "/product", routerFile: "product"},
  {pathUrl: "/designcode", routerFile: "designCodeRoute"},
];
// app.use("/admin/designcode", require(`./routes/admin/designCodeRoute`));
adminPaths.forEach((adminPath) => {
  try {
    app.use("/admin" + adminPath.pathUrl, require(`./routes/admin/${adminPath.routerFile}`));
  } catch (error) {
    console.log("error", error);
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
