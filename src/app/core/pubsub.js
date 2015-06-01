var subToken = 0;
var events = {};

function PS() {

    return {
        publish: _publish
    };

    function _publish() {}

}

module.exports = {
    publish: function (event, obj) {
        if (!events[event]) {
            return false;
        }

        events[event].forEach(function (item) {
            item.func(obj);
        });
    },

    subscribe: function (event, callback) {
        if (!events[event]) {
            events[event] = [];
        }

        var token = ++subToken;

        events[event].push({
            token: token,
            func: callback
        });

        if (this._subscriptions) {
            this._subscriptions.push(token);
        }
    },

    unsubscribe: function (token) {
        for (var m in events) {
            if (events[m]) {
                for (var i = 0, l = events[m].length; i < l; i++) {
                    if (events[m][i].token === token) {
                        events[m].splice(i, 1);
                    }
                }
            }
        }
    },

    unsubscribeThis: function() {
        var self = this;

        if (this._subscriptions) {
            this._subscriptions.forEach(function(token) {
                self.unsubscribe(token);
            });
        }


    },

    extend: function(obj) {
        for (var n in this) {
            if (this.hasOwnProperty(n) && !obj[n]) {
                obj[n] = this[n];
            }
        }

        return obj;
    }
};