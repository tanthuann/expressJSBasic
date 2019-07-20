var db = require('../db.js');

module.exports.postLogin = (req, res, next) => {
 	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({email: email}).value();
	if (!user){
		res.render('auth/login', {
			errors: ['Email does not exits']
		});
	}
	if(user.password !== password){
		res.render('auth/login', {
			errors: ['Password is incorrect. Try again'],
			value: req.body
		});
	}
	next();
};
