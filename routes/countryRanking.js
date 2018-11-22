//these routes are for the vertical bar chart that shows the country ranking
var express = require('express');
var router = express.Router();

var controller = require('../controllers/main.controller');

//router.get('/', controller.countryRanking);
router.get('/', controller.countryRanking);

module.exports = router;
