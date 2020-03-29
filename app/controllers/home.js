const express = require("express");
const router = express.Router();

const User = require('../models/user');

var forms = require('../routes/forms');
var auth = require('../routes/auth');
var profile = require('../routes/profile');

var passport = require("passport");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/", router);
  app.use('/auth', auth);
  app.use('/forms', forms);
  app.use('/profile', profile);
};
