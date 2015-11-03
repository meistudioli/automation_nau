var cvsDeliverResult;

cvsDeliverResult = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cvsDeliverResult';

    this.selector = {
    	logisticId: '.shipment-list .order-num label:nth-child(3)'
    };
};
cvsDeliverResult.prototype = Object.create(PageObject.prototype);

cvsDeliverResult.prototype.getlogisticId = function() {
	var logisticId;
	return this.one('logisticId').getText().then(
		function(id) {
			logisticId = id;
		}
	).thenCatch(
		function(err) {
			//do nothing
		}
	).then(
		function() {
			return logisticId;
		}
	);
};

module.exports = cvsDeliverResult;