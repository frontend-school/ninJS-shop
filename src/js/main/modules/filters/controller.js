var filtersController,
    model = require('./model.js'),
    view = require('./view.js'),
    baseController = require('./../../../base/controller.js');


module.exports = filtersController = baseController.extend({

    init: function() {

        model.setDefaults();

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_FILTERS, displayFilters);

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();

    }
});


function displayFilters(query) {

    // update model from hash
    for (var n in query) {
        if (query.hasOwnProperty(n)) {
            model.set(n, query[n] || true);
        }
    }

    view.render(model.get());

    $(CONST.SELECTORS.FILTER_CHECKBOX).on('click', function() {

        model.set(this.value, this.checked);

        filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());

    });

}