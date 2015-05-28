var router = require('./core/router.js'),
    api = require('./core/API.js'),
    PS = require('./core/pubsub.js'),
    basket = require('./components/shared/basket/controller.js'),
    layout = require('./components/shared/layout/controller.js'),
    products = require('./components/partials/products/controller.js'),
    pagination = require('./components/partials/pagination/controller.js'),
    singleProduct = require('./components/partials/single-product/controller.js'),
    filters = require('./components//partials/filters/controller.js'),
    about = require('./components/partials/about/controller.js'),
    textWidget = require('./components/shared/textWidget/controller.js'),
    authorization = require('./components/shared/authorization/controller.js');

var app,
    coreModules = [api, router],
    components = {
        shared: [layout, basket, textWidget, authorization],
        partials: {
            home: [products, about],
            products: [products, filters, pagination],
            single: [singleProduct]
        }
    },
    activePartials = [];


module.exports = app = PS.extend({

    init: function() {
        this.subscribe(CONST.ACTIONS.SWITCH_PAGE, switchPage);
        this.subscribe(CONST.ACTIONS.NEW_QUERY, handleNewQuery);

        register(components.shared);
        register(coreModules);
    }

});


function switchPage(route) {

    if (components.partials[ route.page ])  {

        deregister(activePartials);
        activePartials = components.partials[ route.page ];
        register( activePartials );



        PS.publish(CONST.ACTIONS.SWITCH_LAYOUT, route.page);
        PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, route);
        PS.publish(CONST.ACTIONS.SHOW_FILTERS, route.query);
        PS.publish(CONST.ACTIONS.SHOW_NEWS);
        PS.publish(CONST.ACTIONS.SHOW_TEXT_WIDGET);
        PS.publish(CONST.ACTIONS.SHOW_SINGLE_PRODUCT, route.query);
        PS.publish(CONST.ACTIONS.SWITCH_AUTH, 'unAuth');

    } else {

        //show 404

    }
}

function handleNewQuery(route) {

    PS.publish(CONST.ACTIONS.CHANGE_FILTERS, route.query);
    PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, route);

}


function register(modules) {

    modules.forEach(function(module) {
        module.init();
    });

}


function deregister(modules) {

    modules.forEach(function(module) {
        module.remove();
    });

}