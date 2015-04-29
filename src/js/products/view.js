var source = fs.readFileSync(__dirname + '/src/js/products/templates/products.hbs', {encoding: 'utf-8'}),
    View = require('../base/base-view.js');

function ProductsView() {

    var view = new View();

    view.template = Handlebars.compile(source);
    view.parent = CONST.SELECTORS.PRODUCTS;

    return view;
}

module.exports = ProductsView;