var PubSub = function () {

    var subToken = 0;
    var events = {};

    this.publish = function (event, obj) {

        if (!events[event]) {
            return false;
        }

        events[event].forEach(function (item) {
            item.func(obj);
        });

    };

    this.subscribe = function (event, callback) {

        if (!events[event]) {
            events[event] = [];
        }

        var token = ++subToken;

        events[event].push({
            token: token,
            func: callback
        });

        return token;
    };

    this.unsabscribe = function (token) {

        for (var m in events) {

            if (events[m]) {
                for (var i = 0, l = events[m].length; i < l; i++) {
                    if (events[m][i].token === token) {
                        events[m].splice(i, 1);
                    }
                }
            }
        }

    };

    this.extend = function (obj) {
        if (typeof obj !== 'undefined') {
            obj.publish = this.publish;
            obj.subscribe = this.subscribe;
            obj.unsubscribe = this.unsubscribe;
        }
    };

};

module.exports = new PubSub();