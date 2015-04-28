function NewsModel() {
    var _model = [],
        model = {};

    model.set = function (news) {
        _model = news;
    };

    model.getLast = function() {
        return {
            items: _model.slice(0,2)
        };
    };

    return model;
}

module.exports = NewsModel;