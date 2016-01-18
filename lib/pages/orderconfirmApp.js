var orderconfirmApp;

orderconfirmApp = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'orderconfirmApp';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	btnSubmit: '#btn-checkout-confirm'
    };
};
orderconfirmApp.prototype = Object.create(PageObject.prototype);

orderconfirmApp.prototype.goSubmit = function() {
	var ordercompleteApp;
	return this.clickAndWaitUntilRedirect('btnSubmit').then(
		function() {
			ordercompleteApp = require(__base + constants.PO.ordercompleteApp);
			return new ordercompleteApp();
		}
	);
};

module.exports = orderconfirmApp;