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


    get: function() {
        return this._model;
    },


    hasKey: function(key) {
        return this._model.hasOwnProperty(key);
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