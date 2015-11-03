var commonStepDefinition = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/

    // I login as "buyer_general"
    Given(/I login as "([^"]*)"/, function(userId, next) {
    	var world = this;

    	this.stand = new PageObject();
    	this.stand.login(userId).then(
    		function() {
    			world.userId = userId;
    		}
    	).then(next, next);
    });

    // I pass "seller_prod_b2c" DID
    Given(/^I pass "([^"]*)" DID$/, function(userId, next) {
        next();
        // var did = require(__base + constants.PO.did);
        // did = new did();

        // did.go().then(
        // 	function(stand) {
        // 		stand.pass(userId);
        // 	}
        // ).then(next, next);
    });

    // I visit "myAuction"
    Given(/I visit "([^"]*)"/, function(type, next) {
        var stand, param, type = type.replace(/\s/g, '');
        switch(true) {
            case (/^homepage/i.test(type)):
                stand = require(__base + constants.PO.homepage);
                break;
            case (/^itempage/i.test(type)):
                stand = require(__base + constants.PO.itemPage);
                if (/(.*)-(.*)-(.*)/.test(type)) {
                    param = type.replace(/^itempage/i, 'ITEM').split('-');
                    this.testData = common.getTestData('item', param);//testData plug
                    param = this.testData.mid;
                }//end if
                break;
            case (/^myauc/i.test(type)):
                stand = require(__base + constants.PO.myAuc);
                break;
            case (/^itemmanagement/i.test(type)):
                stand = require(__base + constants.PO.listMerchandise);
                break;
            case (/^orderlist\(seller\)/i.test(type)):
                //I visit "orderList(Seller)"
                stand = require(__base + constants.PO.orderListSeller);
                this.testData = common.getTestData('orderListSeller');//testData plug
                break;
            case (/^orderlist\(buyer\)/i.test(type)):
                stand = require(__base + constants.PO.orderListBuyer);
                break;
            case (/^itemqnalist\(seller/i.test(type)):
                stand = require(__base + constants.PO.itemQnaListSeller);
                break;
            case (/^itemqnalist\(buyer/i.test(type)):
                stand = require(__base + constants.PO.itemQnaListBuyer);
                break;
            case (/^booth/.test(type)):
                stand = require(__base + constants.PO.booth);
                this.testData = common.getTestData('boothSRP');//testData plug
                param = constants.USERS[type.replace(/^booth-(.*)/, '$1')].ecid;
                break;
        }//end switch

        stand = new stand(param);
        this.stand = stand;

        stand.go().then(
            function() {
                next();
            },
            function() {
                next();
            }
        );
    });

    // I have already in "codDeliver"
    Given(/I have already in "([^"]*)"/, function(type, next) {
        var stand, param, type = type.replace(/\s/g, '');
        switch(true) {
            case (/^codDeliver/i.test(type)):
                stand = require(__base + constants.PO.codDeliver);
                this.testData = common.getTestData('codDeliver');//testData plug
                break;
            case (/^orderDetailSeller/i.test(type)):
                stand = require(__base + constants.PO.orderDetailSeller);
                break;
            case (/^codMultiDeliver/i.test(type)):
                stand = require(__base + constants.PO.codMultiDeliver);
                this.testData = common.getTestData('codMultiDeliver');//testData plug
                break;
        }//end switch

        stand = new stand(param);
        this.stand = stand;

        stand.go().then(
            function() {
                next();
            },
            function() {
                next();
            }
        );
    });

    // All item has been mutant "off"
    Given(/All item has been mutant "([^"]*)"/, function(mode, next) {
        var mode = (['on', 'off'].indexOf(mode) == -1) ? 'on' : mode;
        mutant.mutate(mode, true).then(next, next);
    });

    // switch to dummy page - "https://devnet020-vm6.corp.sg3.yahoo.com/Thor/item/itemPage?debug_item_detail=detailData4Videotumblr.json"
    Given(/switch to dummy page - "([^"]*)"/, function(path, next) {
        browser.get(path).then(next);
    });

    /*------------------------ When ---------------------- --*/

    // I roll to "footer"
    When(/I roll to "([^"]*)"/, function(key, next) {
        this.stand.rollTo(key).then(next, next);
    });


    // I create a "buynow" item
    When(/^I create a "([^"]*)" item$/, function(type, dataObj, next) {
        var selectType = require(__base + constants.PO.selectType), data, type, payType, shipFee, itemLocation, world = this;

        data = dataObj.hashes()[0];
        if (typeof this.owners == 'undefined') this.owners = {};

        //itemLocation
        if (typeof data.itemLocation == 'undefined') itemLocation = '台北市';
        else {
            itemLocation = data.itemLocation;
            delete(data.itemLocation);
        }//end if        

        //payType
        if (typeof data.payType == 'undefined') payType = 'srm';
        else {
            payType = data.payType.toLowerCase();
            delete(data.payType);
        }//end if

        //shipFee
        if (typeof data.shipFee == 'undefined') shipFee = 100;
        else {
            shipFee = data.shipFee;
            if (parseInt(shipFee, 10) != shipFee) shipFee = 100;
            delete(data.shipFee);
        }//end if

        //startPrice
        if (typeof data.startPrice != 'undefined') this.startPrice = Number(data.startPrice);

        selectType = new selectType();
        this.stand = selectType;

        selectType.go().then(
            function(stand) {
                return stand.generalSubmit();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.selectItemType(type);
            }
        ).then(
            function(selectCategory) {
                return selectCategory.selectNewCategory();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.pickCategoryDirectly();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.goNext();
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillRequestData(data);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.imageUpload();
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillBasicAttribute();
            }
        ).then(
            function(singleEdit) {
                return singleEdit.pickLocation(itemLocation);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillSingleShipping(payType, shipFee);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.goNext();
            }
        ).then(
            function(itemPreview) {
                return itemPreview.goSubmit();
            }
        ).then(
            function(submitSuccess) {
                return submitSuccess.getItemId();
            }
        ).then(
            function(itemId) {
                if (typeof world.itemQueue == 'undefined') world.itemQueue = [];
                world.owners['m'+itemId] = world.userId;
                world.itemQueue.push(itemId);
                // console.log(itemId);
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // search result must have more than "1" record 
    Then(/search result must have more than "(\d+)" record/, function(amount, next) {
        var request = Number(amount);
        //listMerchandise || boothSearch
        this.stand.getSearchResultAmount().then(
            function(amount) {
                expect(amount, 'search result error').to.be.at.least(request);
            }
        ).then(next, next);
    });

    // booth search result must exactly be "0"
    Then(/search result must exactly be "(\d+)"/, function(amount, next) {
        var request = Number(amount);
        //listMerchandise || boothSearch
        this.stand.getSearchResultAmount().then(
            function(amount) {
                expect(amount, 'search result error').to.be.eq(request);
            }
        ).then(next, next);
    });    

    // "each favoritestore thumbnail" amount must exactly be "3" pieces
    Then(/"([^"]*)" amount must exactly be "(\d+)"/, function(key, request, next) {
        this.stand.getAmount(key).then(
            function(amount) {
                expect(amount, 'element amount error').to.be.eq(Number(request));
            }
        ).then(next, next);
    });

    // "item title" must match request data
    Then(/^"([^"]*)" must match request data/, function(key, next) {
        var world = this;
        this.stand.getContentAndRequestKey(key).then(
            function(data) {
                var request = world.testData[data.request];
                expect(request, 'request data missing').not.to.be.undefined;
                if (typeof data.result != typeof request) {
                    if (typeof data.result == 'string') request = request.toString();
                    if (typeof data.result == 'number') request = Number(request);
                }//end if
                expect(data.result, 'data match error').to.eq(request);
            }
        ).then(next, next);
    });

    // "emailInfo" must exist
    Then(/"([^"]*)" must exist/, function(key, next) {
        this.stand.isExist(key).then(
            function(flag) {
                expect(flag, key+' missing').to.be.true;
            }
        ).then(next, next);
    });

    // "emailInfo" must not exist
    Then(/"([^"]*)" must not exist/, function(key, next) {
        this.stand.isExist(key).then(
            function(flag) {
                expect(!flag, key+' exist').to.be.true;
            }
        ).then(next, next);
    });

    // "emailInfo" redirect function must correct
    Then(/^"([^"]*)" redirect function must correct$/, function(key, next) {
        this.stand.redirect(key, key, this.userId).then(
            function(flag) {
                expect(flag, 'redirect result error').to.be.true;
            }
        ).then(next, next);
    });

    // "positive rating" must have content 
    Then(/"([^"]*)" must have content/, function(key, next) {
        this.stand.one(key).getInnerHtml().then(
            function(html) {
                // console.log('html: '+html);
                expect(html, key + "'s content is empty").to.not.be.empty;
            },
            function() {
                expect(false, key+' missing').to.be.true;
            }
        ).then(next, next);
    });

    // "positive rating" content must empty 
    Then(/"([^"]*)" content must empty/, function(key, next) {
        this.stand.one(key).getInnerHtml().then(
            function(html) {
                // console.log('html: '+html);
                expect(html, key + "'s content is not empty").to.be.empty;
            },
            function() {
                expect(true, key+' is missing').to.be.true;
            }
        ).then(next, next);
    });

    // header must exist
    Then(/^header must exist$/, function(next) {
        var header = this.stand.header.one('header');
        this.stand.isExist(header).then(
            function(flag) {
                expect(flag, 'header missing').to.be.true;
            }
        ).then(next, next);
    });

    // footer must exist
    Then(/^footer must exist$/, function(next) {
        var footer = this.stand.footer.one('footer');
        this.stand.isExist(footer).then(
            function(flag) {
                expect(flag, 'footer missing').to.be.true;
            }
        ).then(next, next);
    });


    // I make a quiz with content - "買家 "buyer_general" 發問"
    Then(/I make a quiz with content - "(.*)"/, function(content, next) {
        var world = this;
        //itemPage
        this.stand.pickNavigationAs('qna').then(
            function(itemPage) {
                return itemPage.fillQuiz(content);
            }
        ).then(
            function(itemPage) {
                return itemPage.fillCaptcha();
            }
        ).then(
            function(itemPage) {
                return itemPage.goQuizSubmit();
            }
        ).then(
            function(flag) {
                expect(flag, 'Make Quiz fail').to.be.true;
                //registerDestruction
                common.registerDestruction(world.testData.owner, 'quiz', world.testData.mid);
            }
        ).then(next, next);
    });
};

module.exports = commonStepDefinition;