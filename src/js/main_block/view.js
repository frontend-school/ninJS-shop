var sourceHome = fs.readFileSync(__dirname + '/src/js/main_block/templates/home.hbs', {encoding: 'utf-8'}),
    sourceProductsPage = fs.readFileSync(__dirname + '/src/js/main_block/templates/products_page.hbs', {encoding: 'utf-8'}),
    View = require('../base/base-view.js');

function ProductsView() {

    var view = new View();

    view.templateHome = Handlebars.compile(sourceHome);
    view.templateProducts = Handlebars.compile(sourceProductsPage);
    view.parent = CONST.SELECTORS.MAIN;

    return view;
}

module.exports = ProductsView;