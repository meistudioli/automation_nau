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
        var stand = this.stand;
        this.stand.isGalleryCarouselCorrect(key).then(
            function(flag) {
                expect(flag, 'magnifier function fail').to.be.true;
            }
        ).then(next, next);
    });

    // video function must correct
    Then(/^video function must correct$/, function(next) {
        var stand = this.stand;
        this.stand.isVideoCorrect().then(
            function(flag) {
                expect(flag, 'video function fail').to.be.true;
            }
        ).then(next, next);
    });
};
module.exports = itemPageBuyNow;