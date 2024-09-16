// app.js

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'sass-middleware';
import { fileURLToPath } from 'url';
import fs from 'fs';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// [Resolve __dirname for ES modules]
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentYear = new Date().getFullYear();

// [Read JSON data using fs]
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
    src: path.join(__dirname, 'scss'), // Path to your source .scss files
    dest: path.join(__dirname, 'public/stylesheets'), // Where compiled .css files will be output
    debug: true,
    indentedSyntax: false, // false = .scss, true = .sass
    outputStyle: 'compressed',
    prefix: '/stylesheets', // This should match the URL prefix for your CSS
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

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});

export default app;