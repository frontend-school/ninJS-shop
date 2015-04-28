window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js'),
    Router = require('./router.js'),
    BlogNewsController = require('./blognews/controller.js'),
    API = require('./API/API.js');

var App = function() {

    var app = {};

    PS.extend(app);

    app.router = Router();

    app.router.crossroads.addRoute(CONST.HASHES.DEFAULT, function() {

        //define subscriptions
        app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        app.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(products) {
            console.log(products);
        });

        //load modules
        BlogNewsController();
        API();

        //publish startup events
        app.publish(CONST.ACTIONS.GET_NEWS);
        app.publish(CONST.ACTIONS.GET_PRODUCTS);
    });

    app.router.hasher.init();

    return app;
};

window.addEventListener('load', function() {

    window.app = App();

});