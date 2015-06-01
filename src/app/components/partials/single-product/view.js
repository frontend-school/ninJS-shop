var fs = require('fs'),
    Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/single-product.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.SINGLE_PRODUCT,

    template: Handlebars.compile(source)

});