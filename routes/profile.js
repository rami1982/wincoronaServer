var express = require('express');
var router = express.Router();
const utils = require('../utils');

router.get('/', (req, res) => {
    console.log(req.user.id);
    res.status(200).json(req.user);
});

module.exports = router;