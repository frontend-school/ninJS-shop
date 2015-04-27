var source = fs.readFileSync(__dirname + '/src/js/blognews/templates/blognews.hbs', {encoding: 'utf-8'}),
    View = require('../base/base-view.js');

function BlogNewsView() {

    var view = View();

    view.template = Handlebars.compile(source);
    view.parent = CONST.SELECTORS.BLOG_NEWS;

    return view;
}

module.exports = BlogNewsView;