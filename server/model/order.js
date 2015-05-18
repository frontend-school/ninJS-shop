var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Order = new Schema({
        date : {
            type: Date
        },
        status: {
            type: Number
        },
        products: {
            type: Array
        },
        id_customer: {
            type: String
        }
    });

module.exports = mongoose.model('Order',Order);