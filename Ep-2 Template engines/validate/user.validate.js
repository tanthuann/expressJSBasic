module.exports.postCreate = (req, res, next) => {
	newUser = req.body;
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
	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			value: req.body
		});
		return;
	}
	next();
};