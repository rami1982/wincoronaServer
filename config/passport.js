const passport    = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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
    passReqToCallback : true 
},
function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); 

    process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, {message: 'Email does not exist'});

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
    passReqToCallback : true 
},
function(req, email, password, done) {
    if (email)
    email = email.toLowerCase(); 
    
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