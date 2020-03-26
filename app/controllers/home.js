const express = require("express");
const router = express.Router();

const User = require('../models/user');

var user = require('../routes/user');
var auth = require('../routes/auth');

var passport = require("passport");

function capitalizeFirstLetter(string) {
  let upperCaseString=""
  let obj=""
  for (let [key, value] of Object.entries(string)) {
    upperCaseString = key.charAt(0).toUpperCase() + key.slice(1);
    obj = { ...obj, [upperCaseString]: value };
  }
  return obj
}

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/", router);
  // app.use('/user', passport.authenticate('jwt', {session: false}), user);
  app.use('/auth', auth);

};

router.get("/secret", (req, res, next) => {
  User.find((err, Users) => {
    if (err) return next(err);
    return res.json(Users);
  });
});

router.get("/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id)
  User.findById(id, function(err, User) {
    if (err) return next(err);
    return res.json(User);
  });
});

router.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

router.post("/one_time_questionnaire", (req, res) => {
  return res.send("Received a POST HTTP method");
});

router.post("/daily_questionnaire", (req, res) => {
  return res.send("Received a POST HTTP method");
});

router.post("/user/", (req, res) => {
  let body = capitalizeFirstLetter(req.body);
  console.log(body);
  User.create(body, function(err, User) {
    if (err) return next(err);
    return res.send(`${User.id} was updated `);
  });
});






// need to put 1 or more from those:
// "Name": "your name",
// "Email": "Tamara@gmail.com",
// "Symptoms": "check",
// "Avatr": "asdas",
// "text": "sdsad"


router.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let body =capitalizeFirstLetter (req.body);
  console.log(body);
  User.findByIdAndUpdate(id,body,function(err, User) {
    if (err) return next(err);
    return res.send(`${User.id} was updated ${res}`);
  });
});



router.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  User.findByIdAndRemove(id, function(err, User) {
    if (err) return next(err);
    return res.send (`${User.id} was deleted`);
  });
});