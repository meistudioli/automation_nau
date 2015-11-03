var itemQnaDetailSeller;

itemQnaDetailSeller = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'itemQnaDetailSeller';

    this.selector = {
    	comment: 'textarea[name="comment"]',
    	btnSubmit: '.confirm',
    	answers: '.answer'
    };

};
itemQnaDetailSeller.prototype = Object.create(PageObject.prototype);

itemQnaDetailSeller.prototype.reply = function(answer) {
	var stand = this, flag = true;
	
	return this.all('answers').count().then(
		function(amount) {
			stand.one('comment').clear().sendKeys(answer).then(
				function() {
					stand.one('btnSubmit').click().then(
						function() {
							browser.wait(
								function() {
									return stand.all('answers').count().then(
										function(result) {
											return result != amount;
										}
									);
								}
							, constants.TIMEOUT);
						}
					)
				}
			);
		}
	).thenCatch(
		function(err) {
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

module.exports = itemQnaDetailSeller;