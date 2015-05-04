var PS = require('../vendor/pubsub.js');

var API = function () {
    var api = {};

    PS.extend(api);

    api.init = function() {
        api.subscribe(CONST.ACTIONS.GET_NEWS, function() {
            api.getNews();
        });
    };

    api.subscribe(CONST.ACTIONS.GET_HOME_DATA, function () {
        api.getProducts();
    });

    api.getProducts = function () {
        _ajaxGet('./data/products.json', function (products) {
            api.publish(CONST.ACTIONS.HOME_DATA_RECEIVED, products);
        });
    };

    api.getNews = function () {
        _ajaxGet('./data/news.json', function (news) {
            api.publish(CONST.ACTIONS.NEWS_RECEIVED, news);
        });
    };

    function _ajaxGet (path, callback) {
        $.getJSON(path, function(data) {
            callback(data); // data goes into callback function, that is passed as argument
        });
    }

    return api;
};

module.exports = API;

