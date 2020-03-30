const express = require('express');
const router  = express.Router();

const passport = require('passport');

const utils = require('../utils');
const User = require('../models/user');

router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (error, user, info) {
      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        res.status(200).json({
            'message': 'successfully signed up'
        });
      }

      res.status(401).send(info);
    })(req, res);
  }
);

router.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function (error, user, info) {
      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        req.login(user, (err) => {
          if (err) {
              res.send(err);
          }
          res.status(200).json({
              'message': 'successfully signed in'
          });
        })
      }
    })(req, res);
  }
);

router.get('/signout', utils.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'successfully signed out'
    });
});

router.delete('/delete', utils.isLoggedIn, (req, res) => {
  User.findOne({ '_id' :  req.user.id }, function(err, user) {
      if (!err && user){
        user.remove();
        req.logout();
        res.status(200).json({
            'message': 'user successfully deleted'
        });
      }
      else res.send(err);
  });
});

module.exports = router;
