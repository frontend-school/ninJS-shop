var signals = require('signals'),
    crossroads = require('crossroads'),
    hasher =  require('hasher'),
    PS = require('./vendor/pubsub.js'),
    BlogNewsController = require('./blognews/controller.js');

var Router = function() {

    var router = {};

    PS.extend(router);

    router.signals = signals;
    router.crossroads = crossroads;
    router.hasher = hasher;

    router.crossroads.addRoute(CONST.HASHES.DEFAULT, function() {

        //load modules
        BlogNewsController();

        //publish startup events
        router.publish(CONST.ACTIONS.GET_NEWS);
    });

    if (hasher.getURL() === hasher.getBaseURL()) {
        hasher.setHash(CONST.HASHES.DEFAULT);
    }

    router.hasher.initialized.add(parseHash);
    router.hasher.changed.add(parseHash);

    function parseHash(newHash, oldHash){
        router.crossroads.parse(newHash);
    }

    return router;
};

module.exports = Router;