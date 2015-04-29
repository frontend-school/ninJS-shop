var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function ProductsController() {

    var controller = {},
        _view = new View(),
        _model = new Model(),
        _query;

    PS.extend(controller);

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.SAVE_PRODUCTS_QUERY, function(query) {
            _query = query;
        });

        controller.subscribe(CONST.ACTIONS.RENDER_PRODUCTS, function(products) {
            _model.set(products);

            _view.append( _model.getLast( _query ) );
        });
    };

    return controller;
}

module.exports = ProductsController;