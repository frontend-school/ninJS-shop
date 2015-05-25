var signals = require('signals'),
    crossroads = require('crossroads'),
    hasher =  require('hasher'),
    PS = require('./pubsub.js');

var router,
    _activePage,
    matchRoute;

module.exports = router = PS.extend({

    init: function() {

        this.subscribe(CONST.ACTIONS.FILTER_CHANGED, switchQuery);
        this.subscribe(CONST.ACTIONS.SWITCH_TO_SINGLE_PRODUCT, switchToSingle);

        crossroads.addRoute('/{page}/:?query:', handleRouteChange);

        //set default hash
        if (hasher.getURL() === hasher.getBaseURL()) {
            hasher.setHash(CONST.ROUTES.DEFAULT);
        }

        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);

        hasher.init();

        matchRoute = crossroads.addRoute(':?query:');
    }
});


function parseHash(newHash, oldHash){
    crossroads.parse(newHash);

}


function switchQuery(filter) {

    hasher.setHash(_activePage + matchRoute.interpolate({
        query: filter
    }));

}

function switchToSingle(id) {

    hasher.setHash('single' + matchRoute.interpolate({
            query: {
                id: id
            }
        }));

}


function handleRouteChange(page, query) {

    if (page !== _activePage) {

        router.publish(CONST.ACTIONS.SWITCH_PAGE, {
            page: page,
            query: query
        });

        _activePage = page;

    } else {

        router.publish(CONST.ACTIONS.NEW_QUERY, {
            page: page,
            query: query
        });
    }
}