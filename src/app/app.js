var router = require('./core/router.js'),
    api = require('./core/API.js'),
    PS = require('./core/pubsub.js'),
    basket = require('./components/shared/basket/controller.js'),
    layout = require('./components/shared/layout/controller.js'),
    products = require('./components/partials/products/controller.js'),
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
            products: [products, filters]
        }
    },
    activePartials = [],
    query;


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
        PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, route.query);
        PS.publish(CONST.ACTIONS.SHOW_FILTERS, route.query);
        PS.publish(CONST.ACTIONS.SHOW_NEWS);
        PS.publish(CONST.ACTIONS.SHOW_TEXT_WIDGET);
        PS.publish(CONST.ACTIONS.SWITCH_AUTH, 'unAuth');
        $(CONST.SELECTORS.LOG_IN_BUTTON).on('click', function () {
            PS.publish(CONST.ACTIONS.SWITCH_AUTH, 'logIn');
        });
        $('.log-in-popup').on('click', function () {
            PS.publish(CONST.ACTIONS.SWITCH_AUTH, 'unAuth');
        });

    } else {

        //show 404

    }
}

function handleNewQuery(route) {

    //for now products section is the only one responding to queries
    PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, route.query);

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