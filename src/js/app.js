window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js'),
    API = require('./API/API.js'),
    Router = require('./router.js'),
    BlogNewsController = require('./blognews/controller.js'),
    ProductsController = require('./products/controller.js'),
    TextWidgetController = require('./textWidget/controller.js');

var App = function() {

    var app = {},
        _router = new Router(),
        _api = new API(),
        _blognews = new BlogNewsController(),
        _products = new ProductsController(),
        _textWidget = new TextWidgetController();

    PS.extend(app);

    app.init = function() {
        app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        app.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(products) {
            app.publish(CONST.ACTIONS.RENDER_PRODUCTS, products);
        });

        app.subscribe(CONST.ACTIONS.TEXT_WIDGET_RECEIVED, function(textWidget) {
            app.publish(CONST.ACTIONS.RENDER_TEXT_WIDGET, textWidget);
            console.log(textWidget);
        });

        _products.init();
        _blognews.init();
        _textWidget.init();
        _api.init();
        _router.init();
    };

    return app;
};

window.addEventListener('load', function() {
    var app = new App();

    app.init();
});