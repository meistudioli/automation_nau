var cartBargainListApp;

cartBargainListApp = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cartBargainListApp';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	btnCheckout: '.item.bargain-wrap .funcs a'
    };
};
cartBargainListApp.prototype = Object.create(PageObject.prototype);


module.exports = cartBargainListApp;