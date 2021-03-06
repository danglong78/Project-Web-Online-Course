if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

global.__host = process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://udemy-clone102.herokuapp.com";
console.log(__host);
const morgan = require("morgan");
const createError = require("http-errors");
const express = require("express");
require("express-async-errors");
const path = require("path");
global.__basedir = __dirname;
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const database = require("./models/database");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const studentRouter = require("./routes/student");
const course_badge = require("./controllers/admin/course_badge");

// require models
require("./models/course");
require("./models/category");
require("./models/subCategory");

const app = express();

// global var
require("./controllers/category/get_populated_cats")().then((result) => {
  global.__statics = {}
  global.__statics.categories = result;
});
global.__CONFIG = require("./config.json");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
require("./controllers/credential/authenticate").passportSetup(app);
app.use(flash());


// Flash messages
app.use((req, res, next) => {

  res.locals.currentScene = "";
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routing
app.use("/", indexRouter);
//app.use('/student', isAuthenticated, studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log("Always here 1");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // console.log("Always here 2");
  res.locals.message = err.userMessage;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.debugMessage) console.error(err.debugMessage);
  if (err.message !== "Not Found") console.error(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Set up mongoose
database
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });

// prepare database:
course_badge(10);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
