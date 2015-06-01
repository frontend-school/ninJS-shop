var productsModule,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js'),
    Q = require('q'),
    storage = require('../../../core/localStr.js');

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

    updateCollection().then(function() {

        queryCollection(route);
        renderProducts();

    });

}

function updateCollection() {

    var deferred = new Q.defer();

    if ( !storage.isKey('products') ) {

        productsModule.publish(CONST.ACTIONS.GET_PRODUCTS);
        productsModule.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(data) {

            storage.saveObj('products', data);
            collection.populate(storage.retrieveObj('products'));

            deferred.resolve();
        });

    } else {

        collection.populate(storage.retrieveObj('products'));
        deferred.resolve();
    }

    return deferred.promise;
}


function queryCollection(route) {

    var numberOfPages = collection.handleQuery(route);

    productsModule.publish(CONST.ACTIONS.SHOW_PAGINATION, {
        query: route.query,
        numberOfPages: numberOfPages
    });
}


function renderProducts() {

    view.remove();

    if ( collection.length() ) {

        collection.get().forEach(function(model) {

            view.append(model);

            $(CONST.SELECTORS.PRODUCTS).find(CONST.SELECTORS.ADD_TO_BASKET).last().on('click', function(event) {
                productsModule.publish(CONST.ACTIONS.ADD_TO_BASKET, model);

                event.stopPropagation();
            });

            $(CONST.SELECTORS.PRODUCTS).find(CONST.SELECTORS.PRODUCT_ITEM).last().on('click', function() {

                productsModule.publish(CONST.ACTIONS.SWITCH_TO_SINGLE_PRODUCT, model._id);
            });

        });

    } else {

        view.render({
            nothing_found: true
        });
    }
}
