require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');

var db = require('./db.js');
var users = db.get('users').value()
var userRouter = require('./router/users.router');
var authRouter = require('./router/auth.router');
var authMiddlewares = require('./middlewares/auth.middlewares');
var productRouter = require('./router/product.router');

var app = express();
var port = 3000;

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', authMiddlewares.requireMiddlewares, userRouter);
app.use('/auth', authRouter);
app.use('/products', authMiddlewares.requireMiddlewares, productRouter);

app.use(express.static('public'));

app.set('view engine' , 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
	console.log(req.signedCookies.userId);
	var user = db.get('users').find({id: req.signedCookies.userId}).value();
	console.log(user);
	res.render('index', {
		userName: user
	});
});

app.listen(port, function () {
	console.log('Server listening on port '+ port);
});
