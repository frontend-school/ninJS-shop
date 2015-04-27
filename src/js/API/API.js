var PS = require('../vendor/pubsub.js');

var API = function () {
    var api = {};

    PS.extend(api);

    api.getProducts = function () {
        return _ajaxGet('./data/products.json');
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

