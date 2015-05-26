var authModule,
    model = require('./model.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = authModule = baseController.extend({

    init: function () {
        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_AUTH, function () {
            view.remove();
            updateView();
            addListeners();
        });
    },

    remove: function () {
        this.unsubscribeThis();
        view.remove();
    }

});

function updateView() {
    view.template = view.templates[model.status];
    view.render();
}

function addListeners() {
    $(CONST.SELECTORS.LOG_IN_BUTTON).on('click', function () {
        model.status = 'logIn';
        updateView();
    });
}