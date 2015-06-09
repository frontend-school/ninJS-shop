var fs = require('fs');
    var Handlebars = require('handlebars'),
    filters = fs.readFileSync(__dirname + '/templates/filters.hbs', {encoding: 'utf-8'}),
    search = fs.readFileSync(__dirname + '/templates/search.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parents: {
        filters: CONST.SELECTORS.FILTERS,
        search: CONST.SELECTORS.SEARCH
    },

    templates: {
        filters: Handlebars.compile(filters),
        search: Handlebars.compile(search)

    },

    listenersGroups: {
        filter: [{
                target: CONST.SELECTORS.FILTER_ITEM,
                event: 'click',
                handler: 'selectFilter'
            },
            {
                target: CONST.SELECTORS.FILTERS_SELECTED,
                event: 'click',
                handler: 'removeFilter'
            }],
        search: [{
                target: CONST.SELECTORS.FILTERS_SEARCH,
                event: 'input',
                handler: 'search'
            },
            {
                target: CONST.SELECTORS.FILTERS_SEARCH_CLOSE,
                event: 'click',
                handler: 'clearSearchInput'
            }]
    },

    renderFilters: function(model) {
        this.parent = this.parents['filters'];
        this.template = this.templates['filters'];
        this.listeners = this.listenersGroups['filter'];
        this.superRender(model);
    },

    renderSearch: function(model) {
        this.parent = this.parents['search'];
        this.template = this.templates['search'];
        this.listeners = this.listenersGroups['search'];
        this.superRender(model);
    }


});

Handlebars.registerHelper('iff', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});