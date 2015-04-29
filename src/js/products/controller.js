var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function ProductsController() {

    var controller = {},
        _view = new View(),
        _model = new Model();

    PS.extend(controller);

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.RENDER_PRODUCTS, function(products) {
            _model.set(products);

            _view.append( _model.getLast(6) );
        });
    };

    return controller;
}

module.exports = ProductsController;