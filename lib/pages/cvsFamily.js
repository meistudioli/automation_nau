var cvsFamily;

cvsFamily = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cvsFamily';

    this.selector = {
        storeIdInput: 'input[name="srv_no"]',
        btnSearch: 'form[name="cvsform"] input[type="button"]',
        mapSection: 'iframe[name="new_map"]'
    };

    this.header = null;
    this.footer = null;
};
cvsFamily.prototype = Object.create(PageObject.prototype);

cvsFamily.prototype.pickStoreById = function(storeId) {
	var stand = this, orderConfirm = require(__base + constants.PO.orderConfirm);

	return this.one('storeIdInput').clear().sendKeys(storeId).then(
		function() {
			return stand.one('btnSearch').click().then(
				function() {
					browser.wait(
						function() {
		                    return browser.executeScript(
		                        function() {
		                            var iframe = arguments[0];
		                            return (iframe.contentWindow.document.getElementById('submit_img')) ? true : false;
		                        }
		                    , stand.one('mapSection').getWebElement()).then(
		                    	function(isReady) {
		                    		return isReady;
		                    	}
		                   	);
						}
					, 5000);
				}
			).then(
				function() {
			        return  browser.executeScript(
			            function() {
			                location.hash = 'protractor-mark';
			            }
			        ).then(
			            function() {
			                return browser.getCurrentUrl().then(
			                    function(url) {
									browser.executeScript(
										function() {
											var iframe = arguments[0];
											iframe.contentWindow.document.getElementById('submit_img').click();
										}
									, stand.one('mapSection').getWebElement()).then(
										function() {
											stand.waitUntilUrlChange(url);
										}
									).then(
									    function() {
									        stand.waitUntilPresent('body', constants.TIMEOUT_SHORT);
									    }
									);
			                    }
			                ).then(
			                	function() {
			                		return new orderConfirm();
			                	}
			                );
			            }
			        );
				}
			);
		}
	);
};


module.exports = cvsFamily; 