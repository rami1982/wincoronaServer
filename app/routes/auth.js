const express = require('express');
const router  = express.Router();

const passport = require('passport');

const utils = require('../../utils');

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '../profile', 
    // failureRedirect : 'signup', 
    failureFlash : true 
}));

router.post('/signin', passport.authenticate('local-login', {
    successRedirect : '../profile',
    // failureRedirect : 'signin',
    failureFlash : true 
    })
);

router.get('/logout', utils.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'successfully logout'
    });
});

module.exports = router;
