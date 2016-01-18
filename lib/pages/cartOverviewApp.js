var cartOverviewApp;

cartOverviewApp = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'cartOverviewApp';
    this.data.url = constants.URL_MAP.cartOverviewApp;

    this.selector = {
    	title: 'h3',
    	lists: '#cartlist-overview ul',
    	bargainList: '.cart-list.bargain'
    };

};
cartOverviewApp.prototype = Object.create(PageObject.prototype);

cartOverviewApp.prototype.getBargainSet = function() {
	var bargain;
	return this.all('title').each(
		function(unit, idx) {
			unit.getInnerHtml().then(
				function(html) {
					if (html.trim() == '議價待結帳') bargain = idx;
				}
			);
		}
	).thenCatch(
		function(err) {
			//err occur
		}
	).then(
		function() {
			return bargain;
		}
	);
};

cartOverviewApp.prototype.isBargainExist = function() {
	var flag;

	return this.getBargainSet().then(
		function(bargain) {
			flag = (typeof bargain == 'undefined') ? false : true;
		}
	).then(
		function() {
			return flag;
		}
	);
};

cartOverviewApp.prototype.goBargainCheckout = function() {
	var stand = this, set, PO;
	return this.getBargainSet().then(
		function(sid) {
			set = sid;
		}
	).then(
		function() {
			stand.all('lists').get(set).$$('a').get(0).then(
				function(unit) {
					stand.clickAndWaitUntilRedirect(unit);
				}
			)
		}
	).then(
		function() {
			stand.one('bargainList').isPresent().then(
				function(flag) {
					if (!flag) return;
					PO = require(__base + constants.PO.cartBargainListApp);
					PO = new PO();
					PO.clickAndWaitUntilRedirect('btnCheckout');
				}
			)
		}
	).then(
		function() {
			PO = require(__base + constants.PO.cartApp);
			return new PO; 
		}
	);
};



module.exports = cartOverviewApp;