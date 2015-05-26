var singleProductModule,
    baseController = require('../../base/controller.js'),
    view = require('./view.js');

module.exports = singleProductModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_SINGLE_PRODUCT, getProduct);
        this.subscribe(CONST.ACTIONS.SINGLE_PRODUCT_RECEIVED, renderProduct);

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();
    }


});

function getProduct(query) {
    singleProductModule.publish(CONST.ACTIONS.GET_SINGLE_PRODUCT, query.id);
}

function renderProduct(product) {
    view.render(product);
    $('.product-page-gallery-big-image').zoom();

    $('.product-page-actions__buy').on('click', function() {
        singleProductModule.publish(CONST.ACTIONS.ADD_TO_BASKET, product);
    });

}

