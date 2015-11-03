var submitSuccess;

submitSuccess = function() {
	PageObject.call(this); // call super constructor.

	this.data.id = 'submitSuccess';

    this.selector = {
        itemLink: '.submit-flow-set .value a'
    };
};
submitSuccess.prototype = Object.create(PageObject.prototype);

submitSuccess.prototype.getItemId = function() {
    return this.one('itemLink').getAttribute('href').then(
        function(link) {
            return link.replace(/https:\/\/.*\.bid\.yahoo\.com\/item\/(.*)/g, '$1');
        }
    );
};

module.exports = submitSuccess; 