var textWidgetModule,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = textWidgetModule = baseController.extend({

    init: function () {

        var self = this;

        this._subscriptions = [];

        this.subscribe(CONST.ACTIONS.SHOW_TEXT_WIDGET, function () {

            self.publish(CONST.ACTIONS.GET_TEXT_WIDGET);

        });

        this.subscribe(CONST.ACTIONS.TEXT_WIDGET_RECEIVED, function (news) {

            collection.populate(news);
            view.render({
                items: collection.getLast(1)
            });

        });

    },

    remove: function () {

        this.unsubscribeThis();
        view.remove();

    }

});