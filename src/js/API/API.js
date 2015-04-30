var PS = require('../vendor/pubsub.js');

var API = function () {
    var api = {};

    PS.extend(api);

    api.init = function() {
        api.subscribe(CONST.ACTIONS.GET_NEWS, function() {
            api.getNews();
        });
    };

    api.subscribe(CONST.ACTIONS.GET_PRODUCTS, function () {
        api.getProducts();
    });

    api.subscribe(CONST.ACTIONS.GET_TEXT_WIDGET, function () {
        api.getTextWidget();
    });

    api.getProducts = function () {
        _ajaxGet('./data/products.json', function (products) {
            api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, products);
        });
    };

    /*api.getProductById = function (productId) {
        var products = _ajaxGet('./data/products.json');

        var filteredProduct = products.filter(function (product) {
            return product.id == productId;
        });

        api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, filteredProduct);
    };*/

    api.getNews = function () {
        _ajaxGet('./data/news.json', function (news) {
            api.publish(CONST.ACTIONS.NEWS_RECEIVED, news);
        });
    };

    api.getTextWidget = function () {
        _ajaxGet('./data/textWidget.json', function (textWidget) {
            api.publish(CONST.ACTIONS.TEXT_WIDGET_RECEIVED, textWidget);
        });
    };

    api.getHeroUnitProducts = function (slideId) {
        var content =_ajaxGet('./data/slides.json');

        var slideFilter = function () {
            for(var i=0; i < content.length; i++) {
                if (content[i].id == slideId) {
                    return content[i];
               }
            }
        };
        api.publish(CONST.ACTIONS.GET_SLIDE, slideFilter());
    };

    function _ajaxGet (path, callback) {
        $.getJSON(path, function(data) {
            callback(data); // data goes into callback function, that is passed as argument
        });
    }

    return api;
};

module.exports = API;

