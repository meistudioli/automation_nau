var shoppingCart;

shoppingCart = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'shoppingCart';
    this.data.url = constants.URL_MAP.cart_list;

    this.selector = {
        cartList: 'body.cart-list',
        normalItem: '.all-item-wrap .normal-list .item',
        undoItem: '.all-item-wrap .normal-list .item.undo-list',
        btnCheckout: '#cart-list-submit .button-submit',
        dialog: '.msg-dialog-wrap.yui3-panel-focused',
        dialogConfirm: '.msg-dialog-wrap.yui3-panel-focused .button-primary',
        itemLink: '.item-name a',
        disableItem: '.all-item-wrap .disabled-list:not(.no-shiprule-list) .item',
        btnDelete: 'button.button-delete',
        shipType: 'select.ship-type'
    };
};
shoppingCart.prototype = Object.create(PageObject.prototype);

shoppingCart.prototype.clearOItem = function() {
    var stand = this;

    return this.all('normalItem').each(
        function(item) {
            item.$(stand.selector.btnDelete).isPresent().then(
                function(flag) {
                    if (!flag) return;
                    item.$(stand.selector.btnDelete).click().then(
                        function() {
                            stand.waitUntilPresent('dialog').then(
                                function() {
                                    stand.one('dialogConfirm').click();
                                },
                                function() {
                                    //error catch
                                }
                            , 200);
                        }
                    ).then(
                        function() {
                            browser.wait(
                                function() {
                                    return item.getAttribute('className').then(
                                        function(className) {
                                            return /undo-list/.test(className);
                                        }
                                    );
                                }
                            , constants.TIMEOUT);
                        }
                    );
                }
            );
        }
    ).then(
        function() {
            stand.all('disableItem').each(
                function(item) {
                    item.$(stand.selector.btnDelete).isPresent().then(
                        function(flag) {
                            if (!flag) return;
                            item.$(stand.selector.btnDelete).click().then(
                                function() {
                                    stand.waitUntilPresent('dialog').then(
                                        function() {
                                            stand.one('dialogConfirm').click();
                                        },
                                        function() {
                                            //error catch
                                        }
                                    , 200);
                                }
                            ).then(
                                function() {
                                    browser.wait(
                                        function() {
                                            return item.getAttribute('className').then(
                                                function(className) {
                                                    return /undo-list/.test(className);
                                                }
                                            );
                                        }
                                    , constants.TIMEOUT);
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};

shoppingCart.prototype.pickShipType = function(type) {
    var stand = this, mapping, key;
    mapping = {
        'shipTypeSrm': '.srm',
        'shipType711': '.s7c',
        'shipTypeFamily': '.sfc',
        'shipTypeCod': '.spc',
        'shipTypeFace2Face': '.sff_sg'
    };
    key = mapping['shipType' + common.capitalize(type)];
    console.log('pickShipType: '+key)

    return this.one('shipType').getAttribute('value').then(
        function(value) {
            if (value == key) return;
            stand.one('shipType').$$('option').each(
                function(opt) {
                    opt.getAttribute('value').then(
                        function(value) {
                            if (value != key) return;
                            stand.clickAndWaitUntilRedirect(opt);
                        }
                    );
                }
            );
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

shoppingCart.prototype.goCheckout = function() {
    var stand = this, orderConfirm = require(__base + constants.PO.orderConfirm);

    return this.clickAndWaitUntilRedirect('btnCheckout').then(
        function() {
            return new orderConfirm();
        }
    );
};

shoppingCart.prototype.isItemInCart = function(itemId) {
    var stand = this, list = [];
    return this.all('normalItem').each(
        function(unit) {
            return stand.one(stand.selector.itemLink).getAttribute('href').then(
                function(link) {
                    list.push(link.replace(/.*\/item\/.*-(\d+)/, '$1'));
                },
                function() {
                    //error catch
                }
            );
        }
    ).then(
        function() {
            return (list.indexOf(itemId) == -1) ? false : true;
        }
    );
};

module.exports = shoppingCart;