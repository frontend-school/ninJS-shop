var source = fs.readFileSync(__dirname + '/src/app/components/partials/single-product/templates/single-product.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.SINGLE_PRODUCT,

    template: Handlebars.compile(source)

});