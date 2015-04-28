window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js'),
    API = require('./API/API.js'),
    Router = require('./router.js');

var App = function() {

    var app = {};

    app.router = Router();

    PS.extend(app);

    //define subscriptions
    app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
        app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
    });

    //load common modules
    API();

    app.router.hasher.init();

    return app;
};

window.addEventListener('load', function() {

    window.app = App();

});