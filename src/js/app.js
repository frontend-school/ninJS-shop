window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var API = require('./API/API.js'),
    Router = require('./router.js'),
    Mediator = require('./mediator.js');

var App = function() {

    var app = {},
        _router = new Router(),
        _api = new API(),
        _mediator = new Mediator();

    app.init = function() {
        _api.init();
        _mediator.init();
        _router.init();
    };

    return app;
};

window.addEventListener('load', function() {
    var app = new App();

    app.init();
});