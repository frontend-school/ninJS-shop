var User = require('../model/customer'),
    Client = require('../model/client'),
    jwt = require('jsonwebtoken');

exports.apiLogin = function(req, res){

};

exports.apiSignup = function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;

                userModel.save(function(err, user) {
                    if (err) {
                        throw err;
                    }

                    var newClient = new Client({
                        name: 'ninjs-shop',
                        email: user.email,
                        token: jwt.sign(user, 'secret_key'),  //Secret key must be in env var
                        customerID : user._id
                    });

                    newClient.save(function(err, client) {
                        if (err){
                            throw err;
                        }
                        res.json({
                            type:true,
                            data: {
                                email: user.email,
                                customerID : user._id,
                                name: user.name
                            },
                            token: client.token
                        });
                    });


                });
            }
        }
    });
};