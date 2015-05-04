module.exports = {

    _collection: [],
    _query: {},


    setQuery: function(query) {
        //save query and run it after update
        this._query = query;
    },


    add: function(model) {
        this._collection.push(model);
    },


    remove: function(id) {
        this._collection = this._collection.filter(function(model) {
            return model.id !== id;
        });
    },


    populate: function(receivedData) {
        this._collection = receivedData;
    },


    handleQuery: function() {
        //re-write it to handle specific queries
    },


    length: function() {
        return this._collection.length;
    },


    getById: function(id) {
        return this._collection.filter(function(model) {
            return model.id === id;
        })[0];
    },


    getLast: function(num) {
        return this._collection.slice(0, num);
    },


    get: function() {
        return this._collection;
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