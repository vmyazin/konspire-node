const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const fs = require('fs');
const sitedata = JSON.parse(fs.readFileSync('data/global.json', 'utf8'));

const app = express();

app.locals = sitedata;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: __dirname + '/scss', //where the sass files are 
  dest: __dirname + '/public/stylesheets', //where css should go
  debug: true,
  indentedSyntax: false,
  outputStyle: 'compressed',
  prefix: '/stylesheets'
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', function (req, res, next) {
  req.config = app.locals;
  next();
}, indexRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error_num = err.status;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
