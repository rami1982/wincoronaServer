const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config/config");

const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", function (req, res, next) {
  const { email, password } = req.body;
  console.log(config.mailchimp);
  console.log(email);
  // MAIL CHIMP SETUP
  const mcData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };
  const mcDataPost = JSON.stringify(mcData);
  const options = {
    url: "https://us19.api.mailchimp.com/3.0/lists/3635e9251f",
    method: "POST",
    headers: {
      Authorization: `auth ${config.mailchimp}`,
    },
    body: mcDataPost,
  };

  passport.authenticate("local-signup", function (error, user, info) {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      req.login(user, { session: false }, async (error) => {
        // SEND EMAIL TO MAILCHIMP
        request(options, (err, response, body) => {
          if (err) {
            console.log(err);
          }
        });
        // const token = jwt.sign({ userId: user._id }, "secretkey");
        // res.json({
        //   success: true,
        //   message: "successfully signed up",
        //   token: token,
        // });
      });
    }

    res.status(401).send(info);
  })(req, res);
});

router.post("/signin", function (req, res, next) {
  passport.authenticate("local-signin", { session: false }, function (
    error,
    user,
    info
  ) {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      req.login(user, async (error) => {
        const token = jwt.sign({ userId: user._id }, "secretkey");
        res.json({
          success: true,
          message: "successfully signed in",
          token: token,
        });
      });
    }
  })(req, res);
});

module.exports = router;
