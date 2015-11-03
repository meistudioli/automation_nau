var orderDetailSeller;

orderDetailSeller = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'orderDetailSeller';

    this.selector = {
    	btnDelivery: '.order-status>ul li:first-child a.button',
    	orderOperates: '.order-status>ul li:nth-child(2) .box:nth-child(2) .pairs a'
    };

};
orderDetailSeller.prototype = Object.create(PageObject.prototype);

orderDetailSeller.prototype.getOperateAs = function(operate) {
	var e;
	return this.all('orderOperates').each(
		function(unit) {
			unit.getText().then(
				function(txt) {
					if (txt.trim() == operate) {
						e = unit;
					}
				}
			);
		}
	).then(
		function() {
			return e;
		}
	);
};

module.exports = orderDetailSeller;