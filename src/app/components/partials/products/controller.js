var productsModule,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js'),
    Q = require('q');

module.exports = productsModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_PRODUCTS, showProducts);

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();

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

    view.remove();

    var viewCollection = collection.handleQuery(route);

    if (viewCollection.length > 0) {

        viewCollection.forEach(function(model) {

            view.append(model);

            $(CONST.SELECTORS.PRODUCTS).find(CONST.SELECTORS.ADD_TO_BASKET).last().on('click', function() {
                productsModule.publish(CONST.ACTIONS.ADD_TO_BASKET, model);
            });

        });

    } else {

        view.render({
            nothing_found: true
        });

    }



}
