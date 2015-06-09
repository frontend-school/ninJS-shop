var fs = require('fs');
var Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/products.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.PRODUCTS,

    template: Handlebars.compile(source),

    listeners: [
        {
            target: CONST.SELECTORS.ADD_TO_BASKET,
            event: 'click',
            handler: 'addToBasket'
        },
        {
            target: CONST.SELECTORS.PRODUCT_ITEM,
            event: 'click',
            handler: 'showProduct'
        }
    ],

    superAppend: function(model) {
        $(this.parent).append(this.template(model));

        var view = this;

        this.listeners.forEach(function(listener) {
            $(CONST.SELECTORS.PRODUCTS).find(listener.target).last().on(listener.event, view.handlers[listener.handler](model));
        });
    }

});