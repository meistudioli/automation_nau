var orderConfirm;

orderConfirm = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'orderConfirm';

    this.selector = {
    	btnSelectFamilyStore: '.checkout-button-select-sfc',
        btnSelect711Store: '.checkout-button-select-sfc',
    	btnCheckout: '#btn-checkout-confirm',
        payTypeFamiPort: '#paytype_id_C2C_FAMI_PORT_PAY_TYPE',
        receiverCity: '#checkout-receiver-city-select',
        receiverDistrict: '#checkout-receiver-district-select',
        receiverZipcode: '#checkout-receiver-zipcode',
        receiverAddress: '#checkout-receiver-address'
    };
};
orderConfirm.prototype = Object.create(PageObject.prototype);

orderConfirm.prototype.selectFamilyStore = function() {
	var stand = this, cvsFamily = require(__base + constants.PO.cvsFamily);

	return this.clickAndWaitUntilRedirect('btnSelectFamilyStore').then(
		function() {
			return new cvsFamily();
		}
	)
};

orderConfirm.prototype.select711Store = function() {
    var stand = this, cvs711 = require(__base + constants.PO.cvs711);

    return this.clickAndWaitUntilRedirect('btnSelect711Store').then(
        function() {
            return new cvs711();
        }
    );
};

orderConfirm.prototype.pickPayType = function(payType) {
    var stand = this;

    return this.one('payType'+payType).click().then(
        function() {
            //do nothing
        }
    ).thenCatch(
        function(err) {
            //do nothing
        }
    ).then(
        function() {
            return stand;
        }
    );
};

orderConfirm.prototype.goCheckout = function() {
	var orderComplete = require(__base + constants.PO.orderComplete);

    return this.clickAndWaitUntilRedirect('btnCheckout').then(
        function() {
            return new orderComplete();
        }
    );
};

module.exports = orderConfirm;