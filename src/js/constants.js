module.exports = {
    ROUTES: {
        DEFAULT: 'home'
    },
    SELECTORS: {
        BLOG_NEWS: '.about-blognews',
        PRODUCTS: '.products-container'
    },
    ACTIONS: {
        GET_NEWS: 'app/get-news',
        NEWS_RECEIVED: 'app/API:news-received',
        RENDER_NEWS_BLOCK: 'app/render-news-block',
        GET_PRODUCTS: 'app/get-products',
        GET_SLIDE: 'app/get-slide/:slideId',
        PRODUCTS_RECEIVED: 'app/API:products-received',
        RENDER_PRODUCTS: 'app/render-products-block'
    }
};