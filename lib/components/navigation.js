var navigation;

navigation = function() {

    this.data = {
        id: 'navigation'
    };

	this.selector = {
        userprofile: '.navigation .user-profile',
        usericon: '.navigation .user-profile img',
        usernickname: '.navigation .user-profile .nick',
        userecid: '.navigation .user-profile .nick+p',
        tabsection: '.navigation .my-nav',
        tabmyauction: '.navigation .my-nav .nav-tabs:nth-child(1)>a',
        tabseller: '.navigation .my-nav .nav-tabs:nth-child(2)>a',
        tabbuyer: '.navigation .my-nav .nav-tabs:nth-child(3)>a',
        tabmember: '.navigation .my-nav .nav-tabs:nth-child(4)>a',
        tabs: '.navigation .my-nav .nav-tabs>a'
    };

    this.yalaKey = {
        '我的拍賣': 'MY_NAV_TAB_0',
        '賣家管理':'MY_NAV_TAB_1',
        '買家管理': 'MY_NAV_TAB_2',
        '會員設定': 'MY_NAV_TAB_3',
        '管理訂單': 'MY_NAV_SUBMENU_0',
        '管理商品': 'MY_NAV_SUBMENU_1',
        '我要賣東西': 'MY_NAV_SUBMENU_2',
        '賣家商品設定': 'MY_NAV_SUBMENU_3',
        '繳費設定': 'MY_NAV_SUBMENU_3',
        '消費記錄': 'MY_NAV_SUBMENU_4',
        '查詢預付點': 'MY_NAV_SUBMENU_5',
        '查詢拍賣回饋金': 'MY_NAV_SUBMENU_6',
        '輕鬆付累積收款額度': 'MY_NAV_SUBMENU_7',
        '輕鬆付收款管理': 'MY_NAV_SUBMENU_8',
        '賣家結帳設定': 'MY_NAV_SUBMENU_9',
        '輕鬆付信用卡設定': 'MY_NAV_SUBMENU_10',
        '全家取貨付款設定': 'MY_NAV_SUBMENU_11',
        '7-11取貨付款設定': 'MY_NAV_SUBMENU_12',
        '編輯黑名單': 'MY_NAV_SUBMENU_13',
        '店舖編輯與管理': 'MY_NAV_SUBMENU_14',
        '申請拍賣店舖': 'MY_NAV_SUBMENU_15',
        '自定我的拍賣賣場': 'MY_NAV_SUBMENU_16',
        '品牌廣告購買與管理': 'MY_NAV_SUBMENU_17',
        '活動廣告購買與管理': 'MY_NAV_SUBMENU_18',
        '商品問與答': 'MY_NAV_SUBMENU_19',
        '買賣留言板': 'MY_NAV_SUBMENU_20',
        '訂單查詢': 'MY_NAV_SUBMENU_21',
        '競標商品': 'MY_NAV_SUBMENU_22',
        '最愛賣家': 'MY_NAV_SUBMENU_23',
        '追蹤商品': 'MY_NAV_SUBMENU_24',
        '買家收貨地址設定': 'MY_NAV_SUBMENU_25',
        '輕鬆付付款管理': 'MY_NAV_SUBMENU_26',
        '編輯大頭貼': 'MY_NAV_SUBMENU_27',
        '編輯會員資料': 'MY_NAV_SUBMENU_28',
        '會員認證狀態': 'MY_NAV_SUBMENU_29',
        '商品情報通知': 'MY_NAV_SUBMENU_30',
        '設定事件通知': 'MY_NAV_SUBMENU_31',
        '編輯評價訊息': 'MY_NAV_SUBMENU_32',
        '編輯關於我': 'MY_NAV_SUBMENU_33',
        '安全憑證': 'MY_NAV_SUBMENU_34',
        '安心鎖': 'MY_NAV_SUBMENU_35'
    };
};
navigation.prototype = Object.create(PageObject.prototype);

navigation.prototype = {
    one: PageObject.prototype.one,
    all: PageObject.prototype.all,
    eleParse: function(key) {
        var key = key.replace(/\s/g, '').split('>'), e1, e2, com = this;

        return this.all('tabs').each(
            function(e) {
                //L1
                var pattern = new RegExp(i18n.get_string(com.yalaKey[key[0]]), 'i');
                e.getText().then(
                    function(content) {
                        var submenu;
                        if (!e1 && pattern.test(content)) {
                            e1 = e;
                            submenu = e.element(by.xpath('ancestor::li')).$('.submenu');
                            // browser.actions().mouseDown(e1).mouseMove(e1).mouseUp(e1).perform();
                            browser.actions().mouseMove(e1).perform().then(
                                function() {
                                    submenu.isDisplayed().then(
                                        function(flag) {
                                            if (!flag) throw Error('No submenu occur');
                                            browser.executeScript(
                                                function() {
                                                    arguments[0].style.display = 'block';
                                                }
                                            , submenu.getWebElement());
                                        }
                                    );
                                }
                            );
                        }//end if
                    }
                );
            }
        ).then(
            function() {
                //L2
                var pattern = new RegExp(i18n.get_string(com.yalaKey[key[1]]), 'i');
                if (!e1) return;
                e1.element(by.xpath('ancestor::li')).$$('.submenu a').each(
                    function(e) {
                        e.getText().then(
                            function(content) {
                                if (!e2 && pattern.test(content)) {
                                    e2 = e;
                                    browser.actions().mouseMove(e2).perform();
                                }//end if
                            }
                        );
                    }
                );
            }
        ).then(
            function() {
                if (e2) {
                    return browser.actions().mouseMove(e1).mouseMove(e2).perform().then(
                        function() {
                            return e2;
                        }
                    );
                } else {
                    throw Error('cant find the request element');
                }//end if
            }
        );
    },
    get: function(key) {
        return (/>/.test(key)) ? this.eleParse(key) : this.one(key);
    }
};

module.exports = navigation;