var source = fs.readFileSync(__dirname + '/src/app/components/partials/filters/templates/filters.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.FILTERS,

    template: Handlebars.compile(source)

});

Handlebars.registerHelper('iff', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});