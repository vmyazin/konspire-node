// app.js

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('sass-middleware');
const fs = require('fs');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const currentYear = new Date().getFullYear();

// Read JSON data
const sitedata = JSON.parse(fs.readFileSync(path.join(__dirname, '/data/global.json'), 'utf8'));

const app = express();

app.use((req, res, next) => {
  res.locals.currentYear = currentYear;
  next();
});

app.locals = sitedata;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    indentedSyntax: false,
    outputStyle: 'compressed',
    prefix: '/stylesheets',
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// Attach app.locals to req.config
app.use(
  '/',
  function (req, res, next) {
    req.config = app.locals;
    next();
  },
  indexRouter
);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error_num = err.status;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;