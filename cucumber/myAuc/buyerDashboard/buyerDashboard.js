var buyerDashboard = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ When -------------------------*/

    // I click buyer dashboard tab - "on sale item"
    When(/I click buyer dashboard tab - "([^"]*)"/, function(key, next) {
        this.stand.buyerDashboardTabSwitch(key).then(next, next);
    });

    // I filter item Qna by time - "最近1個月"
    When(/I filter item Qna by status - "([^"]*)"/, function(type, next) {
        //itemQnaListBuyer
        this.stand.filterByStatus(type).then(
            function(itemQnaList) {
                next();
            },
            function() {
                next();
            }
        );
    });

    /*------------------------ Then -------------------------*/

    // "BuyerDashboard List - item Qna - operation"'s content must be "未回覆"
    Then(/"([^"]*)"'s content must be "([^"]*)"/, function(type, request, next) {
        //myAuc
        this.stand.one(type).getInnerHtml().then(
            function(content) {
                return content.trim();
            },
            function() {
                return '';
            }
        ).then(
            function(result) {
                expect(result, 'result empty').not.to.be.empty;
                expect(result, 'data match error').to.eq(request.trim());
            }
        ).then(next, next);
    });

    // I can get buyer dashboard tab - "item Qna"'s listing order
    Then(/I can get buyer dashboard tab - "([^"]*)"'s listing order$/, function(key, next) {
        var world = this;
        //myAuc
        this.stand.getBuyerDashboardListingOrder(key).then(
            function(list) {
                world.result = list;
            }
        ).then(next, next);
    });

    // reply for "itemPage - buyNow - basic" quiz must correct
    Then(/reply for "([^"]*)" quiz must correct/, function(type, next) {
        var type = type.replace(/\s/g, ''),
            param = type.replace(/^itempage/i, 'ITEM').split('-'),
            itemId,
            world = this;

        itemId = common.getTestData('item', param).mid;
        // itemQnaListSeller
        this.stand.pickSearchType('mid').then(
            function(itemQnaListSeller) {
                return itemQnaListSeller.goSearch(itemId);
            }
        ).then(
            function(itemQnaListSeller) {
                return itemQnaListSeller.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                expect(amount, 'search result error').to.be.at.least(1);
            }
        ).then(
            function() {
                return world.stand.goReply();
            }
        ).then(
            function(itemQnaDetailSeller) {
                return itemQnaDetailSeller.reply('賣家 "' + world.userId + '" 回覆');
            }
        ).then(
            function(flag) {
                expect(flag, 'reply Quiz fail').to.be.true;
            }
        ).then(next, next);
    });

    // item has been added in watch list
    Then(/item has been added in watch list/, function(next) {
        var world = this;
        //itemPage
        this.stand.addWatchListForce().then(
            function() {
                var itemId = world.stand.data.url.replace(/.*\/item\/(\d+)/, '$1');
                //registerDestruction
                common.registerDestruction(world.userId, 'watchlist', itemId);
            },
            function() {
                throw new Error('Add to watch list fail');
                next.fail();
            }
        ).then(next, next);
    });

    // remove first watchList item must success
    Then(/remove first watchList item must success/, function(next) {
        //myAuc
        this.stand.removeWatchList().then(
            function(flag) {
                expect(flag, 'remove watchlist fail').to.be.true;
            }
        ).then(next, next);
    });    

    // seller has been added in favorite store list 
    Then(/seller has been added in favorite store list/, function(next) {
        var world = this;
        //itemPage
        this.stand.addFavoriteStoreForce().then(
            function() {
                var itemId = world.stand.data.url.replace(/.*\/item\/(\d+)/, '$1');
                //registerDestruction
                common.registerDestruction(world.userId, 'favoritestore', itemId);
            },
            function() {
                throw new Error('Add to favorite store list fail');
                next.fail();
            }
        ).then(next, next);
    });

    // remove first favoritestore must success
    Then(/remove first favoritestore must success/, function(next) {
        //myAuc
        this.stand.removeFavoritestore().then(
            function(flag) {
                expect(flag, 'remove favoritestore fail').to.be.true;
            }
        ).then(next, next);
    });

};
module.exports = buyerDashboard;