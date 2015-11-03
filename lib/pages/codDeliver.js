var codDeliver;

codDeliver = function(itemId) {
	PageObject.call(this); // call super constructor.

	this.data.id = 'codDeliver';
    // this.data.url = constants.URL_MAP.my_auction;

    this.selector = {
        btnCancel: '.shipment-form-cvs .button-white',
        btnGroup: '.shipment-form-cvs .button-group',
        btnSubmit: '.shipment-form-cvs .button-main[name="shipment_confirm"]',
        genOrderBtnSubmit: '.shipment-form-common .button-main[name="shipment_confirm"]',
        navigationBar: '.navigation',
        breadcrumbBar: '.my-breadcrumb',
        shipmentDetail: '.shipment-form-cvs .shipment-detail',
        shipmentNotice: '.shipment-form-cvs .ship-notice',
        pageTitle: '.shipment-detail .hset',
        breadCrumb: '.my-breadcrumb span.func, .my-breadcrumb span[itemprop="title"]',
        title: '.order-detail-shipment h2',
        shipinfo: 'table .funcs',
        reciverinfo: '.shipment-address label:nth-child(2)',
        shipnotice: '.ship-notice h3'
    };
};
codDeliver.prototype = Object.create(PageObject.prototype);

codDeliver.prototype.confirmDelivery = function() {
    var stand = this, PO = require(__base + constants.PO.codDeliverResult);
    return this.one('btnSubmit').then(
        function(e) {
            stand.clickAndWaitUntilRedirect(e);
        }
    ).then(
        function() {
            return new PO();
        }
    );
};

codDeliver.prototype.getBreadCrumb = function() {
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

module.exports = codDeliver;