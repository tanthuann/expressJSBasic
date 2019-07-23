var express = require('express');
var multer  = require('multer');

var upload = multer({ dest: 'public/uploads/' });

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate')

var router = express.Router();

router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
	console.log(req.cookies);
	res.cookie('user-id', 12312351);
	res.send('Nothing');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.userID);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

module.exports = router;