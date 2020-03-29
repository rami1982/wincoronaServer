const express = require("express");
const config = require("./config/config");
const glob = require("glob");
const mongoose = require("mongoose");

var passport = require("passport"),
  bodyParser = require("body-parser");
var flash = require('connect-flash');

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

app.use(flash());

app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = require("./config/express")(app, config);


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

require('./config/passport');


app.listen(config.port, () => {
  console.log("Express server listening on port " + config.port);
});
