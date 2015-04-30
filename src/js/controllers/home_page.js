var View = require('../views/home_page.js'),
    PS = require('../vendor/pubsub.js');

function ProductsController() {

    var controller = {},
        _view = new View();

    PS.extend(controller);

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.RENDER_HOME_LAYOUT, function() {
            _view.template = _view.templateHome;

            _view.render();

            controller.publish(CONST.ACTIONS.HOME_LAYOUT_RENDERED);
        });

        controller.subscribe(CONST.ACTIONS.RENDER_PRODUCTS_LAYOUT, function() {
            _view.template = _view.templateProducts;

            _view.render();

            controller.publish(CONST.ACTIONS.PRODUCTS_LAYOUT_RENDERED);
        });
    };

    return controller;
}

module.exports = ProductsController;