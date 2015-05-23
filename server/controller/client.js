var Q = require('q'),
    Client = require('../model/client');


exports.createClient = function(client){
    var defered = new Q.defer();
    client.save(function(err, client){
        if (err){
            defered.reject(err);
        }
        else {
            defered.resolve(client);
        }
    });
    return defered.promise;

};
