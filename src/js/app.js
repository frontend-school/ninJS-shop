window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js'),
    API = require('./API/API.js'),
    Router = require('./router.js'),
    BlogNewsController = require('./blognews/controller.js');

var App = function() {

    var app = {};

    PS.extend(app);

    app.router = Router();
    app.api = API();
    app.blognews = BlogNewsController();

    app.init = function() {
        app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        app.blognews.init();
        app.api.init();
        app.router.init();
    };

    return app;
};

window.addEventListener('load', function() {
    var app = App();

    app.init();
});