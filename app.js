'use strict'

// Dependancies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//**********************//
var logger = require('morgan');
var mongoose = require('./services/mongoose');
var { errorHandler } = require('./errors/errorhandler');
var userRouter = require('./routes/user.route');
var { defaultUser } = require('./controllers/user.controller');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);

app.use(errorHandler);

mongoose.connect();

defaultUser();

module.exports = app;
//the module.exports property or the exports object allows a module to select what should be shared with the application
//When dividing your program code over multiple files, module.exports is used to publish variables and functions to the consumer of a module.
// The require() call in your source file is replaced with corresponding module.exports loaded from the module.
//require call is made like this require(../app) here .. means to move out of current folder and /app means accessing app.