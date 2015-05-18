var baseCollection = require('../../base/collection.js');



module.exports = baseCollection.extend({

    handleQuery: function() {

        for (var n in this._query) {
            if (this._query.hasOwnProperty(n)) {

                switch (n) {
                    case 'sale_only':
                        this._collection = this._collection.filter(function(product) {
                            return !!product.sale;
                        });
                        break;

                    case 'priced_first':
                        this._collection.sort(function(a, b) {
                            return a.price - b.price;
                        });
                        break;
                }
            }
        }

        this._collection = this._collection.slice(0, (this._query.view === 'home') ? 6 : 12);
    }

});