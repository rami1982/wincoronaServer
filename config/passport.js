const passport    = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false);

            if (!user.validateHash(password))
                return done(null, false);

            else
                return done(null, user);
        });
    });

}));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    if (email)
    email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    
    process.nextTick(function() {

            var newUser            = new User();

            newUser.email    = email;
            newUser.password = newUser.generateHash(password);

            newUser.save(function(err) {
                if (err)
                    return done(err);

                return done(null, newUser);
            });
    });

}));