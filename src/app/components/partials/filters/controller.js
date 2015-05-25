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

    model.reset();

    if (query !== undefined) {
        for (var n in query) {
            if (query.hasOwnProperty(n)) {
                model.put(n, query[n] || true);
            }
        }
    }

    view.render(model.get());

    addListeners();

}


function addListeners() {

    $(CONST.SELECTORS.FILTER_ITEM).on('click', selectFilter);
    $(CONST.SELECTORS.FILTERS_SELECTED).on('click', removeFilter);

}


function selectFilter() {

    var filterKey = $(this).parent().data('filter'),
        filterValue = $(this).data('filter_value');

    if (model.getByKey(filterKey) === filterValue) {
        model.remove(filterKey);
    } else {
        model.put( filterKey, filterValue );
    }

    model.remove('page');

    filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
}


function removeFilter() {

    var filterKey = $(this).data('filter');

    model.remove(filterKey);
    model.remove('page');

    filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());

}