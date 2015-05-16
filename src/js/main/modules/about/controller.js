var productsModule,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('./../../../base/controller.js');


module.exports = productsModule = baseController.extend({

    init: function() {

        var self = this;

        this._subscriptions = [];

        this.subscribe(CONST.ACTIONS.SHOW_NEWS, function() {

            self.publish(CONST.ACTIONS.GET_NEWS);

        });

        this.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {

            collection.populate(news);
            view.render({
                items: collection.getLast(2)
            });

        });

    },

    remove: function() {

        this.unsubscribeThis();
        view.remove();

    }

});