var express = require('express');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');
var assert=require('assert');			

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(error,docs)
	{
		var productChunks=[];
		var chunkSize=3;
		for(var i=0;i<docs.length;i+=chunkSize)
		{
			productChunks.push(docs.slice(i,i+chunkSize));
		}
  		res.render('shop/index', { title: 'Shopping Cart', products:productChunks, length:docs.length});
	});
});

router.get('/add-to-cart/:id',function(req,res,next)
{
	var productId=req.params.id;
	var cart=new Cart(req.session.cart ? req.session.cart : {items : {}});
	Product.findById(productId,function(err,product)
	{
		if(err)
		{
			return res.redirect('/');
		}
		cart.add(product,product.id);
		req.session.cart=cart;
		res.redirect('/');
	});
});

router.get('/shoppingCart',function(req,res,next){
	if(!req.session.cart)
	{
		return res.render('shop/shoppingCart',{products:null});	
	}
	var cart=new Cart(req.session.cart);
	res.render('shop/shoppingCart',{ products: cart.generateArray(),totalPrice: cart.totalPrice})
	
});

router.get('/checkout',function(req,res,next){
	if(!req.session.cart)
	{
		return res.redirect('/shoppingCart');
	}
	var cart=new Cart(req.session.cart);
	console.log(cart.totalPrice);
	res.render('shop/checkout',{total:cart.totalPrice});
});


module.exports = router;