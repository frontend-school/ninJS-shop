var signals = require('signals');
var crossroads = require('crossroads');
var hasher =  require('hasher');

var Router = function() {

    var router = {};

    router.signals = signals;
    router.crossroads = crossroads;
    router.hasher = hasher;

    if(! router.hasher.getHash()){
        router.hasher.setHash(CONST.HASHES.DEFAULT);
    }

    router.hasher.initialized.add(parseHash);
    router.hasher.changed.add(parseHash);

    function parseHash(newHash, oldHash){
        router.crossroads.parse(newHash);
    }

    return router;
};

module.exports = Router;