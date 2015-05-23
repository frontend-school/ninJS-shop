var paginationController,
    viewPagination = require('./view-pagination.js'),
    baseController = require('../../base/controller.js');

module.exports = paginationController = baseController.extend({

    init: function() {

        this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SHOW_PAGINATION, showPagination);

    },

    remove: function() {

        this.unsubscribeThis();
        viewPagination.remove();

    }

});



function showPagination(data) {
    var number = data.numberOfPages,
        query = data.query || {
                page: 1
            },
        hbsData= {};

    query.page = query.page || 1;

    for (var i = 1; i <= number; i++) {
        hbsData[i] = Number(query.page) === i;
    }

    if (number === 1) {
        viewPagination.remove();
    } else {
        viewPagination.render({
            data: hbsData
        });

        $(CONST.SELECTORS.PAGINATION_PAGE).on('click', function() {

            query.page = $(this).data('page');

            window.scrollTo(0, 0);

            paginationController.publish(CONST.ACTIONS.FILTER_CHANGED, query);

        });
    }
}
