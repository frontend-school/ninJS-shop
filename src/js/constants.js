module.exports = {
    ROUTES: {
        DEFAULT: 'home'
    },
    SELECTORS: {
        MAIN: '.main',
        BLOG_NEWS: '.about-blognews',
        PRODUCTS: '.products-container',
        PRODUCTS_HEADER: '.products-header',
        ADD_TO_BASKET: '.action-buttons__item_buy',
        BASKET: '.basket',
        BASKET_CONTAINER: '.basket-container',
        BASKET_ITEM: '.basket-container-item',
        BASKET_ITEM_QUANTITY: '.basket-container-item-details__quantity',
        REMOVE_FROM_BASKET: '.basket-container-item__remove',
        BASKET_COUNTER: '.navigation__counter_green',
        BASKET_TOGGLE: '.basket-toggle',
        FILTER_CHECKBOX: '.filters__checkbox'
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
        SAVE_PRODUCTS_QUERY: 'app/query-products',
        GET_HOME_DATA: 'app/get-home-data',
        HOME_DATA_RECEIVED: 'app/API:home-data-received',
        RENDER_HOME_PAGE: 'app/render-home-page',
        RENDER_PRODUCTS_PAGE: 'app/render-products-page',
        GET_PRODUCTS_DATA: 'app/get-products-data',

        SHOW_PRODUCTS: 'app/layout/run-products',
        PRODUCTS_UPDATED: 'app/products_module:updated',
        ROUTE: 'hash changed',
        RUN_FILTERS: 'add filters',
        RELOAD_BLOCKS: 'render partials',

        MAIN_VIEW_CHANGED: 'app/router:main-view-changed',
        NEW_QUERY: 'app/router:new-query',
        ROUTE_CHANGED: 'app/router:route-changed',
        SWITCH_PAGE: 'app/router:switch-page',
        SWITCH_LAYOUT: 'app/layout/switch-main-layout',
        SHOW_FILTERS: 'app/show_filters',
        ADD_TO_BASKET: 'app/products:add-to-basket',

        FILTER_CHANGED: 'app/filters:filter-changed'

    },
    QUERIES: {

    }
};