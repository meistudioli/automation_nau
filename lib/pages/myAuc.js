var myAuc, com_navigation;

myAuc = function(itemId) {
	PageObject.call(this); // call super constructor.

    this.data.id = 'myAuc';
    this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
        generalInfo: '.sidebar .general-info',
        mainContent: '.main-content',
        emailInfo: '.general-info .email a',
        C2CSection: '.general-info .account .account-info-list',
        C2CTitle: '.general-info .account .title a',
        C2CCash: '.general-info .account .account-info-list .cash a',
        C2CCreditCard: '.general-info .account .account-info-list .credit-card a',
        rating: '.general-info .rating .positive-rate a',
        positiverating: '.general-info .rating .positive .value',
        negativerating: '.general-info .rating .negative .value',
        totalrating: '.general-info .rating .total .value',
        ADundergeneralInfo: '.general-info+.common-phtml-wrap',
        SellerDashboard: '.my-dashboard.seller-section',
        SellerDashboardoldauctionmsgBoardlink: '.seller-section .subject .extra-info a',
        SellerDashboardoldauctionorderlink: '.seller-section .subject .extra-info a:nth-child(2)',
        SellerDashboardContent: '.seller-section .content-wrap.active',
        SellerDashboardonsaleitem: '.seller-section .tabs .mod-seller-on-sale-item',
        // 'SellerDashboarditemQnA': '.seller-section .tabs .mod-seller-item-qna',
        SellerDashboardOnSaleItembuynow: '.mod-seller-on-sale-item+.content-wrap .general-info em',
        SellerDashboardOnSaleItembidding: '.mod-seller-on-sale-item+.content-wrap .general-info em:nth-child(2)',
        SellerDashboardListonsaleitem: '.mod-seller-on-sale-item+.content-wrap .detail-info .info',
        imgLink: '.image',
        'SellerDashboardList-onsaleitem-thumbnail': '.mod-seller-on-sale-item+.content-wrap .detail-info .info .image img',
        'SellerDashboardList-onsaleitem-title': '.mod-seller-on-sale-item+.content-wrap .detail-info .info .name',
        'SellerDashboardList-onsaleitem-viewall': '.mod-seller-on-sale-item+.content-wrap .footer a',
        SellerDashboardcvsorder: '.seller-section .tabs .mod-seller-cvs-order',
        SellerDashboardCVSOrderAmount: '.mod-seller-cvs-order+.content-wrap .general-info em',
        'sellerdashboard-cvsorder-auctionclassictip': '.mod-seller-cvs-order+.content-wrap .check-legacy-order a',
        'SellerDashboardList-cvsorder-orderId': '.mod-seller-cvs-order+.content-wrap .detail-info .info .order',
        'SellerDashboardList-cvsorder-createtime': '.mod-seller-cvs-order+.content-wrap .detail-info .info .create-time',
        SellerDashboarditemQna: '.seller-section .tabs .mod-seller-item-qna',
        dialog: '.msg-dialog-wrap.yui3-panel-focused',
        btnClose: '.msg-dialog-wrap.yui3-panel-focused .button-close,.msg-dialog-wrap.yui3-panel-focused .button-close-text',
        SellerDashboardListitemQna: '.mod-seller-item-qna+.content-wrap .detail-info .info',
        'SellerDashboardList-itemQna-thumbnail': '.mod-seller-item-qna+.content-wrap .detail-info .info .image img',
        'SellerDashboardList-itemQna-title': '.mod-seller-item-qna+.content-wrap .detail-info .info .name',
        'SellerDashboardList-itemQna-date': '.mod-seller-item-qna+.content-wrap .detail-info .info .ask-date',
        'SellerDashboardList-itemQna-content': '.mod-seller-item-qna+.content-wrap .detail-info .info .question .fadeout',
        'SellerDashboardList-itemQna-viewall': '.mod-seller-item-qna+.content-wrap .footer a',
        'SellerDashboardList-itemQna-reply': '.mod-seller-item-qna+.content-wrap .detail-info .info .operation a',
        footer: '.footer',
        favroitestore: '.favorstore',
        eachfavoritestorethumbnail: '.favorstore article .restrict img',
        eachfavoritestoretitle: '.favorstore article .info a',
        favoritestorePromote: '.favorstore article .promotion a',
        favoritestoreseemore: '.favorstore .more',
        firstfavoritestore: '.favorstore article',
        btnRemovefavoritestore: '.favorstore article .trigger a.remove',
        favoritestoreRemoveConfirm: '.favorstore article .face.back',
        sign4favoritestoreRemove: '.favorstore .act.out',
        BuyerDashboarditemQna: '.buyer-section .tabs .mod-buyer-item-qna',
        BuyerDashboardListitemQna: '.mod-buyer-item-qna+.content-wrap .detail-info .info',
        'BuyerDashboardList-itemQna-thumbnail': '.mod-buyer-item-qna+.content-wrap .detail-info .info .image img',
        'BuyerDashboardList-itemQna-title': '.mod-buyer-item-qna+.content-wrap .detail-info .info .name',
        'BuyerDashboardList-itemQna-content': '.mod-buyer-item-qna+.content-wrap .detail-info .info .question .fadeout',
        'BuyerDashboardList-itemQna-viewall': '.mod-buyer-item-qna+.content-wrap .footer a',
        'BuyerDashboardList-itemQna-operation': '.mod-buyer-item-qna+.content-wrap .detail-info .info .operation a',
        watchlist: '.watchlist',
        firstwatchlist: '.watchlist article',
        btnRemovewatchlist: '.watchlist article .trigger a.remove',
        watchlistRemoveConfirm: '.watchlist article .face.back',
        sign4watchlistRemove: '.watchlist .act.out',
        btnSubmit: 'input[type="submit"]'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
myAuc.prototype = Object.create(PageObject.prototype);

myAuc.prototype.go = function() {
    var stand = this, pattern = new RegExp(common.getLinkReg(constants.URL_MAP.my_auction));
    return browser.getCurrentUrl().then(
        function(url) {
            if (!browser.params.forceRefresh && pattern.test(url) && !(/myauc\//.test(url))) return;
            browser.get(stand.data.url).then(
                function() {
                    browser.sleep(500);
                    stand.one('dialog').isPresent().then(
                        function(flag) {
                            if (flag) stand.one('btnClose').click();
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

myAuc.prototype.getUrlPattern = function(patternId, link) {
    var pattern;
    switch(patternId) {
        case 'emailInfo':
            pattern = /.*mail\.yahoo\.com\/.*/;
            break;
        case 'SellerDashboardList-onsaleitem-title':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        case 'SellerDashboardList-itemQna-title':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        case 'thefirstrowbiddingthumbnail':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        case 'thefirstrowbiddingtitle':
            pattern = link.replace(/.*\/item\/(.*)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        case 'highestbiddingoperate-QNA':
            pattern = link.replace(/.*\/item\/.*-(\d+)\?showQnA=.*/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        case 'highestbiddingoperate-highestbidder':
            pattern = link.replace(/.*\/item\/.*-(\d+)/, '$1');
            pattern = new RegExp('https:\/\/.*.bid.yahoo.com\/item\/.*'+pattern);
            break;
        default:
            pattern = (typeof link == 'undefined') ? /^fail$/ : new RegExp(common.getLinkReg(link));
    }//end switch
    return pattern;
};

myAuc.prototype.sellerDashboardTabSwitch = function(key) {
    var stand = this, key = 'SellerDashboard' + key.replace(/\s/g, '');

    return this.one(key).$('a').then(
        function(e) {
            stand.clickAndWaitUntilRedirect(e);
        }
    );
};

myAuc.prototype.buyerDashboardTabSwitch = function(key) {
    var stand = this, key = 'BuyerDashboard' + key.replace(/\s/g, '');

    return this.one(key).$('a').then(
        function(e) {
            stand.clickAndWaitUntilRedirect(e);
        }
    );
};

myAuc.prototype.getSellerDashboardTabAmountInfo = function(key) {
    var stand = this, key = 'SellerDashboard' + key.replace(/\s/g, '');
    return this.one(key).$('em').getText().then(
        function(amount) {
            return Number(amount.trim());
        },
        function() {
            return 0;
        }
    );
};

myAuc.prototype.getSellerDashboardOnSaleItemAmount = function(key) {
    var key = 'SellerDashboardOnSaleItem' + key.replace(/\s/g, '');
    return this.one(key).getText().then(
        function(amount) {
            return Number(amount.trim());
        },
        function() {
            return 0;
        }
    );
};

myAuc.prototype.getSellerDashboardCVSOrderAmount = function() {
    return this.one('SellerDashboardCVSOrderAmount').getText().then(
        function(amount) {
            return Number(amount.trim());
        },
        function() {
            return 0;
        }
    );
};

myAuc.prototype.getSellerDashboardListingOrder = function(key) {
    var stand = this, key = 'SellerDashboardList' + key.replace(/\s/g, ''), list = [];
    return this.all(key).each(
        function(item) {
            item.$(stand.selector.imgLink).getAttribute('href').then(
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

myAuc.prototype.getBuyerDashboardListingOrder = function(key) {
    var stand = this, key = 'BuyerDashboardList' + key.replace(/\s/g, ''), list = [];
    return this.all(key).each(
        function(item) {
            item.$(stand.selector.imgLink).getAttribute('href').then(
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

myAuc.prototype.removeFavoritestore = function() {
    var stand = this, flag = true;
    return this.one('favroitestore').$$('article').count().then(
        function(amount) {
            if (!amount) throw new Error('favroitestore element exist error');
        },
        function() {
            throw new Error('favroitestore element exist error');
        }
    ).then(
        function() {
            stand.rolloverFor('btnRemovefavoritestore', 'firstfavoritestore').then(
                function() {
                    stand.one('btnRemovefavoritestore').click().then(
                        function() {
                            return stand.waitUntilDisplay('favoritestoreRemoveConfirm', 1000).then(
                                function() {
                                    stand.waitUntilDisplay(stand.one('favoritestoreRemoveConfirm').$(stand.selector.btnSubmit));
                                }
                            );
                        }
                    ).then(
                        function() {
                            stand.one('favoritestoreRemoveConfirm').$(stand.selector.btnSubmit).click().then(
                                function() {
                                    stand.waitUntilNotPresent('sign4favoritestoreRemove');
                                }
                            ).thenCatch(
                                function() {
                                    stand.one('favoritestoreRemoveConfirm').$(stand.selector.btnSubmit).click().then(
                                        function() {
                                            stand.waitUntilNotPresent('sign4favoritestoreRemove');
                                        }
                                    );
                                }
                            ).then(
                                function() {
                                    browser.sleep(500);//animation
                                }
                            );
                        }
                    );
                }
            );
        }
    ).thenCatch(
        function(err) {
            // console.log(err);
            flag = false;
        }
    ).then(
        function() {
            return flag;
        }
    );
};

myAuc.prototype.removeWatchList = function() {
    var stand = this, flag = true;
    return this.one('watchlist').$$('article').count().then(
        function(amount) {
            if (!amount) throw new Error('watchlist element exist error');
        },
        function() {
            throw new Error('watchlist element exist error');
        }
    ).then(
        function() {
            stand.rolloverFor('btnRemovewatchlist', 'firstwatchlist').then(
                function() {
                    stand.one('btnRemovewatchlist').click().then(
                        function() {
                            stand.waitUntilDisplay('watchlistRemoveConfirm', 1000).then(
                                function() {
                                    stand.waitUntilDisplay(stand.one('watchlistRemoveConfirm').$(stand.selector.btnSubmit));
                                }
                            );
                        }
                    ).then(
                        function() {
                            stand.one('watchlistRemoveConfirm').$(stand.selector.btnSubmit).click().then(
                                function() {
                                    stand.waitUntilNotPresent('sign4watchlistRemove');
                                }
                            ).thenCatch(
                                function() {
                                    stand.one('watchlistRemoveConfirm').$(stand.selector.btnSubmit).click().then(
                                        function() {
                                            stand.waitUntilNotPresent('sign4watchlistRemove');
                                        }
                                    );
                                }
                            ).then(
                                function() {
                                    browser.sleep(500);//animation
                                }
                            );
                        }
                    );
                }
            );
        }
    ).thenCatch(
        function(err) {
            // console.log(err);
            flag = false;
        }
    ).then(
        function() {
            return flag;
        }
    );
};

module.exports = myAuc;