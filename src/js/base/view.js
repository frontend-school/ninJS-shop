module.exports = {

    extend: function (obj) {

        var view = new View();

        for (var n in obj) {

            if (obj.hasOwnProperty(n)) {
                view[n] = obj[n];
            }

        }

        return view;

    }
};

function View() {

}


View.prototype = {

    render: function (model) {
        $(this.parent).html(this.template(model));
    },


    append: function(model) {
        $(this.parent).append(this.template(model));
    },


    remove: function() {
        $(this.parent).empty();
    }

};