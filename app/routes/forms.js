var express = require('express');
var router = express.Router();
const utils = require('../../utils');

router.get('/', utils.isLoggedIn, (req, res) => {
    res.status(200).json(res.status(200).json(req.user));
});

router.post('/one_time_questionnaire', (req, res) => {
    if(!req.user) res.status(200).json(req.body);
});

router.post('/daily_questionnaire', (req, res) => {
    if(!req.user) res.status(200).json(req.body);
});

module.exports = router;