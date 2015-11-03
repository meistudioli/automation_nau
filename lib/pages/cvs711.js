var cvs711;

cvs711 = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cvs711';

    this.selector = {
    	btnPickById: '#byID',
    	mapSection: '#frmMain',
    	btnStoreConfirm: '#sevenDataBtn',
    	btnStoreConfirmFinal: '#submit_butn',
    	storeIdInput: 'storeIDKey',
    	btnSearch: 'serach_name'
    };

    this.header = null;
    this.footer = null;
};
cvs711.prototype = Object.create(PageObject.prototype);

cvs711.prototype.pickStoreById = function(storeId) {
	var stand = this, orderConfirm = require(__base + constants.PO.orderConfirm);

	return this.one('btnPickById').click().then(
		function() {
			browser.wait(
				function() {
					return browser.executeScript(
						function() {
                            var iframe = arguments[0];
                            return (iframe.contentWindow.document.getElementById(arguments[1])) ? true : false;
						}
					, stand.one('mapSection').getWebElement(), stand.selector.storeIdInput).then(
						function(isReady) {
							return isReady;
						}
					);
				}
			, constants.TIMEOUT);
		}
	).then(
		function() {
			browser.executeScript(
				function() {
					var iframe = arguments[0], doc = iframe.contentWindow.document;
					doc.getElementById(arguments[2]).value = arguments[1];
					doc.getElementById(arguments[3]).click();
				}
			, stand.one('mapSection').getWebElement(), storeId, stand.selector.storeIdInput, stand.selector.btnSearch).then(
				function() {
					stand.waitUntilPresent('btnStoreConfirm');
				}
			).then(
				function() {
					stand.one('btnStoreConfirm').click().then(
						function() {
							stand.waitUntilPresent('btnStoreConfirmFinal');
						}
					);
				}
			).then(
				function() {
					stand.clickAndWaitUntilRedirect('btnStoreConfirmFinal');
				}
			);
		}
	).then(
		function() {
			return new orderConfirm();
		}
	)
};


module.exports = cvs711; 