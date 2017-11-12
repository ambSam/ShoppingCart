var Product=require('../models/product');
var mongoose=require('mongoose');
var assert=require('assert');

mongoose.connect('mongodb://localhost:27017/shopping');

var products=[
new Product({
	imagePath : 'https://i.pinimg.com/736x/be/dc/4b/bedc4b81fae821522d7c4dbf366a3087--spring-men-outfit--men-summer-casual-outfits.jpg',
	title: 'Mens T-shirt',
	description: 'Latest Fashion',
	price : 500
}),
new Product({
	imagePath : 'https://media.contentapi.ea.com/content/dam/ea/easports/fifa/features/2017/cristiano-ronaldo/june5/ronaldo-share.jpg',
	title: 'FIFA 2018',
	description: 'PC Game',
	price : 2000
}),
new Product({
	imagePath : 'http://myappsforpc.com/wp-content/uploads/2015/05/NFS-most-wanted-for-pc.jpg',
	title: 'NFS MOST WANTED',
	description: 'PC GAME',
	price : 5000
}),
new Product({
	imagePath : 'https://rukminim1.flixcart.com/image/704/704/television/z/b/6/samsung-32j4003-original-imaezvg8eynmheds.jpeg?q=70',
	title: 'Samsung LED TV',
	description: 'Smart tv',
	price : 50000
}),
new Product({
	imagePath : 'https://rukminim1.flixcart.com/image/704/704/vehicle-pull-along/z/u/a/maisto-ktm-1290-super-duke-r-scale-1-12-bike-original-imae2y4qy9wyxywj.jpeg?q=70',
	title: 'Bike',
	description: 'Sports Bike',
	price : 90000
})
];
var done=0;
for(var i=0;i<products.length;i++)
{
	done++;
	var promise=products[i].save(function(err,result)
	{
		assert.equal(null,err);
		if(done==products.length)
		{
			exit();
		}

	});
}

function exit()
{
	mongoose.disconnect();
}
