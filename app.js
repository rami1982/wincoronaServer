const express = require("express");
const config = require("./config/config");
const glob = require("glob");
const mongoose = require("mongoose");

var passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

  

mongoose.connect(config.db);
const db = mongoose.connection;
db.on("error", () => {
  throw new Error("unable to connect to database at " + config.db);
});

const models = glob.sync(config.root + "/app/models/*.js");
models.forEach(function(model) {
  require(model);
});
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// // PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "Once again Rusty wins cutest dog!",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(Users.authenticate()));
// passport.serializeUser(Userss.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//    res.locals.currentUser = req.user;
//    res.locals.success = req.flash('success');
//    res.locals.error = req.flash('error');
//    next();
// });

module.exports = require("./config/express")(app, config);



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


app.listen(config.port, () => {
  console.log("Express server listening on port " + config.port);
});
