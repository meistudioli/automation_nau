var i18n = function(encoding) {
    // var YRB = require('/home/y/share/node/yglobal/yrb');

    // this.yf = new YRB.YrbFactory();
    // this.bundleId = this.yf.getResourceBundleID("auction2/string", encoding);
    this.data = {
        MY_NAV_TAB_0: '我的拍賣',
        MY_NAV_TAB_1: '賣家管理',
        MY_NAV_TAB_2: '買家管理',
        MY_NAV_TAB_3: '會員設定',
        MY_NAV_SUBMENU_0: '管理訂單',
        MY_NAV_SUBMENU_1: '管理商品',
        MY_NAV_SUBMENU_2: '我要賣東西',
        MY_NAV_SUBMENU_3: '繳費設定',
        MY_NAV_SUBMENU_4: '消費記錄',
        MY_NAV_SUBMENU_5: '查詢預付點',
        MY_NAV_SUBMENU_6: '查詢拍賣回饋金',
        MY_NAV_SUBMENU_7: '輕鬆付累積收款額度',
        MY_NAV_SUBMENU_8: '輕鬆付收款管理',
        MY_NAV_SUBMENU_9: '賣家結帳設定',
        MY_NAV_SUBMENU_10: '輕鬆付信用卡設定',
        MY_NAV_SUBMENU_11: '全家取貨付款設定',
        MY_NAV_SUBMENU_12: '7-11取貨付款設定',
        MY_NAV_SUBMENU_13: '編輯黑名單',
        MY_NAV_SUBMENU_14: '店舖編輯與管理',
        MY_NAV_SUBMENU_15: '申請拍賣店舖',
        MY_NAV_SUBMENU_16: '自定我的拍賣賣場',
        MY_NAV_SUBMENU_17: '品牌廣告購買與管理',
        MY_NAV_SUBMENU_18: '活動廣告購買與管理',
        MY_NAV_SUBMENU_19: '商品問與答',
        MY_NAV_SUBMENU_20: '買賣留言板',
        MY_NAV_SUBMENU_21: '訂單查詢',
        MY_NAV_SUBMENU_22: '競標商品',
        MY_NAV_SUBMENU_23: '最愛賣家',
        MY_NAV_SUBMENU_24: '追蹤商品',
        MY_NAV_SUBMENU_25: '買家收貨地址設定',
        MY_NAV_SUBMENU_26: '輕鬆付付款管理',
        MY_NAV_SUBMENU_27: '編輯大頭貼',
        MY_NAV_SUBMENU_28: '編輯會員資料',
        MY_NAV_SUBMENU_29: '會員認證狀態',
        MY_NAV_SUBMENU_30: '商品情報通知',
        MY_NAV_SUBMENU_31: '設定事件通知',
        MY_NAV_SUBMENU_32: '編輯評價訊息',
        MY_NAV_SUBMENU_33: '編輯關於我',
        MY_NAV_SUBMENU_34: '安全憑證',
        MY_NAV_SUBMENU_35: '安心鎖',
        MERCHANDISE_TYPE_BUY_NOW: '直購商品',
        MERCHANDISE_TYPE_BID: '競標商品',
        MERCHANDISE_ITEM_NEWEST_ITEM: '最新新增的商品',
        MERCHANDISE_ITEM_LEFT_TIME_LOW_TO_HIGH: '剩餘時間少到多',
        MERCHANDISE_ITEM_LEFT_TIME_HIGH_TO_LOW: '剩餘時間多到少',
        MERCHANDISE_ITEM_CURRENT_PRICE_LOW_TO_HIGH: '目前出價低到高',
        MERCHANDISE_ITEM_CURRENT_PRICE_HIGH_TO_LOW: '目前出價高到低',
        MERCHANDISE_ITEM_BID_LOW_TO_HIGH: '出價次數少到多',
        MERCHANDISE_ITEM_BID_HIGH_TO_LOW: '出價次數多到少',
        MERCHANDISE_ITEM_SELL_LOW_TO_HIGH: '銷售數量少到多',
        MERCHANDISE_ITEM_SELL_HIGH_TO_LOW: '銷售數量多到少',

        //need to update
        MERCHANDISE_ITEM_ONTIME_DESC: '上架時間新到舊',
        MERCHANDISE_ITEM_ONTIME_ASC: '上架時間舊到新',
        MERCHANDISE_ITEM_OFFTIME_DESC: '下架時間新到舊',
        MERCHANDISE_ITEM_OFFTIME_ASC: '下架時間舊到新'
    };
};

i18n.prototype = {
    get_string: function(key) {
        return this.data[key] || key;
        // return this.yf.getString(this.bundleId, key);
    }
};

module.exports = i18n;