var view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = baseController.extend({

    init: function() {

        this.subscribe(CONST.ACTIONS.SWITCH_LAYOUT, function(layout) {

            view.template = view.templates[ layout ];
            view.render();

        });

    }

});