var orderComplete;

orderComplete = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'orderComplete';
    
    this.selector = {
        orderId: '.module-order-detail .order-id'
    };
};
orderComplete.prototype = Object.create(PageObject.prototype);

orderComplete.prototype.getOrderId = function() {
    return this.one('orderId').getText().then(
        function(orderId) {
        	return orderId.replace(/^.* (\d*)$/, '$1');
        },
        function() {
            return '';
        }
    );
};

module.exports = orderComplete; 