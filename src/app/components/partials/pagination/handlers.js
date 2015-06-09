module.exports = {
    switchPageNumber: ['model', 'publisher', '$', function (model, publisher, $) {
        return function() {
            model.set('page', $(this).data('page'));
            publisher.publish(CONST.ACTIONS.FILTER_CHANGED, model.get());

            window.scrollTo(0, 0);
        }
    }],

    showPagination: ['model','view', function(model, view) {
        return function (queryData) {

            var number = queryData.numberOfPages,
                viewModel= {};
                query = queryData.query || {page: 1};

            query.page = query.page || 1;
            model.reset();
            model.populate(query);

            for (var i = 1; i <= number; i++) {
                viewModel[i] = Number(query.page) === i;
            }

            if (number < 2) {
                view.remove();
            } else {
                view.superRender({
                    data: viewModel
                });
            }
        }
    }]
};