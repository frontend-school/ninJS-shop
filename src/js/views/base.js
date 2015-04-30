var PS = require('../vendor/pubsub.js');

function BaseView() {
    var view = {};

    PS.extend(view);

    view.render =  function (template, model) {
        $(view.parent).html( template(model) );
    };

    view.append = function(template, model) {
        $(view.parent).append( template(model) );
    };

    view.remove = function() {
        $(view.el).remove();
    };

    return view;
}

module.exports = BaseView;