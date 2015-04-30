var sourceHome = fs.readFileSync(__dirname + '/src/js/views/templates/layouts/home_page.hbs', {encoding: 'utf-8'}),
    sourceProductsPage = fs.readFileSync(__dirname + '/src/js/views/templates/layouts/products_page.hbs', {encoding: 'utf-8'}),
    BaseView = require('./base.js');

var HomeView = function() {
    var view = new BaseView();

    view.parent = CONST.SELECTORS.MAIN;

    view.templates = {
        layout: Handlebars.compile(sourceHome),
        slider: Handlebars.compile(sourceSlider),
        specials: Handlebars.compile(sourceSpecials),
        products: Handlebars.compile(sourceProducts),
        about: Handlebars.compile(sourceAbout)
    };

    return view;
};

module.exports = HomeView;