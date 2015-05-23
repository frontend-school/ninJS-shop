var singleProductModule,
    baseController = require('../../base/controller.js'),
    view = require('./view.js');

module.exports = productModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_SINGLE_PRODUCT, showProduct)

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();
    }


});

function showProduct(query) {
    view.render();
}

