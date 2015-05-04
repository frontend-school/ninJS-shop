window.CONST = require('./constants.js');
window.Handlebars = require('handlebars');
window.fs = require('fs');

var app = require('./app.js');

window.addEventListener('load', function() {

    app.init();

});