window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js'),
    API = require('./API/API.js'),
    Router = require('./router.js'),
    BlogNewsController = require('./blognews/controller.js'),
    ProductsController = require('./products/controller.js'),
    MainBlockController = require('./main_block/controller.js');

var App = function() {

    var app = {},
        _router = new Router(),
        _api = new API(),
        _blognews = new BlogNewsController(),
        _products = new ProductsController(),
        _mainBlock = new MainBlockController();

    PS.extend(app);

    app.init = function() {

        //home page events
        app.subscribe(CONST.ACTIONS.SWITCH_TO_HOME, function() {
            app.publish(CONST.ACTIONS.RENDER_HOME_LAYOUT);

            app.publish(CONST.ACTIONS.SAVE_PRODUCTS_QUERY, 6);
        });

        app.subscribe(CONST.ACTIONS.HOME_LAYOUT_RENDERED, function() {
            app.publish(CONST.ACTIONS.GET_NEWS);

            app.publish(CONST.ACTIONS.GET_PRODUCTS);
        });

        //products page events
        app.subscribe(CONST.ACTIONS.SWITCH_TO_PRODUCTS, function() {
            app.publish(CONST.ACTIONS.RENDER_PRODUCTS_LAYOUT);

            app.publish(CONST.ACTIONS.SAVE_PRODUCTS_QUERY, 12);
        });

        app.subscribe(CONST.ACTIONS.PRODUCTS_LAYOUT_RENDERED, function() {
            app.publish(CONST.ACTIONS.GET_PRODUCTS);
        });

        //api events
        app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        app.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(products) {
            app.publish(CONST.ACTIONS.RENDER_PRODUCTS, products);
        });


        _api.init();
        _products.init();
        _blognews.init();
        _mainBlock.init();
        _router.init();
    };

    return app;
};

window.addEventListener('load', function() {
    var app = new App();

    app.init();
});