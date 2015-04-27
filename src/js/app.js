window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var PS = require('./vendor/pubsub.js');
var router = require('./router.js')();

var App = function() {

    var app = {};

    PS.extend(app);

    app.router = router;

    app.router.crossroads.addRoute('home', function() {

        //define subscriptions
        app.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        //define modules
        require('./blognews/controller.js')();
        require('./API/API.js')();

        //publish startup events
        app.publish(CONST.ACTIONS.GET_NEWS);
    });

    app.router.hasher.init();

    return app;
};

window.addEventListener('load', function() {

    window.app = App();

});