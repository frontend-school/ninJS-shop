module.exports = {
    displayFilters: ['model', 'view', function (model, view) {
        return function (query) {

            model.reset();

            if (query !== undefined) {
                for (var n in query) {
                    if (query.hasOwnProperty(n)) {
                        model.put(n, query[n] || true);
                    }
                }
            }

            view.renderSearch(model.get());
            view.renderFilters(model.get());
        }
    }],

    changeFilters: ['model', 'view', function (model, view) {
        return function (query) {

            model.reset();

            if (query !== undefined) {
                for (var n in query) {
                    if (query.hasOwnProperty(n)) {
                        model.put(n, query[n] || true);
                    }
                }
            }

            view.renderFilters(model.get());
        }
    }],

    selectFilter: ['model', 'publisher', '$', function (model, publisher, $) {
        return function () {
            var filterKey = $(this).parent().data('filter'),
                filterValue = $(this).data('filter_value');

            if (model.getByKey(filterKey) === filterValue) {
                model.remove(filterKey);
            } else {
                model.put(filterKey, filterValue);
            }

            model.remove('page');

            publisher.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
        }
    }],

    removeFilter: ['model', 'publisher', '$', function (model, publisher, $) {
        return function () {
            var filterKey = $(this).data('filter');

            model.remove(filterKey);
            model.remove('page');

            publisher.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
        }
    }],

    search: ['model', 'publisher', '$', function (model, publisher, $) {
        return function () {
            var $this = $(this),
                $closeBtn = $this.siblings().first();

            if ($this.val()) {
                model.put($this.data('filter'), $this.val());
                $closeBtn.removeClass('search-container__close_hidden');
            } else {
                model.remove($this.data('filter'));
                $closeBtn.addClass('search-container__close_hidden');
            }

            publisher.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());
        }
    }],

    clearSearchInput: ['search', '$', function(search, $){
        return function() {
            $(CONST.SELECTORS.FILTERS_SEARCH).val('');
            search.call($(CONST.SELECTORS.FILTERS_SEARCH));
            $(CONST.SELECTORS.FILTERS_SEARCH_CLOSE).addClass();
        }
    }]
};