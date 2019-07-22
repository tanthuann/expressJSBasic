require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');

var db = require('./db');
var userRouter = require('./router/users.router');
var authRouter = require('./router/auth.router');
var authMiddlewares = require('./middlewares/auth.middlewares')

var app = express();
var port = 3000;

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', authMiddlewares.requireMiddlewares, userRouter);
app.use('/auth', authRouter);

app.use(express.static('public'));

app.set('view engine' , 'pug');
app.set('views', './views');

app.get('/', function (req, res) {

	res.render('index');
});

app.listen(port, function () {
	console.log('Server listening on port '+ port);
});
