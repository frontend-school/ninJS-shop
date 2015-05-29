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
/*
* get client by email and token
* if match return client
* */
exports.getClientByEmailAndToken = function(email, token){
    var deferred = new Q.defer();
    Client.findOne({email:email, token: token}, function(err,client){
        if(err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(client);
        }
    });
    return deferred.promise;
};
