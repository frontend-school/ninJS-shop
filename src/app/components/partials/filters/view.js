var source = fs.readFileSync(__dirname + '/src/app/components/partials/filters/templates/filters.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.PRODUCTS_HEADER,

    template: Handlebars.compile(source)

});