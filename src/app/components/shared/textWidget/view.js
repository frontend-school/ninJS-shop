var fs = require('fs'),
    Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/textWidget.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.TEXT_WIDGET,

    template: Handlebars.compile(source)

});