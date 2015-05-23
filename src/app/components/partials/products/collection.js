var baseCollection = require('../../base/collection.js'),
    viewCollection,
    filters,
    query;

module.exports = baseCollection.extend({

    handleQuery: function(route) {

        viewCollection = this._collection.slice();
        query = route.query;

        for (var n in query) {
            if (query.hasOwnProperty(n)) {

                if (filters[n]) {

                    if (filters[n][ query[n] ]) {
                        filters[n][ query[n] ]();
                    } else {
                        filters[n]( query[n] );
                    }
                }
            }
        }

        return viewCollection;
    }

});





filters = {

    "offer": {

        "must_have": function() {

            viewCollection = viewCollection.filter(function(product) {

                return product.categories.some(function(cat) {
                    return cat === "must_have";
                });
            });

        },

        "sale": function() {

            viewCollection = viewCollection.filter(function(product) {
                return !!product.sale;
            });

        }

    },

    "style": function(selectedStyle) {

        viewCollection = viewCollection.filter(function(product) {

            return product.categories.some(function(cat) {
                return cat === selectedStyle;
            });
        });

    },

    "color": function(selectedColor) {

        viewCollection = viewCollection.filter(function(product) {

            return product.colors.some(function(cat) {
                return cat === selectedColor;
            });
        });

    },

    "sort": {

        "price_asc": function() {

            viewCollection.sort(function(a,b) {
                return a.price - b.price;
            })

        },

        "price_des": function() {

            viewCollection.sort(function(a,b) {
                return b.price - a.price;
            })

        }

    }

};
