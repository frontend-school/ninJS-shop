var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    BasicStrategy = require('passport-http').Strategy,
    TokenStrategy = require('passport-accesstoken').Strategy,
    CONFIG = require('../configuration/secret_config'), // load the auth variables
    User = require('../model/customer'),
    Client = require('../model/client');


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use('facebook',new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : CONFIG.FB_AUTH.FB_API_KEY,
            clientSecret    : CONFIG.FB_AUTH.FB_API_SECRET,
            callbackURL     : CONFIG.FB_AUTH.FB_CALLBACK_URL,
        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                User.findOne({'email':profile.emails[0].value}, function(err, user){
                    if (err){
                        return done(err);
                    }

                    if(user){
                        return done(null, user); // user found, return that user
                    } else {

                        Client.findOne({'name' : 'fb','id' : profile.id }, function(err, user) {

                            if (err) {
                                return done(err);
                            }

                            // if the user is found, then log them in
                            if (user) {
                                return done(null, user); // user found, return that user
                            } else {

                                var newUser = new User({
                                    name : profile.name.givenName + ' ' + profile.name.familyName
                                });
                                // save our user to the database
                                newUser.save(function(err, addedUser) {
                                    if (err){
                                        throw err;
                                    }

                                    var newClient = new Client({
                                        name: 'fb',
                                        id : profile.id,
                                        email: profile.emails[0].value,
                                        token: token,
                                        customerID : addedUser._id
                                    });

                                    newClient.save(function(err) {
                                        if (err){
                                            throw err;
                                        }
                                    });

                                    // if successful, return the new user
                                    return done(null, addedUser);
                                });
                            }

                        });

                    }
                });

                // find the user in the database based on their facebook id
    /*            Client.findOne({'name' : 'facebook','id' : profile.id }, function(err, user) {

                    if (err){
                        return done(err);
                    }


                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();
                      //  var newClient

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err){
                                throw err;
                            }


                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });*/
            });

        }));


// =========================================================================
// BASIC ================================================================
// =========================================================================
/*passport.use('basic',new BasicStrategy(
    function(email, password, callback) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that email
            if (!user) { return callback(null, false); }

                // Make sure the password is correct
                user.verifyPassword(password, function(err, isMatch) {
                    if (err) { return callback(err); }

                    // Password did not match
                    if (!isMatch) { return callback(null, false); }

                    // Success
                    return callback(null, user);
                });

        });


    }
));*/

exports.isFBAuthenticated = passport.authenticate('facebook', { scope : 'email' });
exports.isBasicAuthenticated = passport.authenticate('basic', { session : false });

