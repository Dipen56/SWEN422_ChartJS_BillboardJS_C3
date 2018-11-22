var express = require('express');
var router = express.Router();

var controller = require('../controllers/main.controller');

router.get('/', controller.index);

router.get('/data', controller.load);

module.exports = router;
