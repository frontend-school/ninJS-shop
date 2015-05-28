var filtersController,
    model = require('./model.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = filtersController = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_FILTERS, displayFilters);
        this.subscribe(CONST.ACTIONS.CHANGE_FILTERS, changeFilters);

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

    view.renderSearch(model.get());
    addSearchListeners();
    view.renderFilters(model.get());
    addFilterListeners();

}


function changeFilters(query) {

    model.reset();

    if (query !== undefined) {
        for (var n in query) {
            if (query.hasOwnProperty(n)) {
                model.put(n, query[n] || true);
            }
        }
    }

    view.renderFilters(model.get());
    addFilterListeners();
}


function addSearchListeners() {
    $(CONST.SELECTORS.FILTERS_SEARCH).on('input', search);
    $(CONST.SELECTORS.FILTERS_SEARCH_CLOSE).on('click', clearSearchInput);
}


function addFilterListeners() {

    $(CONST.SELECTORS.FILTER_ITEM).click(selectFilter);
    $(CONST.SELECTORS.FILTERS_SELECTED).click(removeFilter);

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


function search() {

    if ( $(this).val() ) {
        model.put( $(this).data('filter'), $(this).val() );
        $(this).siblings().first().removeClass('search-container__close_hidden');
    } else {
        model.remove( $(this).data('filter') );
        $(this).siblings().first().addClass('search-container__close_hidden');
    }

    filtersController.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());

}


function clearSearchInput() {

    $(CONST.SELECTORS.FILTERS_SEARCH).val('');
    search.call($(CONST.SELECTORS.FILTERS_SEARCH));
    $(CONST.SELECTORS.FILTERS_SEARCH_CLOSE).addClass('search-container__close_hidden');

}