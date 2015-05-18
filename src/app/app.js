var router = require('./core/router.js'),
    API = require('./core/API.js'),
    api = new API(),
    PS = require('./core/pubsub.js'),
    basket = require('./components/shared/basket/controller.js'),
    layout = require('./components/shared/layout/controller.js'),
    products = require('./components/partials/products/controller.js'),
    filters = require('./components//partials/filters/controller.js'),
    about = require('./components/partials/about/controller.js');

var app,
    coreModules = [api, router],
    components = {
        shared: [layout, basket],
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
        this.subscribe(CONST.ACTIONS.NEW_QUERY, handleQuery);

        register(components.shared);
        register(coreModules);
    }

});


function switchPage(route) {

    if (components.partials[ route.page ])  {

        query = route.query || {};
        query.view = route.page;

        deregister(activePartials);
        activePartials = components.partials[ route.page ];
        register( activePartials );

        PS.publish(CONST.ACTIONS.SWITCH_LAYOUT, route.page);
        PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, query);
        PS.publish(CONST.ACTIONS.SHOW_FILTERS, query);
        PS.publish(CONST.ACTIONS.SHOW_NEWS);

    } else {

        //show 404

    }
}


function handleQuery(route) {

    query = route.query || {};
    query.view = route.page;

    PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, query);

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