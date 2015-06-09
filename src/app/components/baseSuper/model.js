module.exports = {

    extend: function (obj) {

        var model = new Model();

        for (var n in obj) {

            if (obj.hasOwnProperty(n)) {
                model[n] = obj[n];
            }

        }

        return model;

    }
};

function Model() {

    this._model = {};

}

Model.prototype = {

    _model: {},


    set: function(key, value) {

        if (this.hasKey(key)) {
            this._model[key] = value;
        }
    },

    put: function(key, value) {

        this._model[key] = value;

    },

    populate: function(obj) {
        var n;
        for (n in obj) {
            if (obj.hasOwnProperty(n)) {
                this._model[n] = obj[n];
            }
        }

    },


    setDefaults: function() {
        var def = this._defaults;

        if (def) {
            for (var n in def) {
                if (def.hasOwnProperty(n)) {
                    this._model[n] = def[n];
                }
            }
        }
    },


    remove: function(key) {

        delete this._model[key];

    },


    get: function() {
        return this._model;
    },

    getByKey: function(key) {
        return this._model[key];
    },


    hasKey: function(key) {
        return this._model.hasOwnProperty(key);
    },

    isEmpty: function() {
        return Object.getOwnPropertyNames(this._model).length === 0;
    },

    reset: function() {
        this._model = this._defaults || {};
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