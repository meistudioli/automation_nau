var itemPageBuyNow = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/

    Given(/^I bidMax this item$/, function(next) {
        var clear, itemPage, PO, biddings, buyerId, world;

        clear = common.getTestData('item', ['ITEM', 'buyNow', 'clear']);
        PO = require(__base + constants.PO.itemPage);
        itemPage = new PO(clear.mid);
        biddings = this.testData;
        buyerId = this.userId;
        world = this;

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
                itemPage = new PO(biddings.mid);
                world.stand = itemPage;
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.goBidMax();
            }
        ).then(
            function(shoppingCart) {
                //do nothing
            }
        ).thenCatch(
            function(err) {
                // console.log(err)
                throw new Error('bidMax item fail');
                next.fail();
            }
        ).then(next, next);
    });

    Given(/^I bid and won this item$/, function(next) {
        var clear, itemPage, PO, biddings, buyerId, world;

        clear = common.getTestData('item', ['ITEM', 'buyNow', 'clear']);
        PO = require(__base + constants.PO.itemPage);
        itemPage = new PO(clear.mid);
        biddings = this.testData;
        buyerId = this.userId;
        world = this;

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
                itemPage = new PO(biddings.mid);
                world.stand = itemPage;
                return itemPage.go();
            }
        ).then(
            function(itemPage) {
                return itemPage.pickBidType('direct');
            }
        ).then(
            function(itemPage) {
                return itemPage.goBid(biddings.startPrice*2);
            }
        ).then(
            function(itemPage) {
                //switch to seller
                itemPage.login(biddings.owner);
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
                        return listMerchandise.goSearch(biddings.mid);
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
                console.log(err)
                throw new Error('bid & won item fail');
                next.fail();
            }
        ).then(next, next);
    });


    /*------------------------ When -------------------------*/

    //I bid as price - "10"
    When(/I bid as price - "(\d+)"/, function(price, next) {
        this.stand.bidAs(price).then(
            function(itemPage) {
                //do nothing
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    Then(/^item description\(bidding\) must match request data$/, function(next) {
        var request = this.testData.itemDesc;

        this.stand.getItemDescBidding().then(
            function(result) {
                expect(request, 'request data missing').not.to.be.undefined;
                expect(result, 'data match error').to.be.eq(request);
            }
        ).then(next, next);
    });

    // offshelf the clear cart item must success
    Then(/offshelf the clear cart item must success/, function(next) {
        var world = this, listMerchandise = require(__base + constants.PO.listMerchandise), clear;

        clear = common.getTestData('item', ['ITEM', 'buyNow', 'clear']);
        browser.params.shadow.ITEM.buyNow.clear = null;

        listMerchandise = new listMerchandise();
        this.stand = listMerchandise;

        listMerchandise.go().then(
            function(listMerchandise) {
                return listMerchandise.pickSearchType('mid');
            }
        ).then(
            function(listMerchandise) {
                return listMerchandise.goSearch(clear.mid);
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

};
module.exports = itemPageBuyNow;