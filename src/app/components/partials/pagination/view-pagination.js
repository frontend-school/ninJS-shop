var source = fs.readFileSync(__dirname + '/src/app/components/partials/pagination/templates/pagination.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.PAGINATION,

    template: Handlebars.compile(source)

});