var filtersMap;

module.exports = {

    handleQuery: function(route) {
        var query = route.query,
            numberOfPages;

        for (var n in query) {
            if (query.hasOwnProperty(n)) {
                if (filtersMap[n]) {
                    filtersMap[n].call(this, (query[n]));
                }
            }
        }

        numberOfPages = Math.ceil(this.length() / CONST.PRODUCTS_PER_PAGE);

        if (query && query.page) {
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
};


filtersMap = {
    "color": function(val) {
        this.filter('colors', val);
    },
    "style": function(val) {
        this.filter('categories', val);
    },
    "offer": function (val) {
        if (val === "must_have") {
            this.filter('categories', val);
        } else if (val === "sale") {
            this.filter('sale', true);
        }
    },
    "sort": function(val) {
        this.sort( 'price', val === 'price_des' );
    },
    "s": function(val) {
        this.search(val);
    }
};