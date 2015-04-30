function textWidgetModel() {
    var _model = [],
        model = {};

    model.set = function (textWidget) {
        _model = textWidget;
    };

    model.getLast = function() {
        return {
            items: _model.slice(1,2)
        };
    };

    return model;
}

module.exports = textWidgetModel;