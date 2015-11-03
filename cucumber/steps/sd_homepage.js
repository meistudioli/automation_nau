var homepage = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/


    /*------------------------ Then -------------------------*/

    //expand detail function must correct
    Then(/^expand detail function must correct$/, function(next) {
        this.stand.rolloverFor('RecommandationDetail', 'Recommandationfirstitem').then(
            function(flag) {
                expect(flag, 'expand detail function fail').to.be.true;
            }
        ).then(next, next);
    });

};
module.exports = homepage;