var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function textWidgetController() {

    var controller = {},
        _view = new View(),
        _model = new Model();

    PS.extend(controller);

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.RENDER_TEXT_WIDGET, function(textWidget) {
            _model.set(textWidget);

            _view.append( _model.getLast() );
        });
    };

    return controller;
}

module.exports = textWidgetController;