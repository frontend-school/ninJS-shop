var Module = require('../../baseSuper/module.js'),
    paginationModule = new Module();

paginationModule
    .view(require('./view.js'))
    .collection(require('./collection.js'))
    .handlers(require('./handlers.js'))
    .dependencies({
        Q: require('q'),
        storage: require('../../../core/localStr.js')
    })
    .subscriptions([{
        event:  CONST.ACTIONS.SHOW_PRODUCTS,
        handler: 'updateModule'
    }]);

module.exports = {
    init: paginationModule.init,
    remove: paginationModule.remove
};