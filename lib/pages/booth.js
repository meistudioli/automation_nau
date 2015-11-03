var booth;

booth = function(ecid) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'booth';
    this.data.url = constants.URL_MAP.booth + ecid;

    this.selector = {
    	searchInput: '#yaubhss input[name="p"],#yaubhns input[name="p"]',
    	btnSearch: '#yaubhss input[type=submit],#yaubhns input[type=submit]',
    	filters: '#yaubhss input[type=checkbox]'
    };
};
booth.prototype = Object.create(PageObject.prototype);

booth.prototype.pickFilterAs = function(key) {
	var stand = this, idx;
	// idx = [
	// 	'長刊期商品',
	// 	'沒有設定拍賣底價',
	// 	'有直接購買價'
	// ];
	idx = [
		'未設拍賣底價的競標品',
		'有直接購買價'
	];
	idx = idx.indexOf(key.trim());
    if (idx == -1) idx = 0;

    return this.all('filters').get(idx).click().then(
    	function() {
    		return stand;
    	}
    );
};

booth.prototype.goSearch = function(keyword) {
	var stand = this, boothSearch = require(__base + constants.PO.boothSearch);
	return this.one('searchInput').clear().sendKeys(keyword).then(
		function() {
			stand.clickAndWaitUntilRedirect('btnSearch');
		}
	).then(
		function() {
			$('body').getAttribute('className').then(
				function(cn) {
					if (/auction_srp_/.test(cn)) boothSearch = require(__base + constants.PO.oSearch);
				}
			);
		}
	).then(
		function() {
			return new boothSearch();
		}
	);
};

module.exports = booth;