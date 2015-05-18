module.exports = {
    ROUTES: {
        DEFAULT: 'home'
    },
    SELECTORS: {
        MAIN: '.main',
        ABOUT: '.about',
        PRODUCTS: '.products-container',
        PRODUCTS_HEADER: '.products-header',
        ADD_TO_BASKET: '.action-buttons__item_buy',
        BASKET: '.basket',
        BASKET_CONTAINER: '.basket-container',
        BASKET_ITEM: '.basket-container-item',
        BASKET_ITEM_QUANTITY: '.basket-container-item-details__quantity',
        REMOVE_FROM_BASKET: '.basket-container-item__remove',
        BASKET_COUNTER: '.navigation__counter_in-cart',
        BASKET_TOGGLE: '.basket-toggle',
        FILTER_CHECKBOX: '.filters__checkbox',
        TEXT_WIDGET: '.footer-widget-panel-widget-text'
    },
    ACTIONS: {
        ROUTE_CHANGED: 'app/router:route-changed',
        SWITCH_PAGE: 'app/router:switch-page.modules',
        NEW_QUERY: 'app/router:new-query',

        SWITCH_LAYOUT: 'app/layout/switch-page.components-layout',

        GET_PRODUCTS: 'app/get-products',
        PRODUCTS_RECEIVED: 'app/API:products-received',
        SHOW_PRODUCTS: 'app/layout/run-products',
        ADD_TO_BASKET: 'app/products:add-to-basket',

        SHOW_FILTERS: 'app/show_filters',
        FILTER_CHANGED: 'app/filters:filter-changed',

        SHOW_NEWS: 'app/show-news',
        GET_NEWS: 'app/about:get-news',
        NEWS_RECEIVED: 'app/API:news-received',

        GET_TEXT_WIDGET: 'app/footer:get-text-widget',
        TEXT_WIDGET_RECEIVED: 'app/API:text-widget-received',
        SHOW_TEXT_WIDGET: 'app/show-text-widget'
    }
};