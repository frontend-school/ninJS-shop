var baseView = require('../../base/view.js'),
    home = fs.readFileSync(__dirname + '/src/js//main/layout/templates/home_page.hbs', {encoding: 'utf-8'}),
    products = fs.readFileSync(__dirname + '/src/js/main/layout/templates/products_page.hbs', {encoding: 'utf-8'});


module.exports = baseView.extend({

    parent: CONST.SELECTORS.MAIN,

    templates: {
        home: Handlebars.compile(home),
        products: Handlebars.compile(products)
    }

});