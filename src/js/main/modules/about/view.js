var source = fs.readFileSync(__dirname + '/src/js/main/modules/about/templates/about.hbs', {encoding: 'utf-8'});
    var baseView = require('./../../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.ABOUT,

    template: Handlebars.compile(source)

});