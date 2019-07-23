var express = require('express');
var controller = require('../controllers/product.controller');

var router = express.Router();

var db = require('../db.js');

router.get('/', controller.viewProduct);

router.get('/search', controller.search);

module.exports = router;