var View = require('./view.js');
var PS = require('../vendor/pubsub.js');

function UsersController() {

    var controller = {};

    PS.extend(controller);

    controller.view = View();

    // <Temporary - while API is not available>
    controller.model = {
        items: [{
            date: 'APR 01',
            title: 'Nice & Clean. The best for you blog!',
            excerpt: 'Ne vim mutat doctus qualisque. At case aeterno eleifend usu, dolor malorum se'
        },{
            date: 'APR 01',
            title: 'What an ecomerce theme ',
            excerpt: 'Ne vim mutat doctus qualisque. At case aeterno eleifend usu, dolor malorum se'
        }]
    };
    // </Temporary - while API is not available>

    controller.subscribe(CONST.ACTIONS.RENDER_NEWS_BLOCK, function() {
        controller.view.append( controller.model );
    });

    return controller;
}

module.exports = UsersController;