var express = require('express');
var router = express.Router();

var controller = require('../controllers/main.controller');

router.get('/', controller.countryData);

module.exports = router;
