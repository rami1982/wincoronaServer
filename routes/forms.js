var express = require('express');
var router = express.Router();
const utils = require('../utils');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.status(200).json(req.body);
});

router.get('/one_time_questionnaire', utils.isLoggedIn, (req, res) => {
    if(req.user){
        User.findOne({ '_id' :  req.user.id }, function(err, user) {
            if (!err && user){
                res.status(200).json(user.one_time_questionnaire);
            }
        });
    }
})
.post('/one_time_questionnaire', utils.isLoggedIn, (req, res) => {
    if(req.user){
        User.findOne({ '_id' :  req.user.id }, function(err, user) {
            if (!err && user){
                user.one_time_questionnaire = req.body;
                user.save(function(err) {
                    if (err)
                        return dres.send(err);
    
                    return res.status(200).json(req.body);
                });
            }
        });
    }
});

router.get('/daily_questionnaire', utils.isLoggedIn, (req, res) => {
    if(req.user){
        User.findOne({ '_id' :  req.user.id }, function(err, user) {
            if (!err && user){
                res.status(200).json(user.daily_questionnaire);
            }
        });
    }
})
.post('/daily_questionnaire', utils.isLoggedIn, (req, res) => {
    if(req.user){
        User.findOne({ '_id' :  req.user.id }, function(err, user) {
            if (!err && user){
                user.daily_questionnaire.push(req.body);
                user.save(function(err) {
                    if (err)
                        return dres.send(err);
    
                    return res.status(200).json(req.body);
                });
            }
        });
    }
});

module.exports = router;