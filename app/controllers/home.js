const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Users.find((err, Users) => {
    if (err) return next(err);
    res.json(Users);
  });
});
