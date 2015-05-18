var productModule,
    collection = require('./collection.js'),
    baseController = require('./../../../base/controller.js');

module.exports = productModule = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.GET_PRODUCT, )

    }


})
