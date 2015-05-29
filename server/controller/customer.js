var User = require('../model/customer'),
    Client = require('../model/client'),
    clientController = require('../controller/client'),
    AUTHSERVERMESSAGE = require('../server_messages/auth'),
    jwt = require('jsonwebtoken'),
    Q = require('q');

var createUser = exports.createUser = function(user){
    var deferred = new Q.defer();
       user.save(function(err, user) {
           if (err){
               deferred.reject(err);
           }
           else {
               deferred.resolve(user);
           }
       });
    return deferred.promise;
};


/*
* return User model by email
* */
var getUserByEmail = exports.getUserByEmail = function(email) {
    var deferred = new Q.defer();

    User.findOne({email: email},function(err, user) {
        if(err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
};

/*
 * return User model by id
 * */
var getUserByID = exports.getUserByID = function(userID) {
    var deferred = new Q.defer();

    User.findOne({id: userID},function(err, user) {
        if(err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(user);
        }
    });
    return deferred.promise;
};

var addProductToBookmarked = exports.addProductToBookmarked = function(userID, productID) {
    var deferred = new Q.defer();

    User.findOneAndUpdate({_id:userID},
        {$push: {bookmarked: productID}},
        {safe: true, upsert: true},
        function(err, user){
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
};

var getBookmarkedProduct = exports.getBookmarkedProduct = function(userID) {
    var deferred = new Q.defer();

    User.findOne({_id: userID},'bookmarked',function(err,userBookmarks){
        if(err){
            deferred.reject(err);
        }
        else {
            deferred.resolve(userBookmarks);
        }
    });

    return deferred.promise;
};


exports.apiLogin = function(req, res){

    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            console.log(err);
            res.json({
                type: false,
                message: AUTHSERVERMESSAGE.AUTH.internal_error
            });
        } else {
            if (user) {
                Client.findOne({customerID: user._id,name: 'ninjs-shop'}, function(err, client) {
                    if (err) {
                        console.log(err);
                        res.json({
                            type: false,
                            message: AUTHSERVERMESSAGE.AUTH.internal_error
                        });
                    } else {
                        var responseModel = {
                            type: true,
                            data: {
                                email: user.email,
                                customerID : user._id,
                                name: user.name
                            },
                            token: client.token
                        };

                        res.json(responseModel);
                    }
                });

            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });

};

exports.apiSignup = function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            console.log(err);
            res.json({
                type: false,
                message: AUTHSERVERMESSAGE.AUTH.internal_error
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: AUTHSERVERMESSAGE.AUTH.user_exists
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.name = req.body.name;

                createUser(userModel).then(function(user){
                    var newClient = new Client({
                        name: 'ninjs-shop',
                        email: user.email,
                        token: jwt.sign(user, 'secret_key'),  //Secret key must be in env var
                        customerID : user._id
                    });
                    clientController.createClient(newClient)
                        .then(function(client){
                            res.json({
                                type:true,
                                data: {
                                    email: user.email,
                                    customerID : user._id,
                                    name: user.name
                                },
                                token: client.token
                            });
                        }.catch(function(err){
                                console.log(err);
                                res.json({
                                    type: false,
                                    message: AUTHSERVERMESSAGE.AUTH.internal_error
                                });
                            })

                    );

                });

            }
        }
    });
};

exports.ensureAuthorized = function(req, res, next){
    var bearerToken;
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        var headerToken = new Buffer(bearer[1], 'base64').toString('ascii').split(" ");
        clientController.getClientByEmailAndToken(headerToken[0],headerToken[1])
            .then(function(client){
                if(client){
                    req.email = headerToken[0];
                    req.token = headerToken[1];
                    req.userID = client.customerID;
                    next();
                }
                else {
                    res.json({
                        type:false,
                        message: AUTHSERVERMESSAGE.SERVER.token_client_mismatch
                    });
                }
            });

    } else {
        res.send(403);
    }
};


exports.postBookmarked = function(req, res) {
    addProductToBookmarked(req.userID, req.body.productID)
        .then(function(){
            res.json({
                type:true,
                message: "product successfully bookmarked"
            });
        })
        .catch(function(){
            res.json({
                type:false,
                message: "product failed to bookmarked"
            });
        });
};

exports.getBookmarked = function(req, res) {

    getBookmarkedProduct(req.userID)
        .then(function(userBookmarks){
            res.json({
                type:true,
                bookmarkList: userBookmarks.bookmarked
            });
        })
        .catch(function(){
            res.json({
                type:false,
                message: "failed to get bookmarks"
            });
        });

};
