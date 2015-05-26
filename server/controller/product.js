
var Product = require('../model/product'), add;

// Create endpoint /api/products for POST
exports.postProducts = add = function(req, res) {
    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        categories: req.body.categories,
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

exports.getProductById = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });

};

/*
var addProducts = [{
    body: {
        name: 'Sandals, I guess',
        categories: ['must_have', 'sandals'],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 112.99,
        available: true,
        colors: ['pink', 'beige'],
        image: 'img/products/product-item-08.png'
    }
},
    {
        body: {
            name: 'Kinda Mary Jane',
            categories: ['must_have', 'mary_jane'],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colors: ['pink', 'beige'],
            price: 144,
            available: true,
            sale: true,
            image: 'img/products/product-item-09.png'
        }
    },
    {
        body: {
            name: 'Slides here',
            categories: ['special_offer', 'slides'],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colors: ['pink', 'beige'],
            price: 144,
            available: true,
            image: 'img/products/product-item-10.png'
        }
    },
    {
        body: {
            name: 'smth',
            categories: ['slides'],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colors: ['black'],
            price: 142.99,
            available: true,
            image: 'img/products/product-item-11.png'
        }
    },
    {
        body: {
            name: 'im tired already',
            categories: ['special offer', 'slides'],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colors: ['pink', 'orange'],
            price: 32.99,
            available: true,
            sale: true,
            image: 'img/products/product-item-12.png'
        }
    },
    {
        body: {
            name: 'cheap shoes',
            categories: ['special_offer', 'slides'],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colors: ['pink', 'beige'],
            price: 84766.99,
            available: true,
            sale: true,
            image: 'img/products/product-item-13.png'
        }
    }

];

addProducts.forEach(function(product) {
    add(product);
});
    */