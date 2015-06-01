var fs = require('fs'),
    Handlebars = require('handlebars'),
    source = fs.readFileSync(__dirname + '/templates/about.hbs', {encoding: 'utf-8'}),
    baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.ABOUT,

    template: Handlebars.compile(source)

});