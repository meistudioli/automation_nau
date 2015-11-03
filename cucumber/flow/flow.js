var flow = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/

    // I buy the upper item
    Given(/^I buy the upper item$/, function(next) {
        var world = this, itemPage = require(__base + constants.PO.itemPage), itemId;

        // world.itemQueue = ['100048291973'];
        itemId = world.itemQueue[world.itemQueue.length-1];

        itemPage = new itemPage(itemId);
        this.stand = itemPage;

        itemPage.go().then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.pickShipType('family');
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.selectFamilyStore();
            }
        ).then(
            function(cvsFamily) {
                return cvsFamily.pickStoreById(constants.cvsFamilyStoreId);
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });


    // I buy the upper item through 711
    Given(/^I buy the upper item through 711$/, function(next) {
        var world = this, itemPage = require(__base + constants.PO.itemPage), itemId;

        // world.itemQueue = ['100045827701'];
        itemId = world.itemQueue[world.itemQueue.length-1];

        itemPage = new itemPage(itemId);
        this.stand = itemPage;

        itemPage.go().then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }            
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                return itemPage.go();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.pickShipType('711');
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.select711Store();
            }
        ).then(
            function(cvs711) {
                return cvs711.pickStoreById(constants.cvs711StoreId);
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });

    // I pick search type as "title"
    Given(/I pick search type as "([^"]*)"/, function(type, next) {
        this.stand.pickSearchType(type).then(
            function(listMerchandise) {

            }
        ).then(next, next);
    });

    // I make a "100044603551" search
    Given(/I make a "([^"]*)" search/, function(keyword, next) {
        this.stand.goSearch(keyword).then(
            function(listMerchandise) {

            }
        ).then(next, next);
    });    

    // I bid and won the upper item
    Given(/I bid and won the upper item/, function(next) {
        var world = this, itemPagePO, biddingItem, buynowItem, itemPage, buyerId, sellerId;
        
        itemPagePO = require(__base + constants.PO.itemPage);
        
        // world.itemQueue = ['100045263730', '100045263841'];//bidding, buynow
        biddingItem = world.itemQueue[0];
        buynowItem = world.itemQueue[1];
        buyerId = world.userId;
        sellerId = world.owners['m'+biddingItem];
        world.startPrice *= 2;

        itemPage = new itemPagePO(buynowItem);

        itemPage.go().then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                itemPage = new itemPagePO(biddingItem);
                world.stand = itemPage;

                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickBidType('direct');
            }
        ).then(
            function(itemPage) {
                return itemPage.goBid(world.startPrice);
            }
        ).then(
            function(itemPage) {
                //switch to seller
                itemPage.login(sellerId);
            }
        ).then(
            function() {
                //closebid
                var listMerchandise = require(__base + constants.PO.listMerchandise);
                listMerchandise = new listMerchandise();

                listMerchandise.go().then(
                    function(listMerchandise) {
                        return listMerchandise.pickSearchType('mid');
                    }
                ).then(
                    function(listMerchandise) {
                        return listMerchandise.goSearch(biddingItem);
                    }
                ).then(
                    function(listMerchandise) {
                        return listMerchandise.getSearchResultAmount();
                    }
                ).then(
                    function(amount) {
                        expect(amount, 'search result error').to.be.at.least(1);
                    }
                ).then(
                    function() {
                        return listMerchandise.closeBidFirstRowItem();
                    }
                ).then(
                    function(flag) {
                        expect(flag, 'closebid the first item fail').to.be.true;
                    }
                );
            }
        ).then(
            function() {
                //switch to buyer
                itemPage.login(buyerId).then(
                    function() {
                        world.userId = buyerId;
                    }
                );
            }
        ).thenCatch(
            function(err) {
                throw new Error('bid & won item fail');
                next.fail();
            }
        ).then(next, next);
    });

    // I buy the upper bidding item
    Given(/I buy the upper bidding item/, function(next) {
        var world = this, shoppingCart = require(__base + constants.PO.shoppingCart);

        // go through cvsFamily
        shoppingCart = new shoppingCart();
        this.stand = shoppingCart;

        shoppingCart.go().then(
            function(shoppingCart) {
                return shoppingCart.pickShipType('family');
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.selectFamilyStore();
            }
        ).then(
            function(cvsFamily) {
                return cvsFamily.pickStoreById(constants.cvsFamilyStoreId);
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });

    // I buy the upper bidding item through 711
    Given(/I buy the upper bidding item through 711/, function(next) {
        var world = this, shoppingCart = require(__base + constants.PO.shoppingCart);

        // go through 711
        shoppingCart = new shoppingCart();
        this.stand = shoppingCart;

        shoppingCart.go().then(
            function(shoppingCart) {
                return shoppingCart.pickShipType('711');
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.select711Store();
            }
        ).then(
            function(cvs711) {
                return cvs711.pickStoreById(constants.cvs711StoreId);
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });


    //I buy item through "711"
    Given(/I buy item through "([^"]*)"/, function(cvs, next) {
        var world = this, itemPage = this.stand, cvs = (['711', 'family', 'cod'].indexOf(cvs) == -1) ? '711' : cvs;

        //itemPage
        itemPage.pickSpecFromFirstSet().then(
            function(itemPage) {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.pickShipType(cvs);
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                if (cvs == 'cod') throw new Error('payType is COD, pass pick cvs store.');
                return orderConfirm['select' + common.capitalize(cvs) + 'Store']();
            }
        ).then(
            function(cvsPage) {
                if (cvs == 'cod') throw new Error('payType is COD, pass pick cvs store.');
                return cvsPage.pickStoreById(constants['cvs' + common.capitalize(cvs) + 'StoreId']);
            }
        ).thenCatch(
            function(err) {
                var orderConfirm = require(__base + constants.PO.orderConfirm);
                return new orderConfirm();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });


    // I mutant on the items
    Given(/I mutant "([^"]*)" the items/, function(act, next) {
        var act = (['on', 'off'].indexOf(act) == -1) ? 'on' : act;
        mutant.mutate(act).then(next, next);
    });


    /*------------------------ When ---------------------- --*/

    // I create a clear cart item
    When(/I create a clear cart item/, function(dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), world = this, shadow = {};

        data = dataObj.hashes()[0];
        shadow = JSON.parse(JSON.stringify(data));
        shadow.owner = this.userId;
        browser.params.shadow.ITEM.buyNow.clear = shadow;

        mutant.createItem('buynow', data).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.itemQueue.push(itemId);
                world.itemId = itemId;
                //shadowData
                shadow.mid = itemId;
            }
        ).then(next, next);
    });


    // I create a basic bidding item
    When(/^I create a basic bidding item$/, function(dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), world = this, shadow = {};

        data = dataObj.hashes()[0];
        shadow = JSON.parse(JSON.stringify(data));
        shadow.owner = this.userId;
        browser.params.shadow.ITEM.bidding.basic = shadow;

        mutant.createItem('bidding', data).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.itemQueue.push(itemId);
                world.itemId = itemId;
                //shadowData
                shadow.mid = itemId;
            }
        ).then(next, next);
    });


    // I create a buynow bidding item
    When(/^I create a buynow bidding item$/, function(dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), world = this, shadow = {};

        data = dataObj.hashes()[0];
        shadow = JSON.parse(JSON.stringify(data));
        shadow.owner = this.userId;
        browser.params.shadow.ITEM.bidding.buynow = shadow;

        mutant.createItem('bidding', data).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.itemQueue.push(itemId);
                world.itemId = itemId;
                //shadowData
                shadow.mid = itemId;
            }
        ).then(next, next);
    });


    // I create a basic multi-spec item
    When(/^I create a basic multi-spec item$/, function(dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), data, type, payType, shipFee, shipType, itemLocation, world = this, shadow = {};

        data = dataObj.hashes()[0];
        data.specs = [
            {
                specKey: '大小',
                specValue: ['超大', '大', '中', '小', '超小']
            },
            {
                specKey: '顏色',
                specValue: ['黃', '綠', '紅']
            }
        ];

        shadow = JSON.parse(JSON.stringify(data));
        shadow.owner = this.userId;
        browser.params.shadow.ITEM.buyNow.basic = shadow;

        mutant.createItem('buynow', data).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.itemQueue.push(itemId);
                world.itemId = itemId;
                //shadowData
                shadow.mid = itemId;
            }
        ).then(next, next);
    });


    // I create a basic multi-spec(layerx1) item
    When(/^I create a basic multi-spec\(layerx1\) item$/, function(dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), data, world = this, shadow = {};

        data = dataObj.hashes()[0];
        data.specs = [
            {
                specKey: '大小',
                specValue: ['超大', '大', '中', '小', '超小']
            }
        ];

        shadow = JSON.parse(JSON.stringify(data));
        shadow.owner = this.userId;
        browser.params.shadow.ITEM.buyNow.basic = shadow;

        mutant.createItem('buynow', data).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.itemQueue.push(itemId);
                world.itemId = itemId;
                //shadowData
                shadow.mid = itemId;
            }
        ).then(next, next);
    });


    // I buy the upper bidding item through "711"
    When(/^I buy the upper bidding item through "([^"]*)"$/, function(cvs, next) {
        var world = this, shoppingCart = require(__base + constants.PO.shoppingCart), cvs = (['711', 'family', 'cod'].indexOf(cvs) == -1) ? '711' : cvs;

        // go through cvsFamily
        shoppingCart = new shoppingCart();
        this.stand = shoppingCart;

        shoppingCart.go().then(
            function(shoppingCart) {
                return shoppingCart.pickShipType(cvs);
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                if (cvs == 'cod') throw new Error('payType is COD, pass pick cvs store.');
                return orderConfirm['select' + common.capitalize(cvs) + 'Store']();
            }
        ).then(
            function(cvsPage) {
                if (cvs == 'cod') throw new Error('payType is COD, pass pick cvs store.');
                return cvsPage.pickStoreById(constants['cvs' + common.capitalize(cvs) + 'StoreId']);
            }
        ).thenCatch(
            function(err) {
                var orderConfirm = require(__base + constants.PO.orderConfirm);
                return new orderConfirm();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });


    //I buy item directly with shipType - "Face2Face"
    When(/^I buy item directly with shipType - "([^"]*)"$/, function(shiptype, next) {
        var world = this, itemPage = this.stand;

        //itemPage
        itemPage.pickSpecFromFirstSet().then(
            function(itemPage) {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.pickShipType(shiptype);
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.pickPayType('FamiPort');
            }
        ).then(
            function(orderConfirm) {
                return orderConfirm.goCheckout();
            }
        ).then(
            function(orderComplete) {
                return orderComplete.getOrderId();
            }
        ).then(
            function(orderId) {
                world.orderId = orderId;
            }
        ).then(next, next);
    });

    // I visit ordercomfirm with shipType - "Face2Face"
    When(/I visit ordercomfirm with shipType - "([^"]*)"/, function(shiptype, next) {
        var world = this, itemPage = this.stand;

        //itemPage
        itemPage.pickSpecFromFirstSet().then(
            function(itemPage) {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                shoppingCart.clearOItem();
            }
        ).then(
            function() {
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickSpecFromFirstSet();
            }
        ).then(
            function() {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.buyItemDirectly();
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.pickShipType(shiptype);
            }
        ).then(
            function(shoppingCart) {
                return shoppingCart.goCheckout();
            }
        ).then(
            function(orderConfirm) {
                world.stand = orderConfirm;
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // I can get orderId
    Then(/I can get orderId/, function(next) {
        expect(this.orderId, 'checkout flow fail').to.exist;
        next();
    });

    // order must be ready
    Then(/order must be ready/, function(next) {
        expect(this.orderId, 'checkout flow fail').to.exist;
        browser.params.orderId = this.orderId;
        next();
    });    

    // I can get upper item's merchandise id
    Then(/I can get upper item's merchandise id/, function(next) {
        // expect(browser.params.shadow.ITEM.buyNow.basic.mid, 'mid doesn\'t exist').to.exist;
        expect(this.itemId, 'mid doesn\'t exist').to.exist;
        next();
    });

    // offshelf the upper item must success
    Then(/offshelf the upper item must success/, function(next) {
        var world = this, listMerchandise = require(__base + constants.PO.listMerchandise), itemId;

        itemId = world.itemQueue[world.itemQueue.length-1];

        listMerchandise = new listMerchandise();
        this.stand = listMerchandise;

        listMerchandise.go().then(
            function(listMerchandise) {
                return listMerchandise.pickSearchType('mid');
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.goSearch(itemId);
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                expect(amount, 'search result error').to.be.at.least(1);
            }
        ).then(
            function() {
                return listMerchandise.offshelfFirstRowItem();
            }
        ).then(
            function(flag) {
                expect(flag, 'offshelf the first item fail').to.be.true;
            }
        ).then(next, next);
    });

    // offshelf the basic bidding item must success
    Then(/offshelf the basic bidding item must success/, function(next) {
        var world = this, listMerchandise = require(__base + constants.PO.listMerchandise), itemId;

        itemId = browser.params.shadow.ITEM.bidding.basic.mid;
        browser.params.shadow.ITEM.bidding.basic = null;

        listMerchandise = new listMerchandise();
        this.stand = listMerchandise;

        listMerchandise.go().then(
            function(listMerchandise) {
                return listMerchandise.pickSearchType('mid');
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.goSearch(itemId);
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                expect(amount, 'search result error').to.be.at.least(1);
            }
        ).then(
            function() {
                return listMerchandise.offshelfFirstRowItem();
            }
        ).then(
            function(flag) {
                expect(flag, 'offshelf the first item fail').to.be.true;
            }
        ).then(next, next);
    });


    // offshelf the basic multi-spec item must success
    Then(/offshelf the basic multi-spec item must success/, function(next) {
        var world = this, listMerchandise = require(__base + constants.PO.listMerchandise), itemId;

        itemId = browser.params.shadow.ITEM.buyNow.basic.mid;
        browser.params.shadow.ITEM.buyNow.basic = null;

        listMerchandise = new listMerchandise();
        this.stand = listMerchandise;

        listMerchandise.go().then(
            function(listMerchandise) {
                return listMerchandise.pickSearchType('mid');
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.goSearch(itemId);
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                expect(amount, 'search result error').to.be.at.least(1);
            }
        ).then(
            function() {
                return listMerchandise.offshelfFirstRowItem();
            }
        ).then(
            function(flag) {
                expect(flag, 'offshelf the first item fail').to.be.true;
            }
        ).then(next, next);
    });

    // offshelf the first row item must success
    Then(/offshelf the first row item must success/, function(next) {
        //listMerchandise
        this.stand.offshelfFirstRowItem().then(
            function(flag) {
                expect(flag, 'offshelf the first item fail').to.be.true;
            }
        ).then(next, next);
    });

    // onshelf the first row item must success
    Then(/onshelf the first row item must success/, function(next) {
        //listMerchandise
        this.stand.onshelfFirstRowItem().then(
            function(flag) {
                expect(flag, 'onshelf the first item fail').to.be.true;
            }
        ).then(next, next);
    });

    // add to shopping cart function must correct
    Then(/add to shopping cart function must correct/, function(next) {
        var world = this, shoppingCart = require(__base + constants.PO.shoppingCart), itemId;

        itemId = this.testData.mid;

        //itemPage
        this.stand.pickSpecFromFirstSet().then(
            function(itemPage) {
                return itemPage.pickSpecFromSecondSet();
            }
        ).then(
            function(itemPage) {
                return itemPage.selectItemAmount(1);
            }
        ).then(
            function(itemPage) {
                return itemPage.goAddToCart();
            }
        ).then(
            function(itemPage) {
                shoppingCart = new shoppingCart();
                return shoppingCart.go().then(
                    function(shoppingCart) {
                        return shoppingCart.isItemInCart(itemId);
                    }
                );
            }
        ).then(
            function(flag) {
                // console.log(flag)
                expect(flag, 'Add to cart fail').to.be.true;
            }
        ).then(next, next);
    });

};
module.exports = flow;