var PS = require('./vendor/pubsub.js'),
    BlogNewsController = require('./blognews/controller.js'),
    ProductsController = require('./products/controller.js'),
    MainBlockController = require('./main_block/controller.js');

var Mediator = function() {
    var mediator = {},
        _blognews,
        _products,
        _mainBlock;

    PS.extend(mediator);

    mediator.init = function() {

        /**
         * Respond to routing
         */
        mediator.subscribe(CONST.ACTIONS.SWITCH_TO_HOME, function() {
            if (!_mainBlock) {
                _mainBlock = new MainBlockController();

                _mainBlock.init();
            }

            if (!_blognews) {
                _blognews = new BlogNewsController();

                _blognews.init();
            }

            if (!_products) {
                _products = new ProductsController();

                _products.init();
            }

            mediator.publish(CONST.ACTIONS.RENDER_HOME_LAYOUT);

            mediator.publish(CONST.ACTIONS.SAVE_PRODUCTS_QUERY, 6);
        });

        mediator.subscribe(CONST.ACTIONS.SWITCH_TO_PRODUCTS, function() {
            if (!_mainBlock) {
                _mainBlock = new MainBlockController();

                _mainBlock.init();
            }

            if (!_products) {
                _products = new ProductsController();

                _products.init();
            }

            mediator.publish(CONST.ACTIONS.RENDER_PRODUCTS_LAYOUT);

            mediator.publish(CONST.ACTIONS.SAVE_PRODUCTS_QUERY, 12);
        });

        /**
         * Respond to layout rendering
         */
        mediator.subscribe(CONST.ACTIONS.HOME_LAYOUT_RENDERED, function() {
            mediator.publish(CONST.ACTIONS.GET_NEWS);

            mediator.publish(CONST.ACTIONS.GET_PRODUCTS);
        });

        mediator.subscribe(CONST.ACTIONS.PRODUCTS_LAYOUT_RENDERED, function() {
            mediator.publish(CONST.ACTIONS.GET_PRODUCTS);
        });

        /**
         * Respond to api events
         */
        mediator.subscribe(CONST.ACTIONS.NEWS_RECEIVED, function(news) {
            mediator.publish(CONST.ACTIONS.RENDER_NEWS_BLOCK, news);
        });

        mediator.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(products) {
            mediator.publish(CONST.ACTIONS.RENDER_PRODUCTS, products);
        });
    };

    return mediator;
};

module.exports = Mediator;