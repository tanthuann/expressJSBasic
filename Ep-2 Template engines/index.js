var express = require('express');
var app = express();
var port = 3000;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
var users = 
		[
			{id: 1, name: 'Thuan'},
			{id: 2, name: 'Hung'},
			{id: 3, name: 'Linh'}
		];
app.set('view engine' , 'pug');
app.set('views', './views');

app.get('/', function (request, response) {
	response.render('index', {
		name: 'AAA'
	});
});



app.get('/users', function (request, response) {
	response.render('users/index', {
		users: users
	});
});

app.get('/users/search', (req,res) => {
	var q = req.query.q;
	var matchUsers = users.filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	console.log(req.query);
	res.render('users/index', {
		users: matchUsers
	});
});

app.get('/users/create', (req,res) => {
	res.render('users/create');
});

app.post('/users/create', (req,res) => {
	users.push(req.body);
	res.redirect('/users');
});

app.listen(port, function () {
	console.log('Server listening on port '+ port);
});
