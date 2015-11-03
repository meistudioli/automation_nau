var orderListBuyer = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/


    /*------------------------ Then -------------------------*/

    //rate seller as "正評+1" must correct
    Then(/^rate seller as "([^"]*)" must correct$/, function(key, next) {
        var stand = this.stand, world = this, operate, PO;

        operate = '我要給評';
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
                        PO = require(__base + constants.PO.ratingBuyer);
                        return new PO();
                    }
                );
            }
        ).then(
            function(ratingBuyer) {
                ratingBuyer.rateAs(key).then(
                    function() {
                        ratingBuyer.fillCommentWith('收到商品了, 謝謝您的熱心服務');
                    }
                ).then(
                    function() {
                        ratingBuyer.confirm().then(
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
module.exports = orderListBuyer;