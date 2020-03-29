var express = require('express');
var router = express.Router();
const utils = require('../../utils');

router.get('/', utils.isLoggedIn, (req, res) => {
    res.status(200).json(res.status(200).json(req.user));
});

module.exports = router;