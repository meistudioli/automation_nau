var selectCategory;

selectCategory = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'selectCategory';

    this.selector = {
        buynow: '.product-type .direct label',
        bidding: '.product-type .bid label',
        newCategory: '.option-list .new label',
        signFinish: '.icon-finished',
        btnNext: '.button-submit.button-main',
        lastSelect: '.styled-select:last-child',
        categoryDropdown: '.styled-select:last-child select.category-drop-down option:nth-child(2)'
    };
};
selectCategory.prototype = Object.create(PageObject.prototype);


selectCategory.prototype.selectItemType = function(type) {
	var stand = this, type = type.toLowerCase();
	if (['buynow', 'bidding'].indexOf(type.toLowerCase()) == -1) type = 'buynow';

	return this.one(type).click().then(
		function() {
			return stand;
		}
	);
};

selectCategory.prototype.selectNewCategory = function() {
	var stand = this;
	return this.one('newCategory').click().then(
		function() {
			return stand;
		}
	);
};

selectCategory.prototype.pickCategoryDirectly = function() {
	var stand = this, maxTimes = 6;
	return this.one('body').then(
		function() {
			for (var i=-1,l=maxTimes;++i<l;) stand.pickFirstOption();
			stand.one('signFinish').isPresent().then(
				function(flag) {
					if (!flag) throw new Error('selectCategory fail');
				}
			);
		}
	).then(
		function() {
			return stand;
		}
	)
};

selectCategory.prototype.pickFirstOption = function() {
	var stand = this;
	return this.one('signFinish').isPresent().then(
		function(flag) {
			if (!flag) {
				return stand.one('lastSelect').click().then(
					function() {
						return stand.one('categoryDropdown').click().then(
							function() {
								browser.actions().mouseDown().mouseUp().perform();
							}
						).then(
							function() {
								stand.waitUntilPresent('signFinish', 500);
							}
						).then(
							function() {
								return true;
							},
							function() {
								return false;
							}
						);
					}
				);
			}//end if
		}
	);
};

selectCategory.prototype.goNext = function() {
	var stand = this, singleEdit = require(__base+constants.PO.singleEdit);

	return this.clickAndWaitUntilRedirect('btnNext').then(
		function() {
			//singleEdit
			return new singleEdit();
		}
	);
};

module.exports = selectCategory;