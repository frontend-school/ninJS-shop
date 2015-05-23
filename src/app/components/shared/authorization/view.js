var baseView = require('../../base/view.js');
var unAuth = fs.readFileSync(__dirname + '/src/app/components/shared/authorization/templates/default.hbs', {encoding: 'utf-8'}),
    logIn = fs.readFileSync(__dirname + '/src/app/components/shared/authorization/templates/log-in-pop-up.hbs', {encoding: 'utf-8'}),
    loggedIn = fs.readFileSync(__dirname + '/src/app/components/shared/authorization/templates/logged-in.hbs', {encoding: 'utf-8'});


module.exports = baseView.extend({

    parent: CONST.SELECTORS.POP_UP_PARENT,
    templates: {
        unAuth: Handlebars.compile(unAuth),
        logIn: Handlebars.compile(logIn),
        loggedIn: Handlebars.compile(loggedIn)
    }

});