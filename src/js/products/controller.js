var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function ProductsController() {

    var controller = {};

    PS.extend(controller);

    controller.view = new View();
    controller.model = new Model();

    controller.subscribe(CONST.ACTIONS.RENDER_PRODUCTS, function(products) {
        controller.model.set(products);

        controller.view.append( controller.model.getLast() );
    });

    return controller;
}

module.exports = ProductsController;