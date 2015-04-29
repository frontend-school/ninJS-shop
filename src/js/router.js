var signals = require('signals'),
    crossroads = require('crossroads'),
    hasher =  require('hasher'),
    PS = require('./vendor/pubsub.js');

var Router = function() {

    var router = {};

    PS.extend(router);

    router.signals = signals;
    router.crossroads = crossroads;
    router.hasher = hasher;

    router.crossroads.addRoute(CONST.ROUTES.DEFAULT, function() {
        //publish startup events
        router.publish(CONST.ACTIONS.GET_NEWS);
        router.publish(CONST.ACTIONS.GET_PRODUCTS);
    });

    if (hasher.getURL() === hasher.getBaseURL()) {
        hasher.setHash(CONST.ROUTES.DEFAULT);
    }

    router.hasher.initialized.add(parseHash);
    router.hasher.changed.add(parseHash);

    function parseHash(newHash, oldHash){
        router.crossroads.parse(newHash);
    }

    return router.hasher;
};

module.exports = Router;