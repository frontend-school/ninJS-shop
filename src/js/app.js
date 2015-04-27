window.CONST = require('./constants.js');
var router = require('./router.js')();

window.addEventListener('load', function() {

    router.crossroads.addRoute('home', function() {

        console.log('yey!');

        //load other modules

    });

    router.hasher.init();

});

