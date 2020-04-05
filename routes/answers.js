var router = require('express').Router();
const Questionnaire = require('../models/questionnaire').Questionnaire;
const Answers = require('../models/answers').Answers;
const User = require('../models/user');

router.get('/one_time', (req,res)=>{
    User.findOne({_id: req.user._id}, (err, user)=>{
        if(err || !user) res.json({success: false, error: err});
        return res.json(user.oneTimeQuestionnaire);
    });
});
router.post('/one_time', (req,res)=>{
    User.findOne({_id: req.user._id}, (err, user)=>{
        if(err || !user) res.json({success: false, error: err});
        else user.oneTimeQuestionnaire = req.body;
        user.save((err)=>{
            if(err) return res.json({success: false, error: err});
            return res.json(req.body);
        });
    });
});

router.get('/daily', (req,res)=>{
    User.findOne({_id: req.user._id}, (err, user)=>{
        if(err || !user) res.json({success: false, error: err});
        return res.json(user.dailyQuestionnaire);
    });
});
router.post('/daily', (req,res)=>{
    User.findOne({_id: req.user._id}, (err, user)=>{
        if(err || !user) res.json({success: false, error: err});
        else user.dailyQuestionnaire.push(req.body);
        user.save((err)=>{
            if(err) return res.json({success: false, error: err});
            return res.json(req.body);
        });
    });
});

module.exports = router;