const express = require('express');
const router  = express.Router();

const passport = require('passport');

const utils = require('../../utils');

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
        res.status(200).json({
            'message': 'successfully signed in'
        });
      }

      res.status(401).send(info);
    })(req, res);
  }
);

router.get('/logout', utils.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'successfully logout'
    });
});

module.exports = router;
