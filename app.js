var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var viewcount = require('./models/viewcount');

var indexRouter = require('./routes/index');
var simRouter = require('./routes/zootr-sim');
var spurtsRouter = require('./routes/spurts');

var app = express();
app.enable('strict routing');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV != 'production') {
  app.use(logger('dev'));
}
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '500kb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '500kb'}));

// strip trailing slashes
app.use(function(req, res, next) {
    if (!req.path.includes('/radii') && req.path.substr(-1) == '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

app.use((req, res, next) => {
  if (req.path.split('/').length >= 3 && req.path.split('/')[2] != '') {
    next();
  }
  else {
    var path = req.path;
    viewcount.find({path: req.path}, function(err, result) {
      if (err) console.log(err);
      else if (result.length == 0){
        doc = new viewcount({path: req.path, views: 1});
        doc.save();
      }
      else {
        result[0].views++;
        result[0].save();
      }
      next();
    });
  }
});

app.use('/radii', express.static(path.join(__dirname, 'public/unity/radii')));


app.use('/', indexRouter);
app.use('/zootr-sim', simRouter);
app.use('/spurts', spurtsRouter);
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));

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
