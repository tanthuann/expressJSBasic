var db = require('../db');

module.exports.indexCart = (req, res, next) =>{
	var sessionId = req.signedCookies.sessionId;
	var totalCart = db.get('sessions').find({id: sessionId}).get('cart').value();

	var arrIdsCart = [];
	var cartProducts = [];
	var product

	var total = 0;

	for(var key in totalCart){
		arrIdsCart.push({
			key: key,
			amount: totalCart[key]
		});
		total += totalCart[key];
	}

	for(var i of arrIdsCart){
		cartProducts.push({
			info: db.get('products').find({id: i.key}).value(),
			amount: i.amount
			});
	}

	res.render('cart/cart',{
		total: total,
		products: cartProducts
	});
};

module.exports.addToCart = (req, res, next) => {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var totalCart = db.get('sessions').find({id: sessionId}).get('cart').value();

	var total = 0;

	for(var key in totalCart){
		total += totalCart[key];
	}

	var count = db.get('sessions')
				  .find({id: sessionId})
				  .get('cart.' + productId, 0);


	db.get('sessions')
	  .find({id: sessionId})
	  .set('cart.' + productId, count + 1)
	  .write();

	res.redirect('/products');
};