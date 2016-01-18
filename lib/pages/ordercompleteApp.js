var ordercompleteApp;

ordercompleteApp = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'ordercompleteApp';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	orderId: '.order-id span'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
ordercompleteApp.prototype = Object.create(PageObject.prototype);

ordercompleteApp.prototype.getOrderId = function() {
    return this.one('orderId').getText().then(
        function(orderId) {
        	return orderId.replace(/^.* (\d*)$/, '$1');
        },
        function() {
            return '';
        }
    );
};

module.exports = ordercompleteApp;