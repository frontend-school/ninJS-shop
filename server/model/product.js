var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Product = new Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String
        },
        colors: {
            type: Array
        },
        price: {
            type: Number
        },
        image: {
            type: String
        },
        available: {
            type: Boolean
        },
        sale: {
            type: Boolean
        },
        reviews: {
            date: {
                type: Date
            },
            text: {
                type: String
            },
            id_customer: {
                type: String
            }
        }
    });

module.exports = mongoose.model('Product', Product);