if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const morgan = require('morgan');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
global.__basedir = __dirname;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const database = require('./models/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET, resave: true,
  saveUninitialized: true
}));
require('./controllers/credential/authenticate').passportSetup(app);
app.use(flash());

// Flash messages
app.use((req, res, next) => {
  res.locals.currentScene = "";
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routing
app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set up mongoose
database.connect().then(() => {
  console.log('Database connected');
})
  .catch((err) => {
    console.log('Error connecting to database' + err);
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
})
