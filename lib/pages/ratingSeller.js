var ratingSeller;

ratingSeller = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'ratingSeller';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
    	dialog: '.msg-dialog-wrap.yui3-panel-focused',
    	good: '#good',
    	normal: '#normal',
    	bad: '#bad',
    	comment: 'textarea[name="comment"]',
    	confirm: '.submitwrap input[type="submit"]',
    	orderListSeller: 'body.order-management-list'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
ratingSeller.prototype = Object.create(PageObject.prototype);

ratingSeller.prototype.rateAs = function(type) {
	var stand = this, idx;
	idx = {
		'正評+1': 'good',
		'普通+0': 'normal',
		'負評-1': 'bad'
	};

	idx = (typeof idx[type] != -1) ? idx[type] : 'normal';
	return this.one(idx).click().then(
		function() {
			return stand;
		}
	);
};

ratingSeller.prototype.fillCommentWith = function(comment) {
	var stand = this;
	return this.one('comment').clear().sendKeys(comment).then(
		function() {
			return stand;
		}
	);
};

ratingSeller.prototype.confirm = function() {
	var flag = true, stand = this;
	return this.one('confirm').click().then(
		function() {
			stand.waitUntilPresent('dialog');
		}
	).then(
		function() {
			stand.waitUntilPresent('orderListSeller', 4000);
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

module.exports = ratingSeller;