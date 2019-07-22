module.exports.postCreate = (req, res, next) => {
	newUser = req.body;
	var errors=[];
	newUser.name = newUser.name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	if (!newUser.name){
		errors.push('Name is not required')
	}

	if(newUser.phone === ''){
		errors.push('Phone number is not required');
		newUser.phone='';
		}
	if (!newUser.email) {
		errors.push('Email is not required')
	}

	if (!newUser.password) {
		errors.push('Input password');
	}

	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			value: req.body
		});
		return;
	}
	next();
};