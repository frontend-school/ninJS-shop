var productsModule,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');

module.exports = productsModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_PRODUCTS, queryUpdate);
        this.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, updateModule);

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();

    }

});


function queryUpdate(query) {

    collection.setQuery(query);
    productsModule.publish(CONST.ACTIONS.GET_PRODUCTS);

}


function updateModule(data) {

    view.remove();

    collection.populate(data);
    collection.handleQuery();

    collection.get().forEach(function(model) {

        view.append(model);

        $(CONST.SELECTORS.PRODUCTS).find(CONST.SELECTORS.ADD_TO_BASKET).last().on('click', function() {
                productsModule.publish(CONST.ACTIONS.ADD_TO_BASKET, model);
            });

    });

}