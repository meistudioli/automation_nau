var codMultiDeliver;

codMultiDeliver = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'codMultiDeliver';

    this.selector = {
    	breadCrumb: '.my-breadcrumb span.func, .my-breadcrumb span[itemprop="title"]'
    };

};
codMultiDeliver.prototype = Object.create(PageObject.prototype);

codMultiDeliver.prototype.getBreadCrumb = function() {
    var breadcrumb = [];
    return this.all('breadCrumb').each(
        function(unit) {
            unit.getText().then(
                function(value) {
                    breadcrumb.push(value.trim());
                }
            );
        }
    ).then(
        function() {
            return breadcrumb.join('>');
        }
    );
};

module.exports = codMultiDeliver;