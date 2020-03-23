const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
var passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
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
                          app.use("/", router);
                          app.use("/user", router);
                          // PASSPORT CONFIGURATION
                          app.use(
                            require("express-session")({
                              secret: "Once again Rusty wins cutest dog!",
                              resave: false,
                              saveUninitialized: false
                            })
                          );

                          app.use(passport.initialize());
                          app.use(passport.session());
                          passport.use(new LocalStrategy(Users.authenticate()));
                          passport.serializeUser(Users.serializeUser());
                          passport.deserializeUser(Users.deserializeUser());

                          app.use(function(req, res, next) {
                            res.locals.currentUser = req.user;
                            res.locals.success = req.flash("success");
                            res.locals.error = req.flash("error");
                            next();
                          });

                          // PASSPORT CONFIGURATION
                        };

router.get("/secret", (req, res, next) => {
  Users.find((err, Users) => {
    if (err) return next(err);
    return res.json(Users);
  });
});

router.get("/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id)
  Users.findById(id, function(err, User) {
    if (err) return next(err);
    return res.json(User);
  });
});
router.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});



router.post("/user/", (req, res) => {
  let body = capitalizeFirstLetter(req.body);
  console.log(body);
  Users.create(body, function(err, User) {
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
  Users.findByIdAndUpdate(id,body,function(err, User) {
    if (err) return next(err);
    return res.send(`${User.id} was updated ${res}`);
  });
});



router.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  Users.findByIdAndRemove(id, function(err, User) {
    if (err) return next(err);
    return res.send (`${User.id} was deleted`);
  });
});