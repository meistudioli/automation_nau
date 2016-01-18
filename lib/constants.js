module.exports = {
    TIMEOUT_SHORT: 5000,
    TIMEOUT: 10000,
    LOGIN_PATH: 'https://login.yahoo.com/m?.lg=tw&.intl=tw&.src=mktg1&.done=http://tw.bid.yahoo.com/status.html',
    DE_CAPTCHA_URL: 'http://xxxxxxxxxxxx',
    DID_URL: 'http://xxxxxxxxxxxx',
    AUTHTOKEN_URL: 'https://xxxxxxxxxxxx',
    BARGAIN_ON: 'https://xxxxxxxxxxxx',
    BARGAIN_ACCEPT: 'https://xxxxxxxxxxxx/bargains/{1}/messages',
    dataSrc: '/lib/data/basic.json',
    cvsFamilyStoreId: '14429',//台北市南港區研究院路二段70巷1號 (研究院店)
    cvs711StoreId: '991182', //台北市南港區三重路23號1樓(馥樺門市)
    PO: {
        pageObject: '/lib/pages/pageObject',
        itemPage: '/lib/pages/itemPage',
        myAuc: '/lib/pages/myAuc',
        orderListSeller: '/lib/pages/orderListSeller',
        biddingList: '/lib/pages/biddingList',
        selectType: '/lib/pages/selectType',
        selectCategory: '/lib/pages/selectCategory',
        singleEdit: '/lib/pages/singleEdit',
        itemPreview: '/lib/pages/itemPreview',
        did: '/lib/pages/did',
        submitSuccess: '/lib/pages/submitSuccess',
        shoppingCart: '/lib/pages/shoppingCart',
        orderConfirm: '/lib/pages/orderConfirm',
        cvsFamily: '/lib/pages/cvsFamily',
        orderComplete: '/lib/pages/orderComplete',
        listMerchandise: '/lib/pages/listMerchandise',
        cvs711: '/lib/pages/cvs711',
        itemQnaListSeller: '/lib/pages/itemQnaListSeller',
        itemQnaDetailSeller: '/lib/pages/itemQnaDetailSeller',
        itemQnaListBuyer: '/lib/pages/itemQnaListBuyer',
        booth: '/lib/pages/booth',
        boothSearch: '/lib/pages/boothSearch',
        oSearch: '/lib/pages/oSearch',
        codDeliver: '/lib/pages/codDeliver',
        codDeliverResult: '/lib/pages/codDeliverResult',
        orderDetailSeller: '/lib/pages/orderDetailSeller',
        codMultiDeliver: '/lib/pages/codMultiDeliver',
        orderCancelSeller: '/lib/pages/orderCancelSeller',
        cvsDeliver: '/lib/pages/cvsDeliver',
        cvsDeliverResult: '/lib/pages/cvsDeliverResult',
        ratingSeller: '/lib/pages/ratingSeller',
        orderListBuyer: '/lib/pages/orderListBuyer',
        ratingBuyer: '/lib/pages/ratingBuyer',
        homepage: '/lib/pages/homepage',
        category: '/lib/pages/category',
        cartOverviewApp: '/lib/pages/cartOverviewApp',
        cartBargainListApp: '/lib/pages/cartBargainListApp',
        cartApp: '/lib/pages/cartApp',
        orderconfirmApp: '/lib/pages/orderconfirmApp',
        ordercompleteApp: '/lib/pages/ordercompleteApp'
    },
    COM: {
        header: '/lib/components/header',
        footer: '/lib/components/footer',
        navigation: '/lib/components/navigation'
    },
    URL_MAP: {
        my_auction: '/myauc',
        item_page: '/item/',
        cart_list: '/checkout/cart',
        merchandise_item_list: '/partner/merchandise/list_merchandise',
        my_seller_qna_list: '/partner/itemqna',
        my_qna_list: '/myauc/itemqna',
        my_bidding: '/myauc/bid',
        merchandise_select_type: '/partner/merchandise/select_type',
        cart_list: '/checkout/cart',
        order_list: '/partner/order/list',
        order_list_buyer: '/myauc/order',
        booth: '/tw/booth/',
        homepage: '/',
        category: '/tw/',
        cartOverviewApp: '/checkout/cartOverviewApp'
    },
    get: function(key) {
        var res = this;
        key = key.split('.');
        while (key.length) res = res[key.shift()];
        if (typeof res == 'undefined') res = false;
        return res;
    },
    plug: function(partition) {
        var conf = require(__dirname + '/conf' + common.capitalize((partition == 'beta') ? 'beta' : 'prod')), host;

        //clone
        for (var i in conf) {
            this[i] = JSON.parse(JSON.stringify(conf[i]));
        }//end for

        //URL_MAP
        // host = (partition == 'beta') ? '-beta' : ((partition == 'pp')) ? '-pp-tp2' : '';
        // host =  'https://tw' + host + '.bid.yahoo.com';
        switch (partition) {
            case 'beta':
                host =  'https://tw-beta.beta.bid.yahoo.com';
                break;
            case 'pp':
                host = 'https://tw-pp-tp2.bid.yahoo.com';
                host = 'https://tw-tp2.pp.bid.yahoo.com';
                break;
            default:
                host =  'https://tw.bid.yahoo.com';
        }//end switch

        for (var i in this.URL_MAP) this.URL_MAP[i] = host + this.URL_MAP[i];

        conf = null;
    }
};
