var itemPreview;

itemPreview = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'itemPreview';
    
    this.selector = {
        btnSubmit: '#submit-preview-confirm-button .button-main'
    };
};
itemPreview.prototype = Object.create(PageObject.prototype);

itemPreview.prototype.goSubmit = function() {
    var stand = this, submitSuccess = require(__base + constants.PO.submitSuccess);
    
    return this.detachWaitingDOMHandle().then(
        function() {
            return stand.clickAndWaitUntilRedirect('btnSubmit').then(
                function() {
                    return new submitSuccess();
                }
            );
        }
    );
};

module.exports = itemPreview;