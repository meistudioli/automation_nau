var codDeliverResult;

codDeliverResult = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'codDeliverResult';

    this.selector = {
    	body: 'body',
    	logisticId: '.shipment-result-tip p:nth-child(3)',
    	resulttitle: '.shipment-result h1',
    	shipmentresultnote: '.shipment-result-note li',
    	shipmentresultdescription: '.shipment-tip p',
    	orderdetailshipmentinfo: '.order-details tbody .funcs',
    	btnBacktolist: '.shipment-result .button-group .button-white',
    	iPostLink: '.order-details tbody .funcs>a',
    	triggerForOrderDetail: '.details-toggle-btn',
    	triggerForOrderDetailOn: 'button[data-isshow="true"]',
    	btnPrint: '.shipment-result .button-group .button-main',
    };

};
codDeliverResult.prototype = Object.create(PageObject.prototype);

codDeliverResult.prototype.getlogisticId = function() {
	return this.one('logisticId').getText().then(
		function(logisticId) {
			return logisticId.replace(/^.*:\s*(\d+)$/, '$1');
		}
	);
};

codDeliverResult.prototype.expandOrderDetail = function() {
	var stand = this;
	return this.one('triggerForOrderDetail').click().then(
		function() {
			stand.waitUntilPresent('triggerForOrderDetailOn');
		}
	);
};

module.exports = codDeliverResult;