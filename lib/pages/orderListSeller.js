var orderListSeller;

orderListSeller = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'orderListSeller';
    this.data.url = constants.URL_MAP.order_list;

    this.selector = {
    	searchInput: '#context-search-box',
    	btnSearch: '.seller-management-search input[type="submit"]',
    	filterPayType: '.seller-management-filter .item-filter>li:first-child a',
    	searchResultAmount: '.data-result-info>span:first-child em:nth-last-of-type(1)',
    	shiptType: '.first-of-type .ship-type',
    	shipTypeSubmenu: '.first-of-type .ship-type [role="menu"]',
    	timeRangeType: '.first-of-type .time-range',
    	timeRangeTypeSubmenu: '.first-of-type .time-range [role="menu"]',
    	the1stitemdeliever: '.order-wrap .order-list-detail .go-shipping',
    	the1stitemprintbutton: '.order-wrap .order-list-detail a[title="列印出貨單"]',
    	orderOperates: '.order-manager-list>div:nth-of-type(2) .order-info .order-operation a',
    	firstOrderID: '.order-manager-list>div:nth-of-type(2) .order-info .order-id a',
    	the1stitemdprintbutton: '.order-wrap .order-list-detail .go-shipping',
    	vieworderdetail: '.order-manager-list>div:nth-of-type(2) .order-info .order-id a',
    	shipStatuswaitforship: '.order-status-wrap h3 span:nth-child(4)',
    	batchOperateShip: '.operate-display span:nth-child(1) a',
    	batchOperateShipOption: '.operate-display #icon-order-outship a',
    	checkbox4Order: '.order-wrap .sub-check-box',
    	checkAll: 'input.check-all',
    	'toolbar-delivery': '.operate-display span:nth-child(1) a'
    };
};
orderListSeller.prototype = Object.create(PageObject.prototype);

orderListSeller.prototype.getUrlPattern = function(patternId, link) {
    var pattern;
    switch(patternId) {
        case 'toolbar-delivery':
            pattern = /.*partner\/order\/cod_multi_deliver.*/;
            break;
        default:
            pattern = (typeof link == 'undefined') ? /^fail$/ : new RegExp(common.getLinkReg(link));
    }//end switch
    return pattern;
};

orderListSeller.prototype.filterOrderByPayType = function(type) {
	var stand = this, type = (['all', 'normal', 'family', 'seven', 'postOffice'].indexOf(type) == -1) ? 'all' : type, e;
	type = new RegExp('paytype=' + type);
	return this.all('filterPayType').each(
		function(unit) {
			unit.getAttribute('href').then(
				function(href) {
					if (type.test(href)) e = unit;
				}
			);
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(e);
		}
	).then(
		function() {
			return stand;
		}
	);
};

orderListSeller.prototype.getSearchResultAmount = function() {
	return this.all('searchResultAmount').last().getText().then(
		function(amount) {
			return Number(amount.trim().replace(/,/g, ''));
		},
		function() {
			return 0;
		}
	);
};

orderListSeller.prototype.filterOrderByShipType = function(type) {
	var stand = this, idx;
	idx = [
		'全部出貨狀態',
		'尚未出貨',
		'出貨檔上傳成功，待寄貨',
		'已出貨',
		'部分商品已出貨',
		'買家商品配送中',
		'買家商品重新配送中',
		'買家商品配送失敗',
		'買家商品已到店',
		'買家已取貨',
		'已退貨',
		'賣家商品退貨中',
		'商品退貨已到物流',
		'商品退貨已到店',
		'申請領回',
		'賣家已取退貨',
		'商品已拋棄(賣家選擇拋棄)',
		'商品已拋棄(逾期未領自動拋棄)',
		'遺失賠償',
		'逾期未寄貨已取消',
		'物流驗收失敗'
	];
	idx = idx.indexOf(type.trim());

	return this.one('shiptType').$('a').click().then(
		function() {
			stand.waitUntilPresent('shipTypeSubmenu');
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('shipTypeSubmenu').$$('li').get(idx).$('a'));
		}
	).then(
		function() {
			return stand;
		}
	);
};

orderListSeller.prototype.filterOrderByTimeRange = function(type) {
	var stand = this, idx;
	idx = [
		'今天',
		'昨天',
		'最近1週',
		'最近1個月',
		'最近3個月',
		'最近6個月'
	];
	idx = idx.indexOf(type.trim());

	return this.one('timeRangeType').$('a').click().then(
		function() {
			stand.waitUntilPresent('timeRangeTypeSubmenu');
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('timeRangeTypeSubmenu').$$('li').get(idx).$('a'));
		}
	).then(
		function() {
			return stand;
		}
	);
};

orderListSeller.prototype.goSearch = function(keyword) {
	var stand = this;
	return this.one('searchInput').clear().sendKeys(keyword).then(
		function() {
			stand.clickAndWaitUntilRedirect('btnSearch');
		}
	).then(
		function() {
			return stand;
		}
	);
};

orderListSeller.prototype.getOperateAs = function(operate) {
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

orderListSeller.prototype.get1stOrderId = function() {
	var orderID;
	return this.one('firstOrderID').getInnerHtml().then(
		function(html) {
			orderID = html.replace(/^(\d+).*/, '$1');
		},
		function() {
			orderID = '';
		}
	).then(
		function() {
			return orderID;
		}
	);
};

orderListSeller.prototype.getBatchOperateShipTxts = function() {
	var ship = [];

	return this.all('batchOperateShipOption').each(
		function(unit) {
			unit.getInnerHtml().then(
				function(text) {
					ship.push(text.trim());
				}
			);
		}
	).then(
		function() {
			return ship;
		}
	);
};

orderListSeller.prototype.pickAllOrders = function() {
	return this.one('checkAll').click();
};

module.exports = orderListSeller;