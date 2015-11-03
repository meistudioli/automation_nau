var footer;

footer = function() {
	this.selector = {
        footer: '#ft footer,#yaufooter'
    };
};

footer.prototype = {
    one: PageObject.prototype.one,
    all: PageObject.prototype.all
};

module.exports = footer;