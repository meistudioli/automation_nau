var orderListBuyer;

orderListBuyer = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'orderListBuyer';
    this.data.url = constants.URL_MAP.order_list_buyer;

    this.selector = {
    	orderOperates: '.order-list-wrap .order-wrap:nth-child(1) .order-info .order-operation a'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
orderListBuyer.prototype = Object.create(PageObject.prototype);

orderListBuyer.prototype.getOperateAs = function(operate) {
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

module.exports = orderListBuyer;