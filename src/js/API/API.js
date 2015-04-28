var PS = require('../vendor/pubsub.js');

var API = function () {
    var api = {};

    PS.extend(api);

    api.subscribe(CONST.ACTIONS.GET_NEWS, function() {
        api.getNews();
    });

    api.getProducts = function () {
        var products =  _ajaxGet('./data/products.json');

        api.publish(CONST.ACTIONS.PRODUCTS_RECEIVED, products);
    };

    api.getNews = function () {
        var news  = _ajaxGet('./data/news.json');

        api.publish(CONST.ACTIONS.NEWS_RECEIVED, news);
    };

    function _ajaxGet (path) {
        var data;
        var xhr = new XMLHttpRequest();

        xhr.open('GET', path, false);
        xhr.send();

        if (xhr.status != 200) {
            console.log('Error ' + xhr.status + ': ' + xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText);
        }

        return data;
    }

    return api;
};

module.exports = API;

