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

    renderFilters: function(model) {
        this.parent = this.parents['filters'];
        this.template = this.templates['filters'];
        this.render(model);
    },

    renderSearch: function(model) {
        this.parent = this.parents['search'];
        this.template = this.templates['search'];
        this.render(model);
    }


});

Handlebars.registerHelper('iff', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});