var oSearch;

oSearch = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'oSearch';

    this.selector = {
    	searchInput: '#ypsauspn input[name="p"]',
    	btnSearch: '#ypsauspn input[type=submit]',
    	searchResultAmount: '#ypsaucsfi .schrust strong',
    	viewModeimage: '.ypsmodule .model a.mimage',
    	viewModeboth: '.ypsmodule .model a.mboth',
    	buyNowmark: '.ver2 mark.buynow',
    	biddingmark: '.ver2 mark.bidding',
    	planforC2C: 'img[title="輕鬆付保障方案"]',
    	signforbuyNowset: 'img[title="有設直接購買價"]',
    	signfornewsubmit: 'img[title="24小時內新刊登"]',
    	'listtitle-promotetag': '#ypsausit thead tr :nth-child(5)',
    	thumbnailwithattributeheight: '.imgcm img[height]',
    	'thumbnailwithattributeheight(viewMode:image)': '.image img[height]',
    	buyNowpriceinfo: 'p.infoBuyNow',
    	itemSellInfo: '.info span'
    };

    //components
    this.header = null;
    this.footer = null;
};
oSearch.prototype = Object.create(PageObject.prototype);

oSearch.prototype.getSearchResultAmount = function() {
	return this.all('searchResultAmount').first().getText().then(
		function(amount) {
			return Number(amount.trim());
		},
		function() {
			return 0;
		}
	);
};

oSearch.prototype.pickViewMode = function(type) {
	var stand = this, type = 'viewMode' + ((['image', 'both'].indexOf(type) == -1) ? 'both' : type);

	return this.one(type).then(
		function(e) {
			stand.clickAndWaitUntilRedirect(e);
		},
		function() {
			//err catch
		}
	).then(
		function() {
			return stand;
		}
	);
};

module.exports = oSearch;