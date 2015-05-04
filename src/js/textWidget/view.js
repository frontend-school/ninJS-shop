var source = fs.readFileSync(__dirname + '/src/js/textWidget/templates/textWidget.hbs', {encoding: 'utf-8'}),
    BaseView = require('../base/base-view.js');

function textWidgetView() {

    var view = new BaseView();

    view.template = Handlebars.compile(source);
    view.parent = CONST.SELECTORS.TEXT_WIDGET;

    return view;
}

module.exports = textWidgetView;