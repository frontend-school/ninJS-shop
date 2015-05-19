var baseCollection = require('../../base/collection.js'),
    viewCollection;



module.exports = baseCollection.extend({

    handleQuery: function() {

        viewCollection = this._collection;

        for (var n in this._query) {
            if (this._query.hasOwnProperty(n)) {

                switch (n) {
                    case 'sale_only':
                        viewCollection = viewCollection.filter(function(product) {
                            return !!product.sale;
                        });
                        break;

                    case 'priced_first':
                        viewCollection.sort(function(a, b) {
                            return a.price - b.price;
                        });
                        break;
                }
            }
        }

        viewCollection =  viewCollection.slice(0, (this._query.page === 'home') ? 6 : 12);

        return viewCollection;
    }

});