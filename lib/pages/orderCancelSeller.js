var orderCancelSeller;

orderCancelSeller = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'orderCancelSeller';

    this.selector = {
    	cacelReason0: 'input[value="buyer_notify"]',
    	cacelReason1: 'input[value="stock_out"]',
    	cacelReason2: 'input[value="other"]',
    	cacelReasonOther: 'input[value="other"]',
    	taReason: 'textarea[name="reasons"]',
    	confirmCancel: '.remind input[type="submit"]',
    	dialog: '.msg-dialog-wrap.yui3-panel-focused',
    	orderDetailSeller: 'body.order-management-detail'
    };
};
orderCancelSeller.prototype = Object.create(PageObject.prototype);

orderCancelSeller.prototype.pickCancelReasonWith = function(reason) {
	var key, flag = true, stand = this;
	key = [
		'買家放棄購買',
		'商品缺貨'
	];
	key = key.indexOf(reason);
	key = 'cacelReason' + ((key == -1) ? 'Other' : key);

	return this.one(key).click().then(
		function() {
			if (key == 'cacelReasonOther') {
				stand.one('taReason').clear().sendKeys(reason);
			}//end if
		}
	).thenCatch(
		function() {
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

orderCancelSeller.prototype.pickCancelReasonAs = function(reason) {
	var key, flag = false;
	key = [
		'買家放棄購買',
		'商品缺貨',
		'其他'
	];

	key = 'cacelReason' + key.indexOf(reason);
	return this.one(key).then(
		function(e) {
			e.click().then(
				function() {
					flag = true;
				}
			);
		}
	).thenCatch(
		function() {
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

orderCancelSeller.prototype.filledReasonWith = function(reason) {
	var stand = this;
	return this.one('taReason').clear().sendKeys(reason).then(
		function() {
			return stand;
		}
	);
};

orderCancelSeller.prototype.confirmCancel = function() {
	var flag = true, stand = this;
	return this.one('confirmCancel').click().then(
		function() {
			stand.waitUntilPresent('dialog');
		}
	).then(
		function() {
			stand.waitUntilPresent('orderDetailSeller', 5000);
		}
	).thenCatch(
		function() {
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

module.exports = orderCancelSeller;