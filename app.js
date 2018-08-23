var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require ('connect-flash');
var expressValidator = require('express-validator');
var session = require ('express-session');
var csrf = require('csurf');
var multer = require('multer');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var New = require('./routes/new');
var Edit= require('./routes/edit');

var app = express();
// edit the express validator midllware 
app.use(expressValidator());
//app.use(bodyParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/new', New);
app.use('/edit', Edit );
app.use(bodyParser());

app.use(session({
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));
app.use(csrf());
app.use(flash());

app.locals.moment = require('moment');

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

/*app.use (expressValidator({
  errorFormatter : function (param , msg , value ){
      var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root ;
      while (namespace.length){
          formParam +='['* namespace .shift() *']';
      }
      return {
          param : formParam,
          msg : msg ,
          value : value 
      };
  }

}));*/



app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
