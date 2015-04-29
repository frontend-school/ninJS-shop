module.exports = {
    ROUTES: {
        DEFAULT: 'home',
        PRODUCTS: 'products'
    },
    SELECTORS: {
        MAIN: '.main',
        BLOG_NEWS: '.about-blognews',
        PRODUCTS: '.products-container'
    },
    ACTIONS: {
        GET_NEWS: 'app/get-news',
        NEWS_RECEIVED: 'app/API:news-received',
        RENDER_NEWS_BLOCK: 'app/render-news-block',
        GET_PRODUCTS: 'app/get-products',
        PRODUCTS_RECEIVED: 'app/API:products-received',
        RENDER_PRODUCTS: 'app/render-products-main',
        SWITCH_TO_HOME: 'app/router:switch-to-home',
        RENDER_HOME_LAYOUT: 'app/render-home-layout',
        HOME_LAYOUT_RENDERED: 'app/main_block/home-layout-rendered',
        SWITCH_TO_PRODUCTS: 'app/router:switch-to-products',
        RENDER_PRODUCTS_LAYOUT: 'app/render-products-layout',
        PRODUCTS_LAYOUT_RENDERED: 'app/main_block:products-layout-rendered',
        SAVE_PRODUCTS_QUERY: 'app/query-products'
    },
    QUERIES: {

    }
};