var cvsDeliver;

cvsDeliver = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cvsDeliver';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	btnSubmit: '.shipment-form-cvs .button-main[name="shipment_confirm"]'
    };
};
cvsDeliver.prototype = Object.create(PageObject.prototype);

cvsDeliver.prototype.confirmDelivery = function() {
    var stand = this, PO = require(__base + constants.PO.cvsDeliverResult);

    return this.clickAndWaitUntilRedirect('btnSubmit').then(
    	function() {
    		return new PO();
    	}
    );
};

module.exports = cvsDeliver;