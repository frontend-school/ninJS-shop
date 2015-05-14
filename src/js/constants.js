module.exports = {
    ROUTES: {
        DEFAULT: 'home'
    },
    SELECTORS: {
        BLOG_NEWS: '.about-block_big',
        PRODUCTS: '.products-container',
        TEXT_WIDGET: '.footer-widget-panel-widget-text'
    },
    ACTIONS: {
        GET_NEWS: 'app/get-news',
        NEWS_RECEIVED: 'app/API:news-received',
        RENDER_NEWS_BLOCK: 'app/render-news-block',
        GET_PRODUCTS: 'app/get-products',
        PRODUCTS_RECEIVED: 'app/API:products-received',
        RENDER_PRODUCTS: 'app/render-products-block',
        GET_PRODUCT: 'app/get-product',
        PRODUCT_RECEIVED: 'app/API:product-received',
        RENDER_PRODUCT: 'app/render-product-block',
        GET_TEXT_WIDGET: 'app/get-text-widget',
        TEXT_WIDGET_RECEIVED: 'app/API:text-widget-received',
        RENDER_TEXT_WIDGET: 'app/render-text-widget',
        GET_SLIDE: 'app/get-slide/:slideId'
    }
};