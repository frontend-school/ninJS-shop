function ProductsModel() {
    var _model = [],
        model = {};

    model.set = function(products) {
        _model = products;
    };

    model.getLast = function(amount) {
        return {
            items: _model.slice(0,amount)
        };
    };

    return model;
}

module.exports = ProductsModel;