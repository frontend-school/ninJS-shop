module.exports = {
    updateCollection: ['Q', 'publisher', 'storage', 'collection', 'module', function(Q, publisher, storage, collection, module) {
        return function () {

            var deferred = new Q.defer();

            if ( !storage.isKey('products') ) {

                publisher.publish(CONST.ACTIONS.GET_PRODUCTS);
                module.subscribe(CONST.ACTIONS.PRODUCTS_RECEIVED, function(data) {

                    storage.saveObj('products', data);
                    collection.populate(storage.retrieveObj('products'));

                    deferred.resolve();
                });

            } else {

                collection.populate(storage.retrieveObj('products'));
                deferred.resolve();
            }

            return deferred.promise;
        }
    }],

    queryCollection: ['collection', 'publisher', function(collection, publisher) {
        return function (route) {

            var numberOfPages = collection.handleQuery(route);

            publisher.publish(CONST.ACTIONS.SHOW_PAGINATION, {
                query: route.query,
                numberOfPages: numberOfPages
            });
        }
    }],

    renderProducts: ['view', 'collection', function(view, collection) {
        return function() {
            view.remove();

            if ( collection.length() ) {

                collection.get().forEach(function(model) {
                    view.superAppend(model);
                });

            } else {

                view.render({
                    nothing_found: true
                });
            }
        }
    }],

    addToBasket: ['publisher', function(publisher) {
        return function(model) {
            return function (event) {
                publisher.publish(CONST.ACTIONS.ADD_TO_BASKET, model);
                event.stopPropagation();
            }
        }
    }],

    showProduct: ['publisher', function(publisher) {
        return function(model) {
            return function () {
                publisher.publish(CONST.ACTIONS.SWITCH_TO_SINGLE_PRODUCT, model._id);
            }
        }
    }],

    updateModule: ['updateCollection', 'queryCollection', 'renderProducts', function(updateCollection, queryCollection, renderProducts) {
        return function (route) {

            updateCollection().then(function() {

                queryCollection(route);
                renderProducts();

            });
        }
    }]
};