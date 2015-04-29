var View = require('./view.js'),
    Model = require('./model.js'),
    PS = require('../vendor/pubsub.js');

function UsersController() {

    var controller = {};

    PS.extend(controller);

    controller.view = View();
    controller.model = Model();

    controller.init = function() {
        controller.subscribe(CONST.ACTIONS.RENDER_NEWS_BLOCK, function(news) {
            controller.model.set(news);

            controller.view.append( controller.model.getLast() );
        });
    };

    return controller;
}

module.exports = UsersController;