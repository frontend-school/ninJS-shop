var fs = require('fs'),
    Handlebars = require('handlebars'),
    baseView = require('../../base/view.js'),
    unAuth = fs.readFileSync(__dirname + '/templates/default.hbs', {encoding: 'utf-8'}),
    logIn = fs.readFileSync(__dirname + '/templates/log-in-pop-up.hbs', {encoding: 'utf-8'}),
    loggedIn = fs.readFileSync(__dirname + '/templates/logged-in.hbs', {encoding: 'utf-8'});


module.exports = baseView.extend({

    parent: CONST.SELECTORS.POP_UP_PARENT,
    templates: {
        unAuth: Handlebars.compile(unAuth),
        logIn: Handlebars.compile(logIn),
        loggedIn: Handlebars.compile(loggedIn)
    }

});