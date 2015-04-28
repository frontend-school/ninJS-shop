var PS = require('../vendor/pubsub.js');

var API = function () {
    var api = {};

    PS.extend(api);

    api.subscribe(CONST.ACTIONS.GET_NEWS, function() {
        api.getNews();
    });

    api.subscribe(CONST.ACTIONS.GET_PRODUCTS, function () {
        api.getProducts();
    });

    api.getProducts = function () {
        _ajaxGet('./data/products.json', function (products) {
            api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, products);
        });
    };

    api.getProductById = function (productId) {
        var products = _ajaxGet('./data/products.json');

        var filteredProduct = products.filter(function (product) {
            return product.id == productId;
        });

        api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, filteredProduct);
    };

    api.getNews = function () {
        _ajaxGet('./data/news.json', function (news) {
            api.publish(CONST.ACTIONS.NEWS_RECEIVED, news);
        });
    };

    function _ajaxGet (path, callback) {
        $.getJSON(path, function(data) {
            callback(data); // data goes into callback function, that is passed as argument
        });
    }

    return api;
};

module.exports = API;

