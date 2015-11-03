var selectType, com_navigation;

selectType = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'selectType';
    this.data.url = constants.URL_MAP.merchandise_select_type;

    this.selector = {
        general: '.submit-type-list .general input[type=submit]',
        lazyLoads: 'img[data-lazyload]'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
selectType.prototype = Object.create(PageObject.prototype);

selectType.prototype.go = function() {
    var stand = this;
    return browser.get(this.data.url).then(
        function() {
            browser.wait(
                function() {
                    return stand.all('lazyLoads').count().then(
                        function(amount) {
                            return amount == 0;
                        }
                    );
                }
            , 5000);
        }
    ).thenCatch(
        function(err) {
            //err catch
        }
    ).then(
        function() {
            return stand;
        }
    );
};

selectType.prototype.generalSubmit = function() {
    var stand = this, selectCategory = require(__base + constants.PO.selectCategory);

    return this.clickAndWaitUntilRedirect('general').then(
        function() {
            //return selectCategory
            return new selectCategory();
        }
    );
};

module.exports = selectType;