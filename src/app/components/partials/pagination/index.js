var Module = require('../../baseSuper/module.js'),
    paginationModule = new Module();

paginationModule
    .view(require('./view.js'))
    .model({})
    .handlers(require('./handlers.js'))
    .subscriptions([{
        event:  CONST.ACTIONS.SHOW_PAGINATION,
        handler: 'showPagination'
    }]);

module.exports = {
    init: paginationModule.init,
    remove: paginationModule.remove
};