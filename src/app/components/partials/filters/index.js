var Module = require('../../baseSuper/module.js'),
    paginationModule = new Module();

paginationModule
    .view(require('./view.js'))
    .model({})
    .handlers(require('./handlers.js'))
    .subscriptions([{
            event:  CONST.ACTIONS.SHOW_FILTERS,
            handler: 'displayFilters'
        },
        {
            event:  CONST.ACTIONS.CHANGE_FILTERS,
            handler: 'changeFilters'
        }]);

module.exports = {
    init: paginationModule.init,
    remove: paginationModule.remove
};