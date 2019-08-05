require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');

var db = require('./db.js');
var users = db.get('users').value()

var userRouter = require('./router/users.router');
var authRouter = require('./router/auth.router');
var productRouter = require('./router/product.router');
var cartRouter = require('./router/cart.router');

var authMiddlewares = require('./middlewares/auth.middlewares');
var sessionMiddlewares = require('./middlewares/session.middlewares')

var app = express();
var port = 3000;

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(sessionMiddlewares);

app.use('/users', authMiddlewares.requireMiddlewares, userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

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
