var fs = require('fs');
var Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/pagination.hbs', {encoding: 'utf-8'});


module.exports = {

    parent: CONST.SELECTORS.PAGINATION,

    template: Handlebars.compile(source),

    listeners: [
        {
            target: CONST.SELECTORS.PAGINATION_PAGE,
            event: 'click',
            handler: 'switchPageNumber'
        }
    ]

};