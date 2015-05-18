var basketController,
    collection = require('./collection.js'),
    view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = basketController = baseController.extend({

    init: function() {

        $(CONST.SELECTORS.BASKET_TOGGLE).on('click', toggleBasket);

        this.subscribe(CONST.ACTIONS.ADD_TO_BASKET, addToBasket);

    }

});


function addToBasket(product) {
    var basketItem = collection.getById(product._id);

    if (!basketItem) {

        addNewItem(product);

    } else {

        basketItem.view.find(CONST.SELECTORS.BASKET_ITEM_QUANTITY).val(++basketItem.quantity);

    }
}


function addNewItem(product) {
    var itemView;

    product.quantity = 1;
    $(view.parent).append(view.template(product));

    itemView = $(CONST.SELECTORS.BASKET).find(CONST.SELECTORS.BASKET_ITEM).last();
    addListener(itemView, product);

    product.view = itemView;
    collection.add(product);

    updateCounter();
}


function addListener(itemView, product) {

    itemView.find(CONST.SELECTORS.REMOVE_FROM_BASKET).on('click', function() {

        itemView.remove();
        collection.remove(product._id);

        updateCounter();
        if (collection.length() === 0) {
            toggleBasket();
        }

    });

}


function updateCounter() {
    $(CONST.SELECTORS.BASKET_COUNTER).html( collection.length() );
}


function toggleBasket() {
    $(CONST.SELECTORS.BASKET).toggleClass('hide');
}