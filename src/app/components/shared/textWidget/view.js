var source = fs.readFileSync(__dirname + '/src/app/components/shared/textWidget/templates/textWidget.hbs', {encoding: 'utf-8'});
var baseView = require('../../base/view.js');


module.exports = baseView.extend({

    parent: CONST.SELECTORS.TEXT_WIDGET,

    template: Handlebars.compile(source)

});
