var itemPageBuyNow = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/


    /*------------------------ Then -------------------------*/

    // magnifier function must correct
    Then(/^magnifier function must correct$/, function(next) {
        var stand = this.stand;
        this.stand.isMagnifierCorrect().then(
            function(flag) {
                expect(flag, 'magnifier function fail').to.be.true;
            }  
        ).then(next, next);
    });

    // item gallery carousel function must correct after press spec - "超小"
    Then(/^item gallery carousel function must correct after press spec - "([^"]*)"$/, function(key, next) {
        //itemPage
        this.stand.isGalleryCarouselCorrect(key).then(
            function(flag) {
                expect(flag, 'magnifier function fail').to.be.true;
            }
        ).then(next, next);
    });

    // video function must correct
    Then(/^video function must correct$/, function(next) {
        //itemPage
        this.stand.isVideoCorrect().then(
            function(flag) {
                expect(flag, 'video function fail').to.be.true;
            }
        ).then(next, next);
    });


    //I bargain as price "5" must correct
    Then(/^I bargain as price "([^"]*)" must correct$/, function(key, next) {
        var world = this;
        //buyer on a bargain event
        browser.params.bargain = {
            price: key
        };

        //itemPage
        this.stand.originateBargain(key).then(
            function(request) {
                expect(request, 'originateBargain function fail').not.to.be.undefined;
                world.bargainId = request;
                browser.params.bargain.id = request;
                console.log('bargainId:'+browser.params.bargain.id);
            }
        ).then(next, next);
    });

    //I accept a specific bargain must correct
    Then(/^I accept a specific bargain must correct$/, function(next) {
        //itemPage
        this.stand.acceptBargain(browser.params.bargain).then(
            function(flag) {
                expect(flag, 'acceptBargain function fail').to.be.true;
                console.log('bargain event complete.');
            }
        ).then(next, next);

    });
};
module.exports = itemPageBuyNow;