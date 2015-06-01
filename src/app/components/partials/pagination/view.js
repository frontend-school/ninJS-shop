var fs = require('fs'),
    Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/pagination.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.PAGINATION,

    template: Handlebars.compile(source)

});