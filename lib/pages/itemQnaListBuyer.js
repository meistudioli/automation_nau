var itemQnaListBuyer;

itemQnaListBuyer = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'itemQnaListBuyer';
    this.data.url = constants.URL_MAP.my_qna_list;

    this.selector = {
    	filterQnaTime: '.qnaFilter a[href="#day"]',
    	filterQnaStatus: '.qnaFilter a[href="#status"]',
    	optionWrap: '#damiselect-options',
    	QnaList: '.qna-table-wrap .info',
    	qnaLink: '.item-profile'
    };
};
itemQnaListBuyer.prototype = Object.create(PageObject.prototype);

itemQnaListBuyer.prototype.go = function() {
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

itemQnaListBuyer.prototype.filterByTimeRange = function(type) {
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

itemQnaListBuyer.prototype.filterByStatus = function(type) {
	var stand = this, idx;
	idx = [
		'全部狀態',
		'已回覆',
		'未回覆'
	];
	idx = idx.indexOf(type.trim());

	return this.one('filterQnaStatus').click().then(
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

itemQnaListBuyer.prototype.getCurrentQnaList = function() {
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

module.exports = itemQnaListBuyer;