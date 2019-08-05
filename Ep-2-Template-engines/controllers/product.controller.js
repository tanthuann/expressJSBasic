var db = require('../db.js');

var products = db.get('products').value();



module.exports.viewProduct = (req, res) => {
	var user = db.get('users').find({id: req.signedCookies.userId}).value();

	var page = req.query.page || 1; //n
	var perPage = 9; //x

	var start = (page-1)*perPage;
	var end = page*perPage;
	var productsPage = db.get('products').value().slice(start,end);
	if(page === 1 || parseInt(page) === 1)
		var stop = 1;
	if(page === 12 || parseInt(page) === 12)
		var last = 1;

	var totalCart = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();

	var sum = 0;

	for(var key in totalCart){
		sum += totalCart[key];
	}

	res.render('product/product', {
		user: user,
		products: productsPage,
		page: parseInt(page),
		stop: stop,
		last: last,
		total: sum
	});
};

module.exports.search = (req, res) => {
	var q = req.query.q;
	if (q){
		var findProducts = products.filter((product) => {
			return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});

		res.render('product/product', {
			products: findProducts,
			notPagination: 1
		});
		return;
	}
	res.redirect('/products');
	// var productsPage = db.get('products').value().slice(0,9)

	// res.render('product/product', {
	// 	products: productsPage
	// });
};
