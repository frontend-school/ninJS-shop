module.exports = {

    extend: function (obj) {

        var collection = new Collection();

        for (var n in obj) {

            if (obj.hasOwnProperty(n)) {
                collection[n] = obj[n];
            }

        }

        return collection;

    }
};

function Collection() {

    this._collection = [];
    this._query = {};

}

Collection.prototype = {

    add: function(model) {
        this._collection.push(model);

        return this;
    },


    remove: function(id) {
        this._collection = this._collection.filter(function(model) {
            return model._id !== id;
        });

        return this;
    },


    populate: function(receivedData) {
        this._collection = receivedData;

        return this;
    },

    filter: function(key, value) {

        this._collection = this._collection.filter(function(model) {
            if (Array.isArray(model[key])) {
                return model[key].some(function(val) {
                    return val === value;
                });
            } else {
                return model[key] === value;
            }
        });

        return this;
    },

    sort: function(key, reverse) {

        this._collection.sort(function(a,b) {
            return reverse ? b[key] - a[key] : a[key] - b[key];
        });

        return this;
    },


    handleQuery: function() {
        //re-write it to handle specific queries
    },


    length: function() {
        return this._collection.length;
    },

    isEmpty: function() {
        return this._collection.length === 0;
    },


    getById: function(id) {
        return this._collection.filter(function(model) {
            return model._id === id;
        })[0];
    },


    getLast: function(num) {
        return this._collection.slice(0, num);
    },


    get: function() {
        return this._collection;
    }

};