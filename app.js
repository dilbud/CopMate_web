const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const mongodb = require('./config/database');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const policeStationRouter = require('./routes/policeStation');
const licenseRouter = require('./routes/license');
const postRouter = require('./routes/post');

// mobile application
const fineRouter = require('./routes/fine');
const copRouter = require('./routes/cop');

var app = express();

mongodb.connection();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/frontEnd/dist/CopMate')));


// web application
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/policeStation', policeStationRouter);
app.use('/api/license', licenseRouter);
app.use('/api/post', postRouter);

// mobile application
app.use('/app/fine', fineRouter);
app.use('/app/cop', copRouter);

// app.use('/mobi/cop', licenseRouter);
// app.use('/mobi/driver', licenseRouter);

console.log('Default Running Port : 3000');

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
  res.send();
});

module.exports = app;
