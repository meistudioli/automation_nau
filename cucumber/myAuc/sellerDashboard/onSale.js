var onSale = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ When -------------------------*/

    // I click seller dashboard tab - "on sale item"
    When(/I click seller dashboard tab - "([^"]*)"/, function(key, next) {
        this.stand.sellerDashboardTabSwitch(key).then(next, next);
    });

    // I filter item by "bidding"
    When(/I filter item by "([^"]*)"/, function(type, next) {
        var type = type.toLowerCase();
        if (['all', 'bidding', 'buynow'].indexOf(type) == -1) type = 'all';

        //listMerchandise
        this.stand.filterItemBy(type).then(
            function(listMerchandise) {
                next();
            },
            function() {
                next();
            }
        );
    });

    // I sort item by "上架時間新到舊"
    When(/^I sort item by "([^"]*)"$/, function(sortType, next) {
        //listMerchandise
        this.stand.sortItemBy(sortType).then(
            function(listMerchandise) {
                //listMerchandise
            }
        ).thenCatch(
            function() {
                throw new Error('sort item fail');
                next.fail();
            }
        ).then(next, next);
    });

    // I filter item Qna by time - "最近1個月"
    When(/I filter item Qna by time - "([^"]*)"/, function(type, next) {
        //itemQnaListSeller || itemQnaListBuyer
        this.stand.filterByTimeRange(type).then(
            function(itemQnaList) {
                next();
            },
            function() {
                next();
            }
        );
    });

    // I sort item Qna by "最近發問時間"
    When(/I sort item Qna by "([^"]*)"/, function(type, next) {
        //itemQnaListSeller
        this.stand.sortBy(type).then(
            function(itemQnaListSeller) {
                next();
            },
            function() {
                next();
            }
        );
    });


    /*------------------------ Then -------------------------*/

    // I can get total cvs order amount
    Then(/I can get total cvs order amount/, function(next) {
        var world = this, stand = this.stand;
        
        world.request = 0;

        stand.filterOrderByPayType('family').then(
            function(orderList) {
                return orderList.filterOrderByTimeRange('最近1個月');
            }
        ).then(
            function(orderList) {
                return orderList.filterOrderByShipType('尚未出貨');
            }
        ).then(
            function(orderList) {
                return orderList.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                world.request += amount;
                return stand.filterOrderByPayType('seven');
            }
        ).then(
            function(orderList) {
               return  orderList.filterOrderByTimeRange('最近1個月');
            }
        ).then(
            function(orderList) {
                return orderList.filterOrderByShipType('尚未出貨');
            }
        ).then(
            function(orderList) {
                return orderList.getSearchResultAmount();
            }
        ).then(
            function(amount) {
                world.request += amount;
                // console.log('final: '+world.request);
            }
        ).then(next, next);
    });

    // I can get total item amount
    Then(/I can get total item amount/, function(next) {
        var world = this;
        //listMerchandise
        this.stand.getSearchResultAmount().then(
            function(amount) {
                world.request = amount;
            }
        ).then(next, next);
    });

    // I can get seller dashboard tab - "on sale item"'s info
    Then(/^I can get seller dashboard tab - "([^"]*)"'s amount info$/, function(key, next) {
        var world = this;
        //myAuc
        this.stand.getSellerDashboardTabAmountInfo(key).then(
            function(amount) {
                // console.log(amount);
                world.result = amount;
            }
        ).then(next, next);
    });

    // the upper amount infos must equal each other
    Then(/^the upper (.*) infos must equal each other$/, function(key, next) {
        expect(this.result, 'data match error').to.eq(this.request);
        next();
    });

    // I can get seller dashboard tab - on sale item's "bidding" item amount info
    Then(/I can get seller dashboard tab - on sale item's "([^"]*)" item amount info/, function(key, next) {
        var world = this;
        //myAuc
        this.stand.getSellerDashboardOnSaleItemAmount(key).then(
            function(amount) {
                world.result = amount;
            }
        ).then(next, next);
    });

    // I can get seller dashboard tab - cvs order's order amount info 
    Then(/I can get seller dashboard tab - cvs order's order amount info/, function(next) {
        var world = this;
        //myAuc
        this.stand.getSellerDashboardCVSOrderAmount().then(
            function(amount) {
                world.result = amount;
            }
        ).then(next, next);
    });    

    // I can get seller dashboard tab - "on sale item"'s listing order
    Then(/I can get seller dashboard tab - "([^"]*)"'s listing order$/, function(key, next) {
        var world = this;
        //myAuc
        this.stand.getSellerDashboardListingOrder(key).then(
            function(list) {
                world.result = list;
            }
        ).then(next, next);
    });

    // I can get current item listing
    Then(/I can get current item listing/, function(next) {
        var world = this;
        //listMerchandise
        this.stand.getCurrentItemList().then(
            function(list) {
                world.request = list;
            }
        ).thenCatch(
            function() {
                throw new Error('get item list fail');
                next.fail();
            }
        ).then(next, next);
    });

    // I can get current item Qna listing
    Then(/I can get current item Qna listing/, function(next) {
        var world = this;
        //itemQnaListSeller || itemQnaListBuyer
        this.stand.getCurrentQnaList().then(
            function(list) {
                world.request = list;
            }
        ).thenCatch(
            function(err) {
                throw new Error('get qna list fail');
                next.fail();
            }
        ).then(next, next);
    });


    // the upper listings must equal each other
    Then(/the upper listings must equal each other/, function(next) {
        var request = this.request, result = this.result;
        // console.log(request);
        // console.log(result);
        expect(result, 'data match error').to.eql(request.slice(0, result.length));
        next();
    });
};
module.exports = onSale;