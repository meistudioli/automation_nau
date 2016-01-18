var cartApp;

cartApp = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cartApp';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	shipTypeCod: 'label[for="ship-.spc"]',
    	btnSubmit: '.action-bar .btn-action'
    };
};
cartApp.prototype = Object.create(PageObject.prototype);

cartApp.prototype.pickShipTypeAs = function(type) {
	var stand = this;
	return this.clickAndWaitUntilRedirect('shipType'+common.capitalize(type.toLowerCase())).then(
		function() {
			return stand;
		}
	);
};

cartApp.prototype.goSubmit = function() {
	var orderconfirmApp;
	return this.clickAndWaitUntilRedirect('btnSubmit').then(
		function() {
			orderconfirmApp = require(__base + constants.PO.orderconfirmApp);
			return new orderconfirmApp();
		}
	);
};

module.exports = cartApp;