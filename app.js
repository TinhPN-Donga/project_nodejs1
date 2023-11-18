var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('connect mongoose successfully');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
var productRouter = require('./routes/product.route');
var dashboadRouter = require('./routes/dashboard.route');
var cartRouter = require('./routes/carts.route');

const upload = require('./utils/config_upload');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.post('/uploads/image', upload.single('image'), (req,res)=>{
  console.log(req.file);
  res.send(req.file);
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/dashboard', dashboadRouter);
app.use('/carts', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
