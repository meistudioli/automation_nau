var itemQnaListSeller;

itemQnaListSeller = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'itemQnaListSeller';
    this.data.url = constants.URL_MAP.my_seller_qna_list;

    this.selector = {
    	searchResultAmount: '.data-result-info em',
    	searchType: '.search-select a',
    	searchTypeOption: '.search-select ul',
    	btnSearch: '.seller-management-search input[type="submit"]',
    	searchInput: '.seller-management-search input[type="search"]',
    	searchResultAmount: '.searh-result .qty',
        dialog: '.msg-dialog-wrap.yui3-panel-focused',
        dialogConfirm: '.msg-dialog-wrap.yui3-panel-focused .button-primary',
    	filterQnaTime: '.qnaFilter a[href="#day"]',
    	optionWrap: '#damiselect-options',
    	QnaList: '.qna-table-wrap .info',
    	qnaLink: '.item-profile',
    	QnaSort: '.qna-sorting a',
    	btnDeleteQuiz: '.operation .q-delete',
    	QnaOperation: '.qna-table-wrap .info:first-child .operation a'
    };
};
itemQnaListSeller.prototype = Object.create(PageObject.prototype);

itemQnaListSeller.prototype.go = function() {
	var stand = this;
    return browser.get(this.data.url).then(
        function() {
        	stand.waitUntilPresent('optionWrap');
        }
    ).thenCatch(
        function(err) {
            //err catch
        }
    ).then(
        function() {
            return stand;
        }
    );
};

itemQnaListSeller.prototype.filterByTimeRange = function(type) {
	var stand = this, idx;
	idx = [
		'今天',
		'昨天',
		'最近1週',
		'最近1個月',
		'最近3個月',
		'最近6個月'
	];
	idx = idx.indexOf(common.trim(type));

	return this.one('filterQnaTime').click().then(
		function() {
			stand.waitUntilDisplay('optionWrap').then(
				function() {
					browser.sleep(700);//animation
				}
			);
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('optionWrap').$$('a').get(idx));
		}
	).then(
		function() {
			return stand;
		}
	);
};

itemQnaListSeller.prototype.sortBy = function(type) {
	var stand = this, idx;
	idx = [
		'最近發問時間',
		'最近回覆時間'
	];
	idx = idx.indexOf(common.trim(type));

	return this.one('QnaSort').click().then(
		function() {
			stand.waitUntilDisplay('optionWrap').then(
				function() {
					browser.sleep(700);//animation
				}
			);
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('optionWrap').$$('a').get(idx));
		}
	).then(
		function() {
			return stand;
		}
	);
};

itemQnaListSeller.prototype.getCurrentQnaList = function() {
	var stand = this, list = [];
	return this.all('QnaList').each(
		function(qna) {
			qna.$(stand.selector.qnaLink).getAttribute('href').then(
				function(href) {
					list.push(href.replace(/.*\/item\/(\d*)/, '$1'));
				}
			);
		}
	).then(
		function() {
			return list;
		}
	);
};

itemQnaListSeller.prototype.pickSearchType = function(type) {
    var stand = this, type = type.toLowerCase().replace(/\s/g, ''), idx;
    idx = ['title', 'mid', 'itemnumber'].indexOf(type);
    if (idx == -1) {
    	type = 'title';
    	idx = 0;
    }//end if
	
	return this.one('searchType').click().then(
		function() {
			stand.waitUntilDisplay('searchTypeOption');
		}
	).then(
		function() {
			stand.one('searchTypeOption').$$('a').get(idx).click().then(
				function() {
					stand.waitUntilNotDisplay('searchTypeOption');
				}
			);
		}
	).then(
		function() {
			return stand;
		}
	);
};

itemQnaListSeller.prototype.goSearch = function(keyword) {
	var stand = this;
	return this.one('searchInput').clear().sendKeys(keyword).then(
		function() {
			stand.clickAndWaitUntilRedirect('btnSearch');
		}
	).then(
		function() {
			return stand;
		}
	)
};

itemQnaListSeller.prototype.getSearchResultAmount = function() {
	return this.one('searchResultAmount').getText().then(
		function(amount) {
			return Number(common.trim(amount));
		},
		function() {
			return 0;
		}
	);
};

itemQnaListSeller.prototype.deleteQuiz = function() {
	var stand = this, flag = true;
	return this.getSearchResultAmount().then(
		function(amount) {
			if (!amount) return;
			for (var i=-1,l=amount;++i<l;) {
				stand.one('QnaList').$(stand.selector.btnDeleteQuiz).click().then(
					function() {
						stand.waitUntilPresent('dialog');
					}
				).then(
					function() {
						stand.clickAndWaitUntilRedirect('dialogConfirm');
					}
				).thenCatch(
					function() {
						flag = false;
					}
				);
			}//end for
		}
	).then(
		function() {
			return flag;
		}
	);
};

itemQnaListSeller.prototype.goReply = function() {
	var stand = this, itemQnaDetailSeller = require(__base + constants.PO.itemQnaDetailSeller), idx, flag = true;

	return this.all('QnaOperation').each(
		function(unit, index) {
			unit.getText().then(
				function(content) {
					if (content.trim() == '我要回覆') idx = index;
				}
			);
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.all('QnaOperation').get(idx));
		}
	).then(
		function() {
			return new itemQnaDetailSeller();
		}
	);
};

module.exports = itemQnaListSeller;