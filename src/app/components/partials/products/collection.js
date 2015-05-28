var baseCollection = require('../../base/collection.js');

module.exports = baseCollection.extend({

    handleQuery: function(route) {
        var query = route.query;

        for (var n in query) {
            if (query.hasOwnProperty(n)) {
                switch (n) {
                    case "color":
                        this.filter('colors', query[n]);
                        break;
                    case "style":
                        this.filter('categories', query[n]);
                        break;
                    case "offer":
                        switch (query[n]) {
                            case "must_have":
                                this.filter('categories', query[n]);
                                break;
                            case "sale":
                                this.filter('sale', true);
                                break;
                        }
                        break;
                    case "sort":
                        this.sort( 'price', query.sort === 'price_des' );
                        break;
                    case "s":
                        this.search(query[n]);
                        console.log(this._collection);
                        break;
                }
            }
        }

        var numberOfPages = Math.ceil(this.length() / CONST.PRODUCTS_PER_PAGE);

        if (route.query && route.query.page) {
            this._collection =  this._collection.slice(
                CONST.PRODUCTS_PER_PAGE * (route.query.page - 1),
                CONST.PRODUCTS_PER_PAGE * (route.query.page)
            );
        } else {
            this._collection =  this._collection.slice(
                0,
                (route.page === 'home') ? 6 : CONST.PRODUCTS_PER_PAGE
            );
        }

        return numberOfPages;
    }
});
