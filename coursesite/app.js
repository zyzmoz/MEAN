var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(expressSession);


var config = require('./config');
var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');
passportConfig();


var app = express();
mongoose.connect(config.mongoUri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SaveUninitializaed - Create a session if nothing has been stored in it yet
//resave - resave a session that has not been modified
app.use(expressSession({
	secret: 'E5-571G-52B7',
	saveUninitialized: false,
	resave: false,
	store : new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));

//initializa flash
app.use(flash());

//put it before routes - so that we can allow/disallow certain routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use(restrict);
app.use('/home', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {	
  var err = new Error('Not Found');  
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
