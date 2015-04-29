var PS = require('../vendor/pubsub.js');

function BaseView() {
    var view = {};

    PS.extend(view);

    view.render =  function (model) {
        $(view.parent).html(view.template(model));
    };

    view.append = function(model) {
        $(view.parent).append(view.template(model));
    };

    view.remove = function() {
        $(view.el).remove();
    };

    return view;
}

module.exports = BaseView;