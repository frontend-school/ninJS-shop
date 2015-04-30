var source = fs.readFileSync(__dirname + '/src/js/blognews/templates/blognews.hbs', {encoding: 'utf-8'}),
    BaseView = require('../views/base.js');

function BlogNewsView() {

    var view = new BaseView();

    view.template = Handlebars.compile(source);
    view.parent = CONST.SELECTORS.BLOG_NEWS;

    return view;
}

module.exports = BlogNewsView;