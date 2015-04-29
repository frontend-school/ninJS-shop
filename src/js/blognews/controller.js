var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function BlogNewsController() {

    var controller = {},
        _view = new View(),
        _model = new Model();

    PS.extend(controller);

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.RENDER_NEWS_BLOCK, function(news) {
            _model.set(news);

            _view.append( _model.getLast() );
        });
    };

    return controller;
}

module.exports = BlogNewsController;