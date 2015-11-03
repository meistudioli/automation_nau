var singleEdit;

singleEdit = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'singleEdit';
    
    this.attachment = {
        image: __base+'/attachment/yahoo.jpg'
    };

    this.selector = {
        itemTitle: 'input[name=itemTitle]',
        itemBrief: 'input[name=itemBrief]',
        salePrice: 'input[name=salePrice]',
        itemDesc: 'textarea[name=itemDesc]',
        itemLocation: 'select[name="itemLocation"]',
        hasPromotionPrice: '#hasPromotionPrice',
        promotePrice: '#promoPrice',
        durationDay: 'select[name="durationDay"]',
        customCategory: 'select[name="customCategory"]',
        reservePrice: 'input[name=reservePrice]',
        buynowPrice: 'input[name=buynowPrice]',
        startPrice: 'input[name=startPrice]',
        singleShipping: 'label[for=useItemRule]',
        totalQuantity: 'input[name=totalQuantity]',
        payTypeFamily: 'input[name=".pctc_famicvs"]',
        payType711: 'input[name=".pctc_711cvs"]',
        payTypeCod: 'input[name=".pctc_postOffice"]',
        payTypeCreditcard: 'input[name=".pctc_cc"]',
        payTypeCreditcardx3: 'input[name=".pctc_cc_3"]',
        payTypeCreditcardx6: 'input[name=".pctc_cc_6"]',
        firstShipType: '.new-shipping-setting .freight-list li:first-child select',
        firstShipfee: '.new-shipping-setting .freight-list li:first-child .freight input',
        illuTransWrap: '.illuTrans-wrap',
        illuTransInput: '.illuTrans-wrap input[type=file]',
        uploadData: '.illuTrans li:first-child .vanquish input',
        attributesInput: '.attributes-wrap input[type=text]',
        attributesSelect: '.attributes-wrap select',
        payTypeWrap: '.pay-type-wrap input[type=checkbox]:not([name=savePaytypePref])',
        btnSubmit: '#submit-edit-confirm-button input[type=submit]',
        barCode: 'input[name="barCode"]',
        itemNumber: 'input[name="itemNumber"]',
        illuTransUnit: '.illuTrans li:not(.active)',
        trigger4CreateSpec: '#create-specs',
        newSpecArea: '.specs-new',
        trigger4CustSpec: '.specs-new .button-customize-specs',
        specDel: '#specsSet .specs-manage .button-delete',
        sign4SpecEmpty: '#specsSet .specs-manage .spec-empty',
        trigger4AddNewSpec: '#specsSet .specs-manage .link-customize-specs',
        specAddSet: '#specsSet .specs-manage .spec-add',
        specKey: '#specsSet .specs-manage .spec-add input.new-name',
        newSpecValue: '#specsSet input.new-value, #specsSet input.input-spec-value',
        trigger4SpecAdd: '#specsSet button.button-add',
        trigger4SpecSave: '#specsSet .specs-manage .finish-wrap .button-s',
        trigger4SpecImgUpload: '#specImgFlag',
        sign4SpecImgUpload: '.spec-upload-auc.active',
        specImgUploadUnit: '.spec-upload .lists li:not(.active)',
        specImgUploadMain: '.spec-upload .main-img',
        specImgUploadInput: '.spec-upload .vanquish input[type="file"]',
        specQty: '.specs-qty-wrap table.show .col-qty .qty',
        specItemNumber: '.specs-qty-wrap table.show .col-number input',
        specBarCode: '.specs-qty-wrap table.show .col-bar-code input',
        speUploadSet: '.spec-upload-auc .spec-upload',
        specQtys: '.specs-qty-wrap table',
        specQtyShow: '.specs-qty-wrap table.show',
        addShipType: '.add-ship-type',
        shipTypeSet: '.new-shipping-setting .freight-list li',
        dialog: '.msg-dialog-wrap.yui3-panel-focused',
        dialogSubmit: '.msg-dialog-wrap.yui3-panel-focused input[type="submit"]',
        videoSet: 'input[name="videoSet"]',

        hasSpecFlag: '.single-qty-wrap.hidden',
        itemStock: 'input[name=totalQuantity]',
        specMenu: '.spec-menu',
        stepBarFixed: '.stepBar-wrap-fixed'
    };
};
singleEdit.prototype = Object.create(PageObject.prototype);

singleEdit.prototype.fillRequestData = function(data) {
    var stand = this;
    return this.one('body').then(
        function() {
            for (var i in data) {
                if (typeof stand.selector[i] == 'undefined') continue;
                stand.one(i).clear().sendKeys(data[i]);
            }//end for
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.imageUpload = function(amount) {
    var stand = this, amount = (typeof amount == 'undefined' || parseInt(amount, 10) != amount) ? 1 : Number(amount);
    if (amount > 9) amount = 9;

    return this.rollTo('illuTransWrap').then(
        function() {
            for (var i=-1,l=amount;++i<l;) {
                stand.one('illuTransUnit').then(
                    function(unit) {
                        stand.one('illuTransInput').sendKeys(stand.attachment.image).then(
                            function() {
                                browser.wait(
                                    function() {
                                        return unit.getAttribute('className').then(
                                            function(className) {
                                                return /active/.test(className);
                                            }
                                        );
                                    }
                                , constants.TIMEOUT);
                            }
                        );
                    }
                );
            }//end for
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.createSpecs = function(specs) {
    var stand = this;

    return this.one('trigger4CreateSpec').click().then(
        function() {
            stand.one('dialog').isPresent().then(
                function(flag) {
                    if (flag) stand.one('dialogSubmit').click();
                }
            );
        }
    ).then(
        function() {
            stand.waitUntilDisplay('newSpecArea');
        }
    ).then(
        function() {
            //prepare environment
            stand.one('trigger4CustSpec').click().then(
                function() {
                    stand.waitUntilPresent('specDel');
                }
            ).then(
                function() {
                    stand.one('specDel').click().then(
                        function() {
                            stand.waitUntilPresent('sign4SpecEmpty');
                        }
                    );
                }
            );
        }
    ).then(
        function() {
            specs.forEach(
                function(spec) {
                    var sv = spec.specValue;
                    stand.one('trigger4AddNewSpec').click().then(
                        function() {
                            stand.waitUntilPresent('specAddSet', 200);
                        }
                    ).then(
                        function() {
                            stand.one('specKey').clear().sendKeys(spec.specKey);
                            for (var i=-1,l=sv.length;++i<l;) {
                                stand.one('newSpecValue').clear().sendKeys(sv[i]).then(
                                    function() {
                                        stand.one('trigger4SpecAdd').click();
                                    }
                                );
                            }//end for
                        }
                    ).then(
                        function() {
                            stand.one('trigger4SpecSave').click().then(
                                function() {
                                    stand.waitUntilNotPresent('specAddSet', 200);
                                }
                            );
                        }
                    );
                }
            );
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.specImgUpload = function() {
    var stand = this;

    return browser.actions().mouseMove(this.one('trigger4SpecImgUpload')).perform().then(
        function() {
            stand.one('trigger4SpecImgUpload').click().then(
                function() {
                    stand.one('dialog').isPresent().then(
                        function(flag) {
                            if (flag) stand.one('dialogSubmit').click();
                        }
                    );
                }
            ).then(
                function() {
                    stand.waitUntilPresent('sign4SpecImgUpload', 200);
                }
            ).then(
                function() {
                    browser.executeScript(
                        function() {
                            var labels = arguments[0].getElementsByTagName('label');
                            for (var i=-1,l=labels.length;++i<l;) {
                                labels[i].removeAttribute('for');
                            }//end for
                        }
                    , stand.one('speUploadSet').getWebElement());
                }
            );
        }
    ).then(
        function() {
            stand.all('specImgUploadUnit').each(
                function(unit) {
                    unit.click().then(
                        function() {
                            stand.one('specImgUploadInput').sendKeys(stand.attachment.image).then(
                                function() {
                                    browser.wait(
                                        function() {
                                            return unit.getAttribute('className').then(
                                                function(className) {
                                                    return /active/.test(className);
                                                }
                                            );
                                        }
                                    , constants.TIMEOUT);
                                }
                            );
                        }
                    ).then(
                        function() {
                            stand.one('specImgUploadMain').click().then(
                                function() {
                                    stand.one('specImgUploadInput').sendKeys(stand.attachment.image).then(
                                        function() {
                                            browser.wait(
                                                function() {
                                                    return stand.one('specImgUploadMain').getAttribute('className').then(
                                                        function(className) {
                                                            return /mod-fill/.test(className);
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
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.fillSpecQty = function(amount, barCode, itemNumber) {
    var stand = this, barCode = barCode || '', itemNumber = itemNumber || '';

    return this.one('specQtyShow').then(
        function(unit) {
            browser.executeScript(
                function() {
                    var className = arguments[0].className;
                    arguments[0].className = className.replace(/show/, 'hidden');
                }
            , unit.getWebElement());
        }
    ).then(
        function() {
            stand.all('specQtys').each(
                function(table) {
                    browser.executeScript(
                        function() {
                            var className = arguments[0].className;
                            arguments[0].className = className.replace(/hidden/, 'show');
                        }
                    , table.getWebElement()).then(
                        function() {
                            stand.all('specQty').each(
                                function(unit) {
                                    unit.clear().sendKeys(amount);
                                }
                            ).then(
                                function() {
                                    stand.all('specItemNumber').each(
                                        function(unit) {
                                            unit.clear().sendKeys(itemNumber);
                                        }
                                    );
                                }
                            ).then(
                                function() {
                                    stand.all('specBarCode').each(
                                        function(unit) {
                                            unit.clear().sendKeys(barCode);
                                        }
                                    );
                                }
                            );
                        }
                    ).then(
                        function() {
                            browser.executeScript(
                                function() {
                                    var className = arguments[0].className;
                                    arguments[0].className = className.replace(/show/, 'hidden');
                                }
                            , table.getWebElement());
                        }
                    );
                }
            );
        }
    ).then(
        function() {
            browser.executeScript(
                function() {
                    var className = arguments[0].className;
                    arguments[0].className = className.replace(/hidden/, 'show');
                }
            , stand.one('specQtys').getWebElement());
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.fillBasicAttribute = function() {
    var stand = this;
    return protractor.promise.all([
        this.all('attributesInput').each(
            function(input) {
                input.clear().sendKeys('1');
            }
        ),
        this.all('attributesSelect').each(
            function(select) {
                select.$$('option').get(1).click().then(
                    function() {
                        browser.actions().mouseDown().mouseUp().perform();
                    }
                );
            }
        )
    ]).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.pickLocation = function(location) {
    var stand = this, idx;
    idx = [
        '台北市',
        '新北市',
        '基隆市',
        '宜蘭縣',
        '桃園縣',
        '新竹市',
        '新竹縣',
        '苗栗縣',
        '台中市',
        '彰化縣',
        '南投縣',
        '嘉義市',
        '嘉義縣',
        '雲林縣',
        '台南市',
        '高雄市',
        '屏東縣',
        '花蓮縣',
        '台東縣',
        '澎湖縣',
        '金門',
        '馬祖',
        '美國',
        '日本',
        '加拿大',
        '香港',
        '中國大陸',
        '其他國家'
    ];
    idx = idx.indexOf(location.trim());
    if (idx == -1) idx = 1;
    else idx += 1;

    return this.one('itemLocation').$$('option').get(idx).click().then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.pickDurationDay = function(durationDay) {
    var stand = this, opt, d;
    return browser.actions().mouseMove(this.one('durationDay')).perform().then(
        function() {
            if (typeof durationDay == 'undefined') throw new Error('parameter missing.');
            else opt = 'option[value="' + durationDay.toString().trim() +'"]';
        }
    ).then(
        function() {
            stand.one('durationDay').$(opt).isPresent().then(
                function(flag) {
                    if (!flag) return;
                    stand.one('durationDay').click().then(
                        function() {
                            stand.one('durationDay').$(opt).click().then(
                                function() {
                                    browser.actions().mouseDown().mouseUp().perform();
                                }
                            );
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

singleEdit.prototype.fillPromotePrice = function(promotePrice) {
    var stand = this;
    return this.one('salePrice').getAttribute('value').then(
        function(value) {
            if (!value.trim().length) throw new Error('salePrice need to set first');
            else if (typeof promotePrice == 'undefined' || Number(promotePrice) > Number(value)) throw new Error('promotePrice format error');
        }
    ).then(
        function() {
            stand.one('hasPromotionPrice').getAttribute('checked').then(
                function(flag) {
                    if (!flag) stand.one('hasPromotionPrice').click();
                }
            ).then(
                function() {
                    stand.one('promotePrice').clear().sendKeys(promotePrice);
                }
            );
        }
    ).thenCatch(
        function() {
            //err catch
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.pickCustomCategory = function(customCategory) {
    var stand = this, opt, d;
    return this.one('customCategory').isPresent().then(
        function(flag) {
            if (!flag || typeof customCategory == 'undefined') throw new Error('Not qualify or parameter missing.');
            else d = customCategory.toString().trim(); 
        }
    ).then(
        function() {
            // browser.actions().mouseMove(stand.one('customCategory')).perform().then(
            browser.actions().mouseMove(stand.header.one('header')).perform().then(
                function() {
                    stand.one('customCategory').$$('option').each(
                        function(unit) {
                            unit.getText().then(
                                function(value) {
                                    if (value.trim() == d) opt = unit;
                                }
                            );
                        }
                    ).then(
                        function() {
                            if (typeof opt == 'undefined') return;
                            stand.one('customCategory').click().then(
                                function() {
                                    opt.click().then(
                                        function() {
                                            browser.actions().mouseDown().mouseUp().perform();
                                        }
                                    );
                                }
                            );
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
    )
};

singleEdit.prototype.fillSingleShipping = function(types, shipFee, ships) {
    var stand = this, mapping, payType = [], shipType = [];

    if (!arguments.length) {
        types = 'srm';
        shipFee = 100;
    }//end if

    mapping = {
        'payTypeSrm': '.srm',
        'payType711': '.s7c',
        'payTypeFamily': '.sfc',
        'payTypeCod': '.spc',
        'payTypeCreditcard': '.srm',
        'payTypeCreditcardx3': '.srm',
        'payTypeCreditcardx6': '.srm'
    };

    if (typeof types == 'string') {
        if (/,/.test(types)) types = types.split(',');
        else types = [types];
    }//end if

    for (var i=-1,l=types.length;++i<l;) {
        var type = types[i].trim();
        if (mapping['payType'+common.capitalize(type)]) {
            var ship = mapping['payType'+common.capitalize(type)];
            payType.push(type);
            if (shipType.indexOf(ship) == -1) shipType.push(ship);
        }//end if
    }//end for
    if (payType.indexOf('srm') == -1) payType.push('srm');

    //ships
    if (typeof ships == 'string') {
        if (/,/.test(ships)) ships = ships.split(',');
        else ships = [ships];
    } else ships = ['.srm'];
    for (var i=-1,l=ships.length;++i<l;) if (shipType.indexOf(ships[i]) == -1) shipType.push('.' + ships[i]);

    //pay-type
    return this.all('payTypeWrap').each(
        function(input) {
            input.getAttribute('checked').then(
                function(flag) {
                    if (flag) input.click();
                }
            );
        }
    ).then(
        function() {
            payType.forEach(
                function(type, idx) {
                    var key = 'payType' + common.capitalize(type);
                    stand.one(key).then(
                        function(e) {
                            e.click();
                        },
                        function() {
                            //error catch
                        }
                    );
                }
            );
        }
    ).then(
        function() {
            stand.one('singleShipping').click();
        }
    ).then(
        function() {
            //shipType
            for (var i=-1,l=shipType.length-2;++i<l;) {
                stand.one('addShipType').click();
            }//end for
        }
    ).then(
        function() {
            shipType.forEach(
                function(type, idx) {
                    stand.all('shipTypeSet').get(idx).then(
                        function(ship) {
                            ship.$$('select option').each(
                                function(opt) {
                                    opt.getAttribute('value').then(
                                        function(value) {
                                            if (value == type) opt.click();
                                        }
                                    );
                                }
                            ).then(
                                function() {
                                    ship.$('input').clear().sendKeys(shipFee);
                                }
                            );
                        }
                    ); 
                }
            );
        }
    ).then(
        function() {
            return stand;
        }
    );
};

singleEdit.prototype.goNext = function() {
    var stand = this, itemPreview = require(__base + constants.PO.itemPreview);

    return this.clickAndWaitUntilRedirect('btnSubmit').then(
        function() {
            return new itemPreview();
        }
    );
};


singleEdit.prototype.getStockValue = function(specOrder) {
    var stand = this, o = specOrder, hasSpec, stock;
    // o = 0;
    return this.isExist('hasSpecFlag').then(
        function(flag) {
            hasSpec = flag;
        }
    ).then(
        function() {
            if (!hasSpec) {
                stand.rollTo('itemStock').then(
                    function() {
                        stand.getValue('itemStock').then(
                            function(value) {
                                stock = value;
                            }
                        );
                    }
                );
            } else {
                stand.one('specMenu').isPresent().then(
                    function(flag) {
                        if (!flag) throw new Error('one layer spec item.');
                        stand.rollTo('specMenu').then(
                            function() {
                                stand.isExist('stepBarFixed').then(
                                    function(flag) {
                                        if (flag) {
                                            browser.executeScript(
                                                function(stepBar) {
                                                    stepBar.className = stepBar.className.replace(/\s*stepBar-wrap-fixed/, '');
                                                }
                                            , stand.one('stepBarFixed').getWebElement());
                                        }//end if
                                    }
                                );
                            }
                        ).then(
                            function() {
                                 stand.one('specMenu').$$('li').get(o).$('a').click();
                            }
                        );
                    }
                ).thenCatch(
                    function(err) {
                        //one layer spec item
                        stand.rollTo('specQty');
                    }
                ).then(
                    function() {
                        stand.getValue('specQty').then(
                            function(value) {
                                stock = value;
                            }
                        );
                    }
                );
            }//end if
        }
    ).thenCatch(
        function(err) {
            //do nothing
            // console.log(err)
        }
    ).then(
        function() {
            return (typeof stock != 'undefined') ? Number(stock) : stock;
        }
    );
};


module.exports = singleEdit;