var boothSearch;

boothSearch = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'boothSearch';

    this.selector = {
    	searchInput: '#yaubhss input[name="p"]',
    	searchInputs: '#yaubhss input',
    	btnSearch: '#yaubhss input[type=submit]',
    	filters: '#yaubhss input[type=checkbox]',
    	pagenum: '#ypsaucsmi .near input[name="pagenum"]',
    	submit4Pagenum: '#ypsaucsmi .near input[type=submit]',
    	searchResultAmount: '#ypsaucsfi .schrust strong',
    	viewModeimage: '.ypsmodule .model a.mimage',
    	viewModeboth: '.ypsmodule .model a.mboth',
    	buyNowmark: '.ver2 mark.buynow',
    	biddingmark: '.ver2 mark.bidding',
    	planforC2C: 'img[title="輕鬆付保障方案"]',
    	signforbuyNowset: 'img[title="有設直接購買價"]',
    	signfornewsubmit: 'img[title="24小時內新刊登"]',
    	signforauctionstore: 'img[title="此賣家有加入拍賣商店"]',
    	'listtitle-promotetag': '#ypsausit thead tr :nth-child(5)',
    	thumbnailwithattributeheight: '.imgcm img[height]',
    	'thumbnailwithattributeheight(viewMode:image)': '.image img[height]',
    	buyNowpriceinfo: 'p.infoBuyNow',
    	biddinginfo: '.info span,#ypsausit .dotunderline>td:nth-child(2) p',
    	"biddinginfo(imagetext)": '.info span,#ypsausit .dotunderline>td:nth-child(2) p',
    	"buyNowinfo(nonesaleamount)": '.info span,#ypsausit .dotunderline>td:nth-child(2) p',
    	"buyNowinfo(withsaleamount)": '.info span,#ypsausit .dotunderline>td:nth-child(2) p',
    	buyNowinfo: '.info span,#ypsausit .dotunderline>td:nth-child(2) p',
    	itemSellInfo: '.info span',
    	itemtitle: '#ypsausi .title a,#ypsausit .title a',
    	itemthumbnail: '#ypsausi .image img,#ypsausit .imgcm img',
    	category: '#yaubhsc li',
    	trigger4SearchPreference: '#ypsaucsfi .pref a',
    	searchPreference: '#yaucpref',
    	submit4searchPreference: '#yaucpref input[type="submit"]',
    	RSS: '.rss a',
    	sortings: '#ypsausit .sort a,#ypsausi .sort a',
    	currentSorting: '#ypsausit .sort a[class~="asce"],#ypsausit .sort a[class~="desc"],#ypsausi .sort a[class~="asce"],#ypsausi .sort a[class~="desc"]',
    	// itemPrice: '.info span em,.dotunderline td:nth-child(2) strong',
    	itemPrice: '.info span em,.dotunderline td:nth-child(2) p em',
    	onshelfTime: '#ypsausit tr.dotunderline td:last-child',
    	'hassold/bidamount': '.info span a',
    	'right-toppaginationinfo': '#ypsaucsfi .page',
    	'right-toppaginationlink': '#ypsaucsfi .page a',
    	'left-bottompaginationinfo': '#ypsaucsmi .near',
    	'left-bottompaginationlinks': '#ypsaucsmi .info',
    	'left-bottompaginationlink': '#ypsaucsmi .info a',
    	noresultsection: '#yausnoresult',
    	itemsmightmatchlink: '#yaumatchsch .bd a',
    	searchresultinfomation: '#ypsaucsfi .schrust',
    	itemsellerinfo: '#ypsausit .dotunderline>td a',
    	itemlesstime: '#ypsausit .dotunderline>td:nth-child(5)',
    	itemsellerrating: '#ypsausit .dotunderline>td p:nth-child(2)',
    	itemsoldorbidamount: '#ypsausit .dotunderline>td:nth-child(3)',
    	itemlocation: '#ypsausit .dotunderline>td p:nth-child(3)',
    	iconcash: 'img[title="賣家接受Yahoo!奇摩輕鬆付為付款方式"]',
    	iconcreditcard: 'img[title="輕鬆付可刷卡一次付清"]',
    	iconcreditcardinstallment: 'img[title="輕鬆付可刷卡分期0利率"]',
    	iconfamily: 'img[title="賣家接受Yahoo!奇摩輕鬆付全家取貨付款為付款方式"]',
    	icon711: 'img[title="賣家接受Yahoo!奇摩輕鬆付7-ELEVEN取貨付款為付款方式"]',
    	columes: '#ypsausit .bd>table thead th,#ypsausit .bd>table thead td',
    	nonebiddinginfo: '#ypsausit .dotunderline>td:nth-child(3) a',
    	biddingitemcomewithbuyNowprice: '#ypsausit .dotunderline>td:nth-child(2) p:nth-child(2) em',
    	biddingitemcomewithoutbuyNowprice: '#ypsausit .dotunderline>td:nth-child(2) p:nth-child(2)',
    	shipfee: '#ypsausit .dotunderline>td:nth-child(2) p:nth-child(3)'
    };
};
boothSearch.prototype = Object.create(PageObject.prototype);

boothSearch.prototype.getUrlPattern = function(patternId, link) {
    var pattern;
    switch(patternId) {
    	case 'icon711':
    		pattern = new RegExp('https:\/\/tw\.promo\.yahoo\.com\/.*\/7eleven\/');
    		break;
    	case 'iconfamily':
    		pattern = new RegExp('https:\/\/tw\.promo\.yahoo\.com\/.*\/familymart\/');
    		break;
    	case 'itemsellerinfo':
    		pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/tw\/user\/.*');
    		break;
    	case 'itemsmightmatchlink':
    		// pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/osearch\/.*');
    		pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/search\/.*');
    		break;
    	case 'itemtitle':
    		pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*');
    		break;
    	case 'hassold/bidamount':
    		pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*');
    		break;
        case 'RSS':
        	pattern = /.*search.bid.yahoo.com\/rss\/search\/.*/;
            break;
        default:
            pattern = (typeof link == 'undefined') ? /^fail$/ : new RegExp(common.getLinkReg(link));
    }//end switch
    return pattern;
};

boothSearch.prototype.pickFilterAs = function(key) {
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

boothSearch.prototype.goSearch = function(keyword) {
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

boothSearch.prototype.getSearchResultAmount = function() {
	return this.all('searchResultAmount').first().getText().then(
		function(amount) {
			return Number(amount.trim());
		},
		function() {
			return 0;
		}
	);
};

boothSearch.prototype.pickPage = function(page) {
	// var stand= this, page = (typeof page == 'undefined' || parseInt(page, 10) != page) ? 1 : Number(page);
	var stand = this, page = page || '1';

	return this.one('pagenum').clear().sendKeys(page).then(
		function() {
			stand.clickAndWaitUntilRedirect('submit4Pagenum');
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.getPagination = function() {
	return this.one('right-toppaginationinfo').getInnerHtml().then(
		function(html) {
			return Number(html.replace(/第(\d+)\s*頁，.*/, '$1'));
		}
	);
};

boothSearch.prototype.getsearchRequest = function() {
	var request = {};
	return this.all('searchInputs').each(
		function(unit) {
			var getValue = false;
			unit.getAttribute('type').then(
				function(type) {
					if (type.toLowerCase() == 'checkbox') {
						unit.getAttribute('checked').then(
							function(flag) {
								if (flag) getValue = true;
							}
						)
					} else getValue = true;
				}
			).then(
				function() {
					unit.getAttribute('name').then(
						function(name) {
							if (!name) return;
							unit.getAttribute('value').then(
								function(value) {
									request[name] = (getValue) ? value : '';
								}
							);
						}
					);
				}
			);
		}
	).then(
		function() {
			// console.log(request)
			return request;
		}
	);
};

boothSearch.prototype.rightTopPageAct = function(key) {
	var stand = this, link, key = key.trim();
	return this.all('right-toppaginationlink').each(
		function(unit) {
			unit.getText().then(
				function(txt) {
					if (txt == key) link = unit;
				}
			);
		}
	).then(
		function() {
			if (!link) return;
			stand.clickAndWaitUntilRedirect(link);
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.leftBottomPageAct = function(key) {
	var stand = this, link, key = key.trim();
	return this.all('left-bottompaginationlink').each(
		function(unit) {
			unit.getText().then(
				function(txt) {
					if (txt == key) link = unit;
				}
			);
		}
	).then(
		function() {
			if (!link) return;
			stand.clickAndWaitUntilRedirect(link);
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.pickViewMode = function(mode) {
	var stand = this, idx;
	idx = {
		'圖片': 'viewModeimage',
		'圖文並列': 'viewModeboth'
	};

	return this.getViewMode().then(
		function(cMode) {
			if (cMode == mode) return;
			stand.clickAndWaitUntilRedirect(idx[mode]);
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.pickCategoryAs = function(key) {
	var stand = this, amount = 0, link;
	return this.all('category').each(
		function(unit) {
			unit.$('a').getText().then(
				function(content) {
					if (content == key) {
						link = unit.$('a');
						unit.getInnerHtml().then(
							function(html) {
								amount = Number(html.replace(/.*\(\s*(\d+)\s*\)$/, '$1'));
							}
						);
					}//end if
				}
			);
		}
	).then(
		function() {
			if (link) stand.clickAndWaitUntilRedirect(link);
		}
	).then(
		function() {
			return amount;
		}
	);
};

boothSearch.prototype.turnSearchPreferenceOn = function() {
	var stand = this;
	return this.one('trigger4SearchPreference').click().then(
		function() {
			stand.waitUntilDisplay('searchPreference');
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.setSearchPreferenceAs = function(key) {
	var stand = this, idx, key = 'key' + key;
	idx = {
		'key圖文瀏覽': 'imagetext',
		'key圖片瀏覽': 'image',
		'key25': '25',
		'key50': '50',
		'key75': '75',
		'key100': '100',
		'key相關度': '-rank',
		'key剩餘時間': 'endtime',
		'key刊登時間': '-ptime',
		'key售出/下標次數': '-numbids',
		'key直購價': 'buyPrice',
		'key目前出價': 'curprice'
	};

	return this.one('searchPreference').$('input[value="'+idx[key]+'"]').click().then(
		function() {
			return stand;
		},
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.goSearchPreferenceSubmit = function() {
	var stand = this, flag = true;
	return this.one('searchPreference').isDisplayed().then(
		function() {
			stand.one('submit4searchPreference').click().then(
				function() {
					stand.waitUntilNotDisplay('searchPreference');
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

boothSearch.prototype.getViewMode = function() {
	var mode;
	return this.one('viewModeimage').isPresent().then(
		function(flag) {
			mode = (!flag) ? '圖片' : '圖文並列';
		}
	).then(
		function() {
			return mode;
		}
	);
};

boothSearch.prototype.getCurrentSorting = function() {
	var stand = this, sort;
	return this.one('currentSorting').getText().then(
		function(text) {
			sort = text;
		},
		function() {
			sort = '';
		}
	).then(
		function() {
			return sort;
		}
	);
};

boothSearch.prototype.getPerPageAmount = function() {
	var stand = this, ppa = 0;
	return this.one('searchresultinfomation').getInnerHtml().then(
		function(html) {
			ppa = html.replace(/.*顯示 1 - (\d+) 項/, '$1');
		}
	).then(
		function() {
			return Number(ppa);
		}
	);
};

boothSearch.prototype.sortItemBy = function(type, order) {
	var stand = this, idx, order = (['asc', 'desc'].indexOf(order) == -1) ? 'asce' : order;
	idx = [
		'目前出價',
		'直購價',
		'售出/下標次數',
		'剩餘時間',
		'相關度',
		'刊登時間',
	];
	idx = idx.indexOf(type);
	if (idx == -1) idx = 3;

	return this.clickAndWaitUntilRedirect(this.all('sortings').get(idx)).then(
		function() {
			stand.all('sortings').get(idx).getAttribute('className').then(
				function(className) {
					if (className == order) return;
					stand.clickAndWaitUntilRedirect(stand.all('sortings').get(idx));
				}
			);
		}
	).then(
		function() {
			return stand;
		}
	);
};

boothSearch.prototype.isResultSortingCorrect = function(type, order) {
	var stand = this, flag = false, list = [];

	return this.getViewMode().then(
		function(mode) {
			switch (mode+'^'+type+'^'+order) {
				case '圖片^目前出價^desc':
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] > list[1] && list[1] > list[2];
						}
					);
					break;
				case '圖文並列^目前出價^desc':
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] > list[1] && list[1] > list[2];
						}
					);
					break;
				case '圖片^直購價^desc':
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] > list[1] && list[1] > list[2];
						}
					);
					break;
				case '圖文並列^直購價^desc':
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] > list[1] && list[1] > list[2];
						}
					);
					break;
				case '圖片^剩餘時間^asc':
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] < list[1] && list[1] < list[2];
						}
					);
					break;
				case '圖文並列^剩餘時間^asc':
					// stand.all('itemlesstime').each(
					// 	function(unit) {
					// 		unit.getText().then(
					// 			function(lesstime) {
					// 				var hours = 0, time = lesstime.trim();
					// 				if (/\d+\s*天\s*\d+\s*小時/.test(time)) {
					// 					hours = Number(time.replace(/(\d+).*/, '$1'))*24*60 + Number(time.replace(/.*天\s*(\d+)\s*小時/, '$1'))*60;
					// 				} else if (/\d+小時\s*\d+\s*分/.test(time)) {
					// 					hours = time.replace(/(\d+)小時\s*(\d+)\s*分/, '$1') * 60 + time.replace(/(\d+)小時\s*(\d+)\s*分/, '$2');
					// 				}//end if
					// 				list.push(hours);
					// 			}
					// 		);
					// 	}
					// ).then(
					// 	function() {
					// 		console.log(list)
					// 		flag = list[0] < list[1] && list[1] < list[2];
					// 	}
					// );
					stand.all('itemPrice').each(
						function(unit) {
							unit.getText().then(
								function(price) {
									list.push(Number(price.replace(/(\d+) 元/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] < list[1] && list[1] < list[2];
						}
					);
					break;
				case '圖片^刊登時間^asc':
					stand.all('itemtitle').each(
						function(unit) {
							unit.getText().then(
								function(title) {
									if (!title.trim().length) return;
									list.push(Number(title.trim().replace(/\[競標品\]\[(\d+)\] 測試商品.*/, '$1')));
								}
							);
						}
					).then(
						function() {
							flag = list[0] < list[1] && list[1] < list[2];
						}
					);
					break;
				case '圖文並列^刊登時間^asc':
					stand.all('onshelfTime').each(
						function(unit) {
							unit.getText().then(
								function(date) {
									var time = {};
									time.y = Number(date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/, '$1'));
									time.m = Number(date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/, '$2'));
									time.d = Number(date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/, '$3'));
									time.h = Number(date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/, '$4'));
									time.i = Number(date.replace(/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})/, '$5'));
									list.push(new Date(time.y, time.m-1, time.d, time.h, time.i, 0, 0).getTime());
								}
							);
						}
					).then(
						function() {
							flag = list[0] <= list[1] && list[1] <= list[2];
						}
					);
					break;
			}//end switch
		}
	).then(
		function() {
			return flag;
		}
	);
};

boothSearch.prototype.getIcon = function(key) {
	return this.one(key).element(by.xpath('ancestor::a')).then(
		function(e) {
			return e;
		}
	);
};

boothSearch.prototype.getSortingTxts = function() {
	var sortings = [];

	return this.all('sortings').each(
		function(unit) {
			unit.getText().then(
				function(text) {
					sortings.push(text);
				}
			);
		}
	).then(
		function() {
			return sortings;
		}
	);
};

boothSearch.prototype.getColumes = function() {
	var columes = [];
	return this.all('columes').each(
		function(unit) {
			unit.getText().then(
				function(text) {
					if (!text) return;
					columes.push(text);
				}
			);
		}
	).then(
		function() {
			return columes;
		}
	);
};

module.exports = boothSearch;