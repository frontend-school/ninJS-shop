var PS = require('../vendor/pubsub.js');


module.exports = PS.extend({

    render: function (model) {
        $(this.parent).html(this.template(model));
    },


    append: function(model) {
        $(this.parent).append(this.template(model));
    },


    remove: function() {
        $(this.parent).empty();
    }

});