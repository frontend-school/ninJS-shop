var router = require('./router.js'),
    API = require('./API/API.js'),
    api = new API(),
    basket = require('./basket/controller.js'),
    main = require('./main/layout/controller.js'),
    products = require('./main/modules/products/controller.js'),
    filters = require('./main/modules/filters/controller.js'),
    PS = require('./vendor/pubsub.js');

var app,
    coreModules = [main, api, basket, router],
    pageModules = {
        home: [products],
        products: [products, filters]
    },
    activePageModules = [],
    query;


module.exports = app = PS.extend({

    init: function() {
        this.subscribe(CONST.ACTIONS.SWITCH_PAGE, switchPage);
        this.subscribe(CONST.ACTIONS.NEW_QUERY, handleQuery);

        register(coreModules);
    }

});


function switchPage(route) {

    if (pageModules[ route.page ])  {

        query = route.query || {};
        query.view = route.page;

        deregister(activePageModules);
        activePageModules = pageModules[ route.page ];
        register( activePageModules );

        PS.publish(CONST.ACTIONS.SWITCH_LAYOUT, route.page);
        PS.publish(CONST.ACTIONS.SHOW_PRODUCTS, query);
        PS.publish(CONST.ACTIONS.SHOW_FILTERS, query);

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