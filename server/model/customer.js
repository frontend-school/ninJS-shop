var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Customer = new Schema({
        email: {
            type: String
           // unique: true
        },
        password: {
            type: String
        },
        name: {
            type: String
        },
        surname: {
            type: String
        },
        bookmarked: {
            type: Array
        }
    });

// Execute before each user.save() call
/*Customer.pre('save', function(callback) {
    var user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) {
        return callback();
    }

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return callback(err);
            }
            user.password = hash;
            callback();
        });
    });
});*/

Customer.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Customer', Customer);