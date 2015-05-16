var source = fs.readFileSync(__dirname + '/src/app/components/partials/products/templates/products.hbs', {encoding: 'utf-8'});
    var baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.PRODUCTS,

    template: Handlebars.compile(source)

});