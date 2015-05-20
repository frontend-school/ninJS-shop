var signals = require('signals'),
    crossroads = require('crossroads'),
    hasher =  require('hasher'),
    PS = require('./pubsub.js');

var router,
    _activePage,
    query;

module.exports = router = PS.extend({

    init: function() {

        this.subscribe(CONST.ACTIONS.FILTER_CHANGED, switchHash);

        crossroads.addRoute('/{page}/:?query:', handleRouteChange);

        //set default hash
        if (hasher.getURL() === hasher.getBaseURL()) {
            hasher.setHash(CONST.ROUTES.DEFAULT);
        }

        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);

        hasher.init();
    }
});


function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
}


function switchHash(filter) {
    query = '?';

    for (var n in filter) {
        if (filter.hasOwnProperty(n) && filter[n]) {

                query += '&' + n;


        }
    }

    hasher.setHash(_activePage + query);
}


function handleRouteChange(page, query) {

    query = query || {};
    query.page = page;

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