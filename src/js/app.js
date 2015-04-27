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

        require('./blognews/controller.js')();
        var api = require('./API/API.js')();
        console.log(api.getProducts());

        app.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK);

        //load other modules

    });

    app.router.hasher.init();

    return app;

};

window.addEventListener('load', function() {

    window.app = App();

});