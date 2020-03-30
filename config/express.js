const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var forms = require('../routes/forms');
var auth = require('../routes/auth');
var profile = require('../routes/profile');

var passport = require("passport");

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(methodOverride());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', auth);
  app.use('/forms', forms);
  app.use('/profile', profile);

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
  });

  return app;
};
