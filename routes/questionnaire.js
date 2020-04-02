var router = require('express').Router();
const User = require('../models/user');
const Question = require('../models/questionnaire').Question;
const Questionnaire = require('../models/questionnaire').Questionnaire;

router.get('/', (req, res) => {
    res.status(200).json(req.body);
});

const getQuestionnaire = (type) => (req, res) => {
    Questionnaire.find({type: type}, (err,questionnaire)=>{
        res.json(questionnaire);
    });
}

router.get('/one_time', getQuestionnaire('one_time'));
router.get('/daily', getQuestionnaire('daily'));

router.post('/one_time', (req, res) => {
    if(req.user){
        User.findOne({ '_id' :  req.user.id }, function(err, user) {
            if (!err && user){
                user.one_time_questionnaire = req.body;
                user.save(function(err) {
                    if (err)
                        return res.json({success: false, error: err});
    
                    return res.status(200).json(req.body);
                });
            }
        });
    }
});

router.post('/daily', (req, res) => {
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

router.post('/question', (req, res) => {
    const question = new Question();
    question.question = req.body.question;
    const input = {};
    Object.entries(req.body.input).forEach(entry=>{
        switch(entry[0]){
            case 'radio':
                input.radio = entry[1];
                break;
            case 'checkbox':
                input.checkbox = entry[1];
                break;
            case 'freetext':
                input.freetext = entry[1];
                break;
            default:
                return res.json({success: false, reason: `no such type ${entry[0]}`});
                break;
        }
    });
    question.input = input;
    Questionnaire.findOne({type: req.body.questionnaire_type}, function(err, questionnaire) {
        if(err || !questionnaire) res.json({success: false, reason: `no such questionnaire ${req.body.type}`});
        else{
             questionnaire.questions.push(question);
            questionnaire.save();
            res.json({success: true, questionnaire:questionnaire});
        }
    });
});

router.get('/get_questionnaires', (req, res)=>{
    Questionnaire.find({}, (err,qs)=>{
        res.json(qs);
    });
});

module.exports = router;