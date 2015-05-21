var authModule,
    model = require('./model.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = authModule = baseController.extend({

    init: function () {
        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SWITCH_AUTH, function (auth) {
            view.template = view.templates[ auth ];
            view.render();
        });
    },

    remove: function () {

        this.unsubscribeThis();
        view.remove();

    }

});