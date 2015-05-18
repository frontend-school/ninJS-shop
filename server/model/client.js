var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Client = new Schema({
        name: {
            type: String,
            required: true
        },
        customerID: {
            type: String,
            required: true
        },
        id: {
            type: String,
            unique: true
        },
        email: {
            type: String
        },
        token: {
            type: String
        }

    });


module.exports = mongoose.model('Client', Client);