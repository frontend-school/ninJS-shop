var PS = require('./pubsub.js'),
    Q = require('q'),
    api;

module.exports = api = PS.extend({

    init: function() {

        this.subscribe(CONST.ACTIONS.GET_NEWS, getNews);
        this.subscribe(CONST.ACTIONS.GET_PRODUCTS, getProducts);
        this.subscribe(CONST.ACTIONS.GET_SINGLE_PRODUCT, getProductById);
        this.subscribe(CONST.ACTIONS.GET_TEXT_WIDGET, getTextWidgetData);
        this.subscribe(CONST.ACTIONS.GET_SLIDES, getHeroUnitProducts);
    }

});


function getProducts() {
    _ajaxGet('/api/products')
        .then(function (products) {
            api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, products);
        });
}


function getProductById(productId) {
    _ajaxGet('/api/product/' + productId)
        .then(function (product) {
            api.publish(CONST.ACTIONS.SINGLE_PRODUCT_RECEIVED, product);
        });
}


function getNews () {
    _ajaxGet('./data/news.json')
        .then(function (news) {
            api.publish(CONST.ACTIONS.NEWS_RECEIVED, news);
        });
}

function getTextWidgetData() {
    _ajaxGet('./data/textWidget.json')
        .then(function (textWidget) {
            api.publish(CONST.ACTIONS.TEXT_WIDGET_RECEIVED, textWidget);
        });
}


function getHeroUnitProducts() {
    console.log('getHeroUnitProducts');
    _ajaxGet('../data/slides.json')
        .then(function (slides) {
            api.publish(CONST.ACTIONS.SLIDES_RECEIVED, slides);
        });

    var content = _ajaxGet('./data/slides.json');

    // var slideFilter = function () {
    //     for (var i = 0; i < content.length; i++) {
    //         if (content[i].id == slideId) {
    //             return content[i];
    //         }
    //     }
    // };

    // api.publish(CONST.ACTIONS.GET_SLIDE, slides);
}

function _ajaxGet(path) {
    var deferred = new Q.defer();

    $.getJSON(path, function (data) {
        deferred.resolve(data); // data goes into callback function, that is passed as argument
    });

    return deferred.promise;
}