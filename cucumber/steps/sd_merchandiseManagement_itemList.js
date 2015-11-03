var merchandiseManagement = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/

    // I filter item by status - "onshelf"
    When(/^I filter item by status - "([^"]*)"$/, function(type, next) {
        //listMerchandise
        this.stand.filterByStatus(type).then(
            function(listMerchandise) {
                next();
            },
            function() {
                next();
            }
        );
    });

    // I search item as "buyNow - basic"'s id
    When(/^I search item as "([^"]*)"'s id$/, function(key, next) {
        var param = key.replace(/\s/g, '').replace(/^item/i, 'ITEM').split('-'), key;
        param = common.getTestData('item', param);
        
        // param.mid = '100121995011';

        //listMerchandise
        this.stand.goSearch(param.mid).then(
            function(listMerchandise) {
                //do nothing
            }
        ).then(next, next);
    });

    // I pick all items
    When(/^I pick all items$/, function(next) {
        //listMerchandise
        this.stand.pickAllItems().then(
            function(listMerchandise) {
                //do nothing
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // modify item title as "mei title" must correct
    Then(/^modify item title as "([^"]*)" must correct$/, function(key, next) {
        var stand = this.stand, original, request = key;

        //listMerchandise
        this.stand.getFirstRowItemTitle().then(
            function(itemTitle) {
                expect(itemTitle, 'itemTitle missing').not.to.be.undefined;
                original = itemTitle;
            }
        ).then(
            function() {
                stand.modifyFirstRowTitle(request).then(
                    function(flag) {
                        expect(flag, 'title modify fail').to.be.true;
                    }
                );
            }
        ).then(
            function() {
                //recover
                stand.modifyFirstRowTitle(original).then(
                    function(flag) {
                        expect(flag, 'title recover fail').to.be.true;
                    }
                );
            }
        ).then(next, next);
    });

    // modify item price as "9999" must correct
    Then(/^modify item price as "([^"]*)" must correct$/, function(key, next) {
        var stand = this.stand, original, request = Number(key);

        //listMerchandise
        this.stand.getFirstRowItemPrice().then(
            function(itemPrice) {
                expect(itemPrice, 'itemPrice missing').not.to.be.undefined;
                original = itemPrice;
            }
        ).then(
            function() {
                stand.modifyFirstRowPrice(request).then(
                    function(flag) {
                        expect(flag, 'itemPrice modify fail').to.be.true;
                    }
                );
            }
        ).then(
            function() {
                //recover
                stand.modifyFirstRowPrice(original).then(
                    function(flag) {
                        expect(flag, 'itemPrice recover fail').to.be.true;
                    }
                );
            }
        ).then(next, next);
    });


    // modify item stock as "33" must correct
    Then(/^modify item stock as "([^"]*)" must correct$/, function(key, next) {
        // var stand, original, request;
        // stand = require(__base + constants.PO.listMerchandise);
        // stand = new stand();
        // this.stand = stand;
        // request = Number(key);
        var stand = this.stand, original, request = Number(key);

        //listMerchandise
        this.stand.getFirstRowItemStock().then(
            function(itemStock) {
                expect(itemStock, 'itemStock missing').not.to.be.undefined;
                original = itemStock;
            }
        ).then(
            function() {
                stand.modifyFirstRowStock(request).then(
                    function(flag) {
                        expect(flag, 'itemStock modify fail').to.be.true;
                    }
                );
            }
        ).then(
            function() {
                // recover
                stand.modifyFirstRowStock(original).then(
                    function(flag) {
                        expect(flag, 'itemStock modify fail').to.be.true;
                    }
                );
            }
        ).then(next, next);
    });



    // the first row item apply shipping-preference must success
    Then(/^the first row item apply shipping-preference must success$/, function(next) {
        //listMerchandise
        this.stand.applyShipPreference().then(
            function(flag) {
                expect(flag, 'apply ship-preference fail').to.be.true;
            }
        ).then(next, next);
    });
};
module.exports = merchandiseManagement;