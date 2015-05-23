var productsModule,
    collection = require('./collection.js'),
    viewProducts = require('./view-products.js'),
    baseController = require('../../base/controller.js'),
    Q = require('q');

module.exports = productsModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_PRODUCTS, showProducts);

    },

    remove: function() {

        this.unsubscribeThis();
        viewProducts.remove();

    }

});

function showProducts(route) {

    if (collection.isEmpty()) {
        var deferred = new Q.defer();

        productsModule.publish(CONST.ACTIONS.GET_PRODUCTS);

        productsModule.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(data) {

            deferred.resolve(data);

        });

        deferred.promise.then(function(data) {

            collection.populate(data);
            renderQueriedProducts(route);

        });

    } else {
        renderQueriedProducts(route);
    }

}


function renderQueriedProducts(route) {

    viewProducts.remove();

    var viewCollection = collection.handleQuery(route);

    if (viewCollection.length) {

        var numberOfPages = Math.ceil(viewCollection.length / CONST.PRODUCTS_PER_PAGE);

        productsModule.publish(CONST.ACTIONS.SHOW_PAGINATION, {
            query: route.query,
            numberOfPages: numberOfPages
        });

        if (route.query && route.query.page) {

            viewCollection =  viewCollection.slice(
                CONST.PRODUCTS_PER_PAGE * (route.query.page - 1),
                CONST.PRODUCTS_PER_PAGE * (route.query.page)
            );

        } else {

            viewCollection =  viewCollection.slice(
                0,
                (route.page === 'home') ? 6 : CONST.PRODUCTS_PER_PAGE
            );

        }

        viewCollection.forEach(function(model) {

            viewProducts.append(model);

            $(CONST.SELECTORS.PRODUCTS).find(CONST.SELECTORS.ADD_TO_BASKET).last().on('click', function() {
                productsModule.publish(CONST.ACTIONS.ADD_TO_BASKET, model);
            });

        });

    } else {

        viewProducts.render({
            nothing_found: true
        });

    }
}
