var fs = require('fs'),
    Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/basket_item.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.BASKET_CONTAINER,

    template: Handlebars.compile(source)

});
