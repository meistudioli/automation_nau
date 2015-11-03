var header;

header = function() {
	this.selector = {
        header: '#uh,#ygma,#ygma-slim'
    };
};

header.prototype = {
    one: PageObject.prototype.one,
    all: PageObject.prototype.all
};

module.exports = header;