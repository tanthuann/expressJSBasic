var db = require('../db.js');
var shortid = require('shortid');



var users = db.get('users').value();

module.exports.index = function (request, response) {
	response.render('users/index', {
		users: users
	});
};

module.exports.search = (req,res) => {
	var q = req.query.q;
	var matchUsers = users.filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	
	res.render('users/index', {
		users: matchUsers
	});
};

module.exports.create = (req,res) => {
	res.render('users/create');
};

module.exports.userID = (req, res) => {
	var id = req.params.id;

	var user = db.get('users').find( {id: id}).value();
	res.render('users/view', {	
		user: user
	});
};

module.exports.postCreate = (req,res) => {
	newID = shortid.generate();
	console.log(req.body);
	newUser = req.body;
	newUser.id = newID;
	var errors=[];
	newUser.name = newUser.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	if (!newUser.name){
		errors.push('Name is not required')
	}
	newUser.phone = parseInt(newUser.phone);

not:	if(newUser.phone === '' || !Number.isInteger(newUser.phone)){
			if (newUser.phone === ''){
				errors.push('Phone number is not required');
				newUser.phone='';
				break not;
			}
			
			if(!Number.isInteger(newUser.phone)){
				errors.push('Phone number must be an integer')
				newUser.phone='';
			}
		}
	console.log(errors);
	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			value: req.body
		});
		return;
	}
	db.get('users').push(newUser).write();
	res.redirect('/users');
};