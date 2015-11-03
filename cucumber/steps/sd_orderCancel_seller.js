var orderCancelSeller = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/


    /*------------------------ When -------------------------*/

    // I cancel order by reason - "其他"
    When(/I cancel order by reason - "([^"]*)"/, function(reason, next) {
    	this.stand.pickCancelReasonAs(reason).then(
    		function(flag) {
    			expect(flag, 'pick cancel reason error').to.be.true;
    		}
    	).then(next, next);
    });

    // I filled reason with "賣家取消訂單"
    When(/I filled reason with "([^"]*)"/, function(reason, next) {
    	browser.params.cancelReason = reason;
    	this.stand.filledReasonWith(reason).then(
    		function(stand) {
    			//orderCancelSeller
    		}
    	).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // I confirm cancel order must correct
    Then(/^I confirm cancel order must correct$/, function(next) {
    	var world = this;
    	this.stand.confirmCancel().then(
    		function(flag) {
    			expect(flag, 'confirm cancel status').to.not.be.undefined;
    			expect(flag, 'confirm cancel status').to.be.true;
    		}
    	).then(next, next);
    });
};
module.exports = orderCancelSeller;