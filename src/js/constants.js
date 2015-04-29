module.exports = {
    ROUTES: {
        DEFAULT: 'home'
    },
    SELECTORS: {
        BLOG_NEWS: '.about-blognews'
    },
    ACTIONS: {
        GET_NEWS: 'app/get-news',
        NEWS_RECEIVED: 'app/API:news-received',
        RENDER_NEWS_BLOCK: 'app/render-news-block',
        PRODUCTS_RECEIVED: 'app/API:products-received'
    }
};