var category;

category = function(cid) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'category';
    this.data.url = constants.URL_MAP.category + cid + '-category.html';

    this.selector = {
    	crazyAD: '#yauhpcrazyad',
    	btnClose4CrazyAD: '#yauhpcrazyad .hd a',
    	'AD-hotSell': '#yauhchotsell',
    	hotSellfirstitem: '#yauhchotsell .bd a',
    	'AD-SellerChosen': '#yauhpchosen',
    	SellerChosenfirstitem: '#yauhpchosen .bd a',
        'AD-recommandation': '#yauhprecm',
        Recommandationfirstitem: '#yauhprecm .bd a',
        RecommandationDetail: '#yecpanel1',
        'AD-BrandStore': '#yauhcbrand',
        BrandStorefirstitem: '#yauhcbrand .bd a'
    };
};
category.prototype = Object.create(PageObject.prototype);

category.prototype.go = function() {
    var stand = this, pattern = new RegExp(common.getLinkReg(constants.URL_MAP.category));
    return browser.getCurrentUrl().then(
        function(url) {
            // if (!browser.params.forceRefresh && pattern.test(url)) return;
            browser.get(stand.data.url).then(
                function() {
                    browser.sleep(500);
                    stand.one('crazyAD').isPresent().then(
                        function(flag) {
                            if (flag) stand.one('btnClose4CrazyAD').click();
                        }
                    );
                }
            );
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

category.prototype.getUrlPattern = function(patternId, link) {
    var pattern;
    switch(patternId) {
        case 'hotSellfirstitem':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+common.getLinkReg(pattern));
            break;
        case 'SellerChosenfirstitem':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+common.getLinkReg(pattern));
            break;
        case 'Recommandationfirstitem':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+common.getLinkReg(pattern));
            break;
        case 'BrandStorefirstitem':
            pattern = link.replace(/.*\/booth\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/tw\.bid\.yahoo\.com\/tw\/booth\/.*'+common.getLinkReg(pattern));
            break;
        default:
            pattern = (typeof link == 'undefined') ? /^fail$/ : new RegExp(common.getLinkReg(link));
    }//end switch
    return pattern;
};


module.exports = category;