var orderListSeller = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/

    // I filter order by payType - "all"
    When(/^I filter order by payType - "([^"]*)"$/, function(type, next) {
        //orderListSeller
        this.stand.filterOrderByPayType(type).then(
            function(orderListSeller) {
                next();
            },
            function() {
                next();
            }
        );
    });

    // I search order as specific id
    When(/^I search order as specific id$/, function(next) {
        // browser.params.orderId = '10000499770573';
        // console.log(browser.params.orderId)

        //orderListSeller
        this.stand.goSearch(browser.params.orderId).then(
            function(orderListSeller) {
                //do nothing
            }
        ).then(next, next);
    });

    // I pick shiptype as "尚未出貨"
    When(/^I pick shiptype as "([^"]*)"$/, function(type, next) {
        //orderListSeller
        this.stand.filterOrderByShipType(type).then(
            function(orderListSeller) {
                //do nothing
            }
        ).then(next, next);
    });

    // I confirm delivery
    When(/^I confirm delivery$/, function(next) {
        var world = this;
        //codDeliver
        this.stand.confirmDelivery().then(
            function(codDeliverResult) {
                //do nothing
                world.stand = codDeliverResult;
            }
        ).then(next, next);
    });

    // I press view order detail
    When(/I press view order detail/, function(next) {
        //orderListSeller
        this.stand.clickAndWaitUntilRedirect('vieworderdetail').then(next, next);
    });

    // I expand the order detail
    When(/I expand the order detail/, function(next) {
        //codDeliverResult
        this.stand.expandOrderDetail().thenCatch(
            function(err) {
                console.log(err)
                throw new Error('expand the order detail fail');
                next.fail();
            }
        ).then(next, next);
    });

    // I pick all orders
    When(/I pick all orders/, function(next) {
        //orderListSeller
        this.stand.pickAllOrders().thenCatch(
            function(err) {
                console.log(err)
                throw new Error('pick All Orders fail.');
                next.fail();
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // COD item delivery - breadcrumb must match request data
    Then(/^COD item delivery - breadcrumb must match request data$/, function(next) {
        var request = new RegExp(this.testData.formats.breadcrumb);

        // codDeliver
        this.stand.getBreadCrumb().then(
            function(result) {
                expect(result, 'BreadCrumb is empty').to.not.be.empty;
                console.log(result)
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });

    // codMultiDeliver - breadcrumb must match request data
    Then(/^codMultiDeliver - breadcrumb must match request data$/, function(next) {
        var request = new RegExp(this.testData.formats.breadcrumb);

        // codDeliver
        this.stand.getBreadCrumb().then(
            function(result) {
                expect(result, 'BreadCrumb is empty').to.not.be.empty;
                console.log(result)
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });

    // COD item delivery - "title" must match request data
    Then(/^COD item delivery - "(.*)" must match request data$/, function(key, next) {
        var key = key.replace(/\s/g, ''), request = new RegExp(this.testData.formats[key.replace(/\s/g, '')]);

        this.stand.one(key).getInnerHtml().then(
            function(result) {
                console.log(result);
                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });

    // COD item delivery result - "result title" must match request data
    Then(/^COD item delivery result - "(.*)" must match request data$/, function(key, next) {
        var key = key.replace(/\s/g, ''), request = new RegExp(this.testData.formats[key.replace(/\s/g, '')]);

        this.stand.one(key).getInnerHtml().then(
            function(result) {
                result = result.replace(/\n/g, '');
                console.log(result);
                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });

    // orderList Seller - "order detail shipment info" must match request data
    Then(/^orderList Seller - "(.*)" must match request data$/, function(key, next) {
        var key = key.replace(/\s/g, ''), request = new RegExp(this.testData.formats[key.replace(/\s/g, '')]);

        this.stand.one(key).getInnerHtml().then(
            function(result) {
                result = result.replace(/\n/g, '');
                console.log(result);
                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });


    // CVS execute shipment must correct
    Then(/^CVS execute shipment must correct$/, function(next) {
        var stand = this.stand, world = this, operate, PO;

        operate = '執行出貨';
        //orderLisrSeller
        this.stand.getOperateAs(operate).then(
            function(link) {
                expect(link, 'opetate missing').to.not.be.undefined;
                return stand.redirect(link, operate).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                ).then(
                    function() {
                        PO = require(__base + constants.PO.cvsDeliver);
                        return new PO();
                    }
                );
            }
        ).then(
            function(cvsDeliver) {
                //cvsDeliver
                cvsDeliver.confirmDelivery().then(
                    function(cvsDeliverResult) {
                        cvsDeliverResult.getlogisticId().then(
                            function(logisticId) {
                                expect(logisticId, 'logisticId missing').to.not.be.undefined;
                                world.logisticId = logisticId;
                                // console.log('logisticId:'+logisticId);
                            }
                        );
                    }
                );
            }
        ).then(next, next);
    });


    // order operation - "執行出貨" redirect function must correct
    Then(/order operation - "([^"]*)" redirect function must correct/, function(operate, next) {
        var stand = this.stand, PO, world = this;
        this.stand.getOperateAs(operate).then(
            function(link) {
                expect(link, 'opetate missing').to.not.be.undefined;
                stand.redirect(link, operate).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                ).then(
                    function() {
                        switch (operate) {
                            case '取消訂單':
                                //order cancel
                                PO = require(__base + constants.PO.orderCancelSeller);
                                world.stand = new PO();
                                break;
                        }//end switch
                    }
                );
            }
        ).then(next, next);
    });

    // I can gather the 1st order's id
    Then(/I can gather the 1st order's id/, function(next) {
        var world = this;
        this.stand.get1stOrderId().then(
            function(orderID) {
                expect(orderID, 'Cant get orderID').to.not.be.empty;
                world.orderID = orderID;
                browser.params.orderId = orderID;
                // console.log('orderId: '+orderID)
            }
        ).then(next, next);
    });

    // I can get logistic id
    Then(/I can get logistic id/, function(next) {
        var world = this;
        //codDeliverResult
        this.stand.getlogisticId().then(
            function(logisticId) {
                expect(logisticId, 'Cant get logisticId').to.not.be.empty;
                world.logisticId = logisticId;
                // console.log('logisticId: '+logisticId)
            }
        ).then(next, next);
    });

    // batch operate - ship's options must match request data
    Then(/batch operate - ship's options must match request data/, function(next) {
        var request = this.testData.shipOptions;

        this.stand.getBatchOperateShipTxts().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                expect(result, 'ship\'s options match').to.be.eql(request);
            }
        ).then(next, next);
    });

    // cancel order with reason - "賣家取消訂單" must correct
    Then(/cancel order with reason - "([^"]*)" must correct/, function(reason, next) {
        var world = this, PO, operate = '取消訂單', stand;
        browser.params.cancelReason = reason;
        this.stand.getOperateAs(operate).then(
            function(link) {
                expect(link, 'opetate missing').to.not.be.undefined;
                return world.stand.redirect(link, operate).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                ).then(
                    function() {
                        PO = require(__base + constants.PO.orderCancelSeller);
                        world.stand = new PO();
                        return world.stand;
                    }
                );
            }
        ).then(
            function(stand) {
                //orderCancelSeller
                return stand.pickCancelReasonWith(reason).then(
                    function(flag) {
                        expect(flag, 'pick cancel reason error').to.be.true;
                    }
                ).then(
                    function() {
                        return stand;
                    }
                );
            }
        ).then(
            function(stand) {
                //orderCancelSeller
                stand.confirmCancel().then(
                    function(flag) {
                        expect(flag, 'confirm cancel status').to.not.be.undefined;
                        expect(flag, 'confirm cancel status').to.be.true;
                    }
                );
            }
        ).then(next, next);
    });

    //rate buyer as "正評+1" must correct 
    Then(/^rate buyer as "([^"]*)" must correct$/, function(key, next) {
        var stand = this.stand, world = this, operate, PO;

        operate = '給買家評價';
        //orderLisrSeller
        this.stand.getOperateAs(operate).then(
            function(link) {
                expect(link, 'opetate missing').to.not.be.undefined;
                return stand.redirect(link, operate).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                ).then(
                    function() {
                        PO = require(__base + constants.PO.ratingSeller);
                        return new PO();
                    }
                );
            }
        ).then(
            function(ratingSeller) {
                ratingSeller.rateAs(key).then(
                    function() {
                        ratingSeller.fillCommentWith('感謝你的購買，希望下次有機會能再為你服務');
                    }
                ).then(
                    function() {
                        ratingSeller.confirm().then(
                            function(flag) {
                                expect(flag, 'rating error').to.be.true;
                            }
                        );
                    }
                );
            }
        ).then(next, next);
    });

};
module.exports = orderListSeller;