var filtersController,
    model = require('./model.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = filtersController = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_FILTERS, displayFilters);

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();

    }
});


function displayFilters(query) {

    if (query === undefined) {

        model.reset();

    }

    // update model from hash
    if (model.isEmpty()) {

        for (var n in query) {
            if (query.hasOwnProperty(n)) {
                model.put(n, query[n] || true);
            }
        }
    }

    view.render(model.get());

    $(CONST.SELECTORS.FILTER_ITEM).on('click', function() {

        var filterKey = $(this).parent().data('filter'),
            filterValue = $(this).data('filter_value');

        if (model.getByKey(filterKey) === filterValue) {

            model.remove(filterKey);

        } else {

            model.put( filterKey, filterValue );

        }

        filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
    });

    $(CONST.SELECTORS.FILTERS_SELECTED).on('click', function() {

        var filterKey = $(this).data('filter');

        model.remove(filterKey);

        filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
    });

}