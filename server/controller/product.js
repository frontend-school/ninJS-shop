
var Product = require('../model/product');

// Create endpoint /api/products for POST
exports.postProducts = function(req, res) {
    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        colors: req.body.colors,
        price: req.body.price,
        image: req.body.image,
        available: req.body.available,
        sale: req.body.sale
    });

    product.save(function(err) {
        if (err)
        {
            res.send(err);
        }


        res.json({ message: 'New product added to the  site!' });
    });
};

// Create endpoint /api/product for GET
exports.getProducts = function(req, res) {
    Product.find(function(err, products) {
        if (err)
            res.send(err);

        res.json(products);
    });
};
