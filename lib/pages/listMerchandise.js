var listMerchandise;

listMerchandise = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'listMerchandise';
    this.data.url = constants.URL_MAP.merchandise_item_list;

    this.selector = {
    	filterItemType: '.item-filter li:nth-child(2) #menu-1',
    	filterItemTypeSubmenu: '.item-filter li:nth-child(2) #menu_0',
    	searchResultAmount: '.data-result-info em',
    	searchType: '.search-select a',
    	searchTypeOption: '.search-select ul',
    	btnSearch: '.seller-management-search input[type="submit"]',
    	searchInput: '.seller-management-search input[type="search"]',
    	itemList: '.item-list table tbody tr',
        dialog: '.msg-dialog-wrap.yui3-panel-focused',
        dialogConfirm: '.msg-dialog-wrap.yui3-panel-focused .button-primary',
        messageBar: '.message-bar',
        btnClose4MessageBar: '.message-bar .button-close',
        sortType: '.sort .first-of-type .menu-title',
        sortTypeSubmenu: '#sortby ul',
        imgLink: '.image',
        filterItemStatus: '.item-filter .item-filter-inline a',
        itemStatus: '.status p span',
        itemTitleFlexEdit: '.name .flexedit',
        itemTitleFlexEditInput: '.name textarea',
        itemTitleFlexEditConfirm: '.name a.confirm',
        itemTitleFlexEditProgress: '.item-list table tbody tr .name .flexedit.progress',
        itemPriceFlexEdit: '.price .flexedit',
        itemPriceFlexEditInput: '.price input',
        itemPriceFlexEditConfirm: '.price a.confirm',
        itemPriceFlexEditProgress: '.item-list table tbody tr .price .flexedit.progress',
        itemTitle: '.name a',
        itemPrice: '.price .number',
        pickAll: 'input[name="all_item"]',
        applyShipPreference: '.operate-display a:nth-child(4)',

        itemStockFlexEdit: '.stock .flexedit',
        itemStockFlexEditProgress: '.item-list table tbody tr .stock .flexedit.progress',
        itemStockSpec: '.stock .stock-wrap',
        itemStockSpecSelect: '.stock .stock-wrap select',
        itemStockFlexEditCancel: '.stock a.cancel',
        itemStockFlexEditConfirm: '.stock a.confirm',
        itemOperateEdit: '.operate .op-edit',
        itemStockFlexEditInput: '.stock input',
        itemStockSpecHide: '.stock .stock-wrap .select-wrap[hidden]',
        itemFlexBargain: '.price .flex-bargain',
        itemBargainMode: 'input[name="bargain"]',
        bargainBlocker: '.msg-dialog-wrap.yui3-panel-focused .bargainBlocker',
        bargainBlockerSubmit: '.bargainBlocker input[type="submit"]',
        itemFlexBargainProgress: '.item-list table tbody tr .price .flex-bargain.progress',
        itemFlexBargainError: '.price .flex-bargain.error',

        bargainMutant: '.msg-dialog-wrap.yui3-panel-focused .bargainMutant',
        bargainMutantConfirm: '.bargainMutant .bargainMutant__submits__submit',
        bargainMutantLabel: '.bargainMutant .bargainMutant__fieldset__label',
        operateOnshelf: 'a[data-operation="getfee"]',
        itemType: '.publish p',
        bargainSalePrice: '.bargainMutant input[name="salePrice"]',
        bargainRejectPrice: '.bargainMutant input[name="bargainAutoPrice[reject]"]'
    };

    //components
    com_navigation = require(__base + constants.COM.navigation);
    this.navigation = new com_navigation();
};
listMerchandise.prototype = Object.create(PageObject.prototype);

listMerchandise.prototype.go = function() {
	var stand = this, pattern = new RegExp(common.getLinkReg(constants.URL_MAP.merchandise_item_list));
	return browser.getCurrentUrl().then(
		function(url) {
			// if (!browser.params.forceRefresh && pattern.test(url)) return;
			browser.get(stand.data.url).then(
		        function() {
		        	stand.waitUntilPresent('filterItemTypeSubmenu');
		        }	
			);
		}
	).then(
		function() {
			stand.one('btnClose4MessageBar').isPresent().then(
				function(flag) {
					stand.one('btnClose4MessageBar').click();
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

	// var stand = this;
 //    return browser.get(this.data.url).then(
 //        function() {
 //        	stand.waitUntilPresent('filterItemTypeSubmenu');
 //        }
 //    ).then(
 //        function() {
 //            return stand;
 //        }
 //    );
};

listMerchandise.prototype.filterItemBy = function(type) {
	var stand = this, idx = ['all', 'bidding', 'buynow'].indexOf(type);

	return this.one('filterItemType').$('a').click().then(
		function() {
			stand.waitUntilDisplay('filterItemTypeSubmenu');
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('filterItemTypeSubmenu').$$('ul li').get(idx).$('a'));
		}
	).then(
		function() {
			// browser.sleep(5000)
			return stand;
		}
	);
};

listMerchandise.prototype.pickSearchType = function(type) {
    var stand = this, type = type.toLowerCase().replace(/\s/g, ''), idx;
    idx = ['title', 'mid', 'itemnumber'].indexOf(type);
    if (idx == -1) {
    	type = 'title';
    	idx = 0;
    }//end if
	
	return this.one('searchType').click().then(
		function() {
			stand.waitUntilDisplay('searchTypeOption');
		}
	).then(
		function() {
			stand.one('searchTypeOption').$$('a').get(idx).click().then(
				function() {
					stand.waitUntilNotDisplay('searchTypeOption');
				}
			);
		}
	).then(
		function() {
			return stand;
		}
	);
};

listMerchandise.prototype.goSearch = function(keyword) {
	var stand = this;
	return this.one('searchInput').clear().sendKeys(keyword).then(
		function() {
			stand.clickAndWaitUntilRedirect('btnSearch');
		}
	).then(
		function() {
			return stand;
		}
	);
};

listMerchandise.prototype.getSearchResultAmount = function() {
	return this.all('searchResultAmount').last().getText().then(
		function(amount) {
			return Number(amount.trim());
		},
		function() {
			return 0;
		}
	);
};

listMerchandise.prototype.getFirstRowItemType = function() {
	var stand = this;
	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.itemType).getText().then(
				function(type) {
					return /競標/.test(type.trim()) ? 'bidding' : 'buynow';
				}
			);
		},
		function() {
			return false;
		}
	);
};

listMerchandise.prototype.offshelfFirstRowItem = function() {
	var stand = this, operate;
	return this.one('itemList').then(
		function(item) {
			return item.$('.publish p').getText().then(
				function(itemType) {
					itemType = common.trim(itemType);
					switch(itemType) {
						case i18n.get_string('MERCHANDISE_TYPE_BUY_NOW'):
							//直購商品
							operate = 'close';
							break;
						case i18n.get_string('MERCHANDISE_TYPE_BID'):
							//競標商品
							operate = 'cancel';
							break;
					}//end seitch
					return (typeof operate == 'undefined') ? false : true;
				}
			).then(
				function(flag) {
					if (!flag) return false;
					return item.$('a[data-operation="'+operate+'"]').click().then(
						function() {
							stand.waitUntilPresent('dialog');
						}
					).then(
						function() {
							//dialog occur
                            return stand.one('dialogConfirm').click().then(
                                function() {
                                    stand.waitUntilPresent('messageBar');
                                }
                            ).then(
                            	function() {
                            		return true;
                            	},
                            	function() {
                            		return false;
                            	}
                            );
						},
						function() {
							return false;
						}
					);
				}
			);
		},
		function() {
			return false;
		}
	);
};

listMerchandise.prototype.onshelfFirstRowItem = function() {
	var stand = this, flag = true, confirm;
	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.operateOnshelf).click().then(
				function() {
					stand.waitUntilPresent('dialog');
				}
			);
		}
	).then(
		function() {
			stand.one('bargainMutant').isPresent().then(
				function(isMutant) {
					confirm = (isMutant) ? 'bargainMutantConfirm' : 'dialogConfirm';
				}
			);
		}
	).then(
		function() {
			return stand.one(confirm).click().then(
				function() {
					stand.waitUntilPresent('messageBar');
				}
			).then(
				function() {
					flag = true;
				},
				function() {
					flag = false;
				}
			);
		}
	).thenCatch(
		function(err) {
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

listMerchandise.prototype.closeBidFirstRowItem = function() {
	var stand = this;
	return this.one('itemList').then(
		function(item) {
			return item.$('a[data-operation="closebid"]').click().then(
				function() {
					stand.waitUntilPresent('dialog');
				}
			).then(
				function() {
					//dialog occur
                    return stand.one('dialogConfirm').click().then(
                        function() {
                            stand.waitUntilPresent('messageBar');
                        }
                    ).then(
                    	function() {
                    		return true;
                    	},
                    	function() {
                    		return false;
                    	}
                    );
				},
				function() {
					return false;
				}
			);
		},
		function() {
			return false;
		}
	);
};

listMerchandise.prototype.sortItemBy = function(type) {
	var stand = this, idx;
	idx = [
		i18n.get_string('MERCHANDISE_ITEM_NEWEST_ITEM'),
		i18n.get_string('MERCHANDISE_ITEM_ONTIME_DESC'),
		i18n.get_string('MERCHANDISE_ITEM_ONTIME_ASC'),
		i18n.get_string('MERCHANDISE_ITEM_LEFT_TIME_LOW_TO_HIGH'),
		i18n.get_string('MERCHANDISE_ITEM_LEFT_TIME_HIGH_TO_LOW'),
		i18n.get_string('MERCHANDISE_ITEM_OFFTIME_DESC'),
		i18n.get_string('MERCHANDISE_ITEM_OFFTIME_ASC'),
		i18n.get_string('MERCHANDISE_ITEM_CURRENT_PRICE_LOW_TO_HIGH'),
		i18n.get_string('MERCHANDISE_ITEM_CURRENT_PRICE_HIGH_TO_LOW'),
		i18n.get_string('MERCHANDISE_ITEM_BID_LOW_TO_HIGH'),
		i18n.get_string('MERCHANDISE_ITEM_BID_HIGH_TO_LOW'),
		i18n.get_string('MERCHANDISE_ITEM_SELL_LOW_TO_HIGH'),
		i18n.get_string('MERCHANDISE_ITEM_SELL_HIGH_TO_LOW')
	];
	idx = idx.indexOf(common.trim(type));

	return this.one('sortType').click().then(
		function() {
			stand.waitUntilPresent('sortTypeSubmenu');
		}
	).then(
		function() {
			stand.clickAndWaitUntilRedirect(stand.one('sortTypeSubmenu').$$('li').get(idx).$('a'));
		}
	).then(
		function() {
			return stand;
		}
	);
};

listMerchandise.prototype.getCurrentItemList = function() {
	var stand = this, list = [];
	return this.all('itemList').each(
		function(item) {
			item.$(stand.selector.imgLink).getAttribute('href').then(
				function(href) {
					list.push(href.replace(/.*\/item\/(\d*)/, '$1'));
				}
			);
		}
	).then(
		function() {
			return list;
		}
	);
};

listMerchandise.prototype.filterByStatus = function(status) {
	var stand = this, idx;
	idx = [
		'all',
		'onshelf',
		'offshelf',
		'appoint',
		'abuse'
	];
	idx = idx.indexOf(common.trim(status));

	return this.all('filterItemStatus').get(idx).then(
		function(e) {
			stand.clickAndWaitUntilRedirect(e);
		}
	).then(
		function() {
			return stand;
		}
	);
};

listMerchandise.prototype.getFirstRowItemStatus = function() {
	var stand = this;
	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.itemStatus).getText().then(
				function(status) {
					return status.trim();
				}
			);
		},
		function() {
			return false;
		}
	);
};

listMerchandise.prototype.getFirstRowItemTitle = function() {
	var stand = this, value;
	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.itemTitle).getInnerHtml().then(
				function(html) {
					value = html.replace(/(<([^>]+)>)/igm, '').trim();
				}
			);
		}
	).thenCatch(
		function(err) {
			//do nothing
		}
	).then(
		function() {
			return value;
		}
	);
};

listMerchandise.prototype.getFirstRowItemPrice = function() {
	var stand = this, value;
	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.itemPrice).getInnerHtml().then(
				function(html) {
					value = html.replace(/,|-/g, '').trim();
				}
			);
		}
	).thenCatch(
		function(err) {
			//do nothing
		}
	).then(
		function() {
			return Number(value);
		}
	);
};

listMerchandise.prototype.modifyFirstRowTitle = function(key) {
	var stand = this, flag = true, original, target;

	return this.getFirstRowItemTitle().then(
		function(itemTitle) {
			if (typeof itemTitle == 'undefined') throw new Error('itemTitle missing');
			original = itemTitle;
		}
	).then(
		function() {
			return stand.one('itemList').then(
				function(item) {
					target = item;
					return item.$(stand.selector.itemTitleFlexEdit).then(
						function(flexedit) {
							return browser.actions().mouseMove(target).perform().then(
								function() {
									browser.sleep(500);
									return flexedit;
								}
							);
						}
					).then(
						function(flexedit) {
							browser.executeScript(
								function() {
									arguments[0].click();
								}
							, flexedit.getWebElement()).then(
								function() {
									item.$(stand.selector.itemTitleFlexEditInput).clear().sendKeys(key);
								}
							).then(
								function() {
									item.$(stand.selector.itemTitleFlexEditConfirm).click().then(
										function() {
											stand.waitUntilNotPresent(stand.selector.itemTitleFlexEditProgress);
										}
									);
								}
							).then(
								function() {
									stand.one('dialog').isPresent().then(
										function(f) {
											if (f) throw new Error('itemTitle modify fail');
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
			var cUrl;
			browser.getCurrentUrl().then(
				function(url) {
					cUrl = url;
				}
			).then(
				function() {
					var itemPage;
					return target.$(stand.selector.imgLink).then(
						function(imgLink) {
							return stand.clickAndWaitUntilRedirect(imgLink).then(
								function() {
									itemPage = require(__base + constants.PO.itemPage);
									itemPage = new itemPage('000000000000');
									return itemPage.getTitle();
								}
							);
						}
					);
				}
			).then(
				function(title) {
					browser.get(cUrl).then(
						function() {
							if (title != key) throw new Error('itemTitle modify fail - 2');
						}
					);
				}
			);
		}
	).thenCatch(
		function(err) {
			// console.log(err)
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

listMerchandise.prototype.modifyFirstRowPrice = function(key) {
	var stand = this, flag = true, original, target;

	return this.getFirstRowItemPrice().then(
		function(itemPrice) {
			if (typeof itemPrice == 'undefined') throw new Error('itemPrice missing');
			original = itemPrice;
		}
	).then(
		function() {
			return stand.one('itemList').then(
				function(item) {
					target = item;
					return item.$(stand.selector.itemPriceFlexEdit).then(
						function(flexedit) {
							return browser.actions().mouseMove(target).perform().then(
								function() {
									browser.sleep(500);
									return flexedit;
								}
							);
						}
					).then(
						function(flexedit) {
							browser.executeScript(
								function() {
									arguments[0].click();
								}
							, flexedit.getWebElement()).then(
								function() {
									item.$(stand.selector.itemPriceFlexEditInput).clear().sendKeys(key);
								}
							).then(
								function() {
									item.$(stand.selector.itemPriceFlexEditConfirm).click().then(
										function() {
											stand.waitUntilNotPresent(stand.selector.itemPriceFlexEditProgress);
										}
									);
								}
							).then(
								function() {
									stand.one('dialog').isPresent().then(
										function(f) {
											if (f) throw new Error('itemPrice modify fail');
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
			var cUrl;
			browser.getCurrentUrl().then(
				function(url) {
					cUrl = url;
				}
			).then(
				function() {
					var itemPage;
					return target.$(stand.selector.imgLink).then(
						function(imgLink) {
							return stand.clickAndWaitUntilRedirect(imgLink).then(
								function() {
									itemPage = require(__base + constants.PO.itemPage);
									itemPage = new itemPage('000000000000');
									return itemPage.getPrice();
								}
							);
						}
					);
				}
			).then(
				function(price) {
					browser.get(cUrl).then(
						function() {
							if (price != key) throw new Error('itemPrice modify fail - 2');
						}
					);
				}
			);
		}
	).thenCatch(
		function(err) {
			// console.log(err)
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

listMerchandise.prototype.pickAllItems = function() {
	var stand = this;
	return this.one('pickAll').then(
		function(unit) {
			unit.click();
		}
	).thenCatch(
		function(err) {
			//error occur
		}
	).then(
		function() {
			return stand;
		}
	);
};

listMerchandise.prototype.applyShipPreference = function() {
	var stand = this, flag = true;
	return this.one('applyShipPreference').then(
		function(unit) {
			unit.click().then(
				function() {
					stand.waitUntilPresent('dialog');
				}
			).then(
				function() {
					//dialog occur
                    return stand.one('dialogConfirm').click().then(
                        function() {
                            stand.waitUntilPresent('messageBar');
                        }
                    );
                }
			);
		}
	).thenCatch(
		function(err) {
			//error
			// console.log(err);
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

listMerchandise.prototype.getFirstRowItemStock = function() {
	var stand = this, value, hasSpec = false, set = 1, target;

	return this.one('itemList').then(
		function(item) {
			target = item;
			return item.$(stand.selector.itemStockFlexEdit).then(
				function(flexedit) {
					return browser.actions().mouseMove(target).perform().then(
						function() {
							browser.sleep(500);
							return flexedit;
						}
					);
				}
			).then(
				function(flexedit) {
					browser.executeScript(
						function() {
							arguments[0].click();
						}
					, flexedit.getWebElement()).then(
						function() {
							stand.waitUntilNotPresent('itemStockFlexEditProgress').then(
								function() {
									stand.one('itemStockSpec').isPresent().then(
										function(flag) {
											hasSpec = flag;
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
			if (!hasSpec) {
				stand.getValue('itemStockFlexEditInput').then(
					function(v) {
						value = v;
					}
				);
			} else {
				stand.one('itemStockSpecHide').isPresent().then(
					function(flag) {
						if (!flag) {
							stand.one('itemStockSpecSelect').$$('option').get(set).click().then(
								function() {
									browser.actions().mouseDown().mouseUp().perform();
								}
							);
						} else throw new Error('one layer spec item.');
					}
				).thenCatch(
					function(err) {
						//one layer spec item
						set = 0;
					}
				).then(
					function() {
						stand.getValue('.specs[data-set="'+set+'"] input').then(
							function(v) {
								value = v;
							}
						);
					}
				);
			}//end if
		}
	).then(
		function() {
			//turn off flexedit
			stand.one('itemStockFlexEditCancel').click();
		}
	).thenCatch(
		function(err) {
			//do nothing
		}
	).then(
		function() {
			return (typeof value != 'undefined') ? Number(value) : value;
		}
	);
};

listMerchandise.prototype.modifyFirstRowStock = function(key) {
	var stand = this, flag = true, original, target, hasSpec = false, set = 1, singleEdit;
	singleEdit = require(__base + constants.PO.singleEdit);

	return this.one('itemList').then(
		function(item) {
			target = item;
			return item.$(stand.selector.itemStockFlexEdit).then(
				function(flexedit) {
					return browser.actions().mouseMove(target).perform().then(
						function() {
							browser.sleep(500);
							return flexedit;
						}
					);
				}
			).then(
				function(flexedit) {
					browser.executeScript(
						function() {
							arguments[0].click();
						}
					, flexedit.getWebElement()).then(
						function() {
							stand.waitUntilNotPresent('itemStockFlexEditProgress').then(
								function() {
									stand.one('itemStockSpec').isPresent().then(
										function(flag) {
											hasSpec = flag;
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
			//fill stock
			if (!hasSpec) {
				//wait for fill
				stand.one('itemStockFlexEditInput').clear().sendKeys(key).then(
					function() {
						stand.one('itemStockFlexEditConfirm').click().then(
							function() {
								stand.waitUntilNotPresent('itemStockFlexEditProgress');
							}
						);
					}
				).then(
					function() {
						stand.one('dialog').isPresent().then(
							function(f) {
								if (f) throw new Error('itemStock modify fail');
							}
						);
					}
				);
			} else {
				stand.one('itemStockSpecHide').isPresent().then(
					function(flag) {
						if (!flag) {
							stand.one('itemStockSpecSelect').$$('option').get(set).click().then(
								function() {
									browser.actions().mouseDown().mouseUp().perform();
								}
							);
						} else throw new Error('one layer spec item.');
					}
				).thenCatch(
					function(err) {
						//one layer spec item
						set = 0;
					}
				).then(
					function() {
						stand.one('.specs[data-set="'+set+'"] input').clear().sendKeys(key);
					}
				).then(
					function() {
						stand.one('itemStockFlexEditConfirm').click().then(
							function() {
								stand.waitUntilNotPresent('itemStockFlexEditProgress');
							}
						);
					}
				).then(
					function() {
						stand.one('dialog').isPresent().then(
							function(f) {
								if (f) throw new Error('itemStock modify fail');
							}
						);
					}
				);
			}//end if
		}
	).then(
		function() {
			var cUrl;
			browser.getCurrentUrl().then(
				function(url) {
					cUrl = url;
				}
			).then(
				function() {
					stand.clickAndWaitUntilRedirect('itemOperateEdit').then(
						function() {
							singleEdit = new singleEdit();
						}
					);
				}
			).then(
				function() {
					return singleEdit.getStockValue(set).then(
						function(stock) {
							return stock;
						}
					);
				}
			).then(
				function(stock) {
					browser.get(cUrl).then(
						function() {
							// console.log('stock: '+stock);
							// console.log('key: '+key);
							if (stock != key) throw new Error('itemStock modify fail - 2');
						}
					);
				}
			);
		}
	).thenCatch(
		function(err) {
			//do nothing
			flag = false;
		}
	).then(
		function() {
			return flag;
		}
	);
};

listMerchandise.prototype.getFirstRowItemBargainMode = function() {
	var mode, stand = this;
	return this.one('itemFlexBargain').then(
		function(unit) {
			unit.$(stand.selector.itemBargainMode).getAttribute('checked').then(
				function(flag) {
					mode = (flag) ? true : false;
				}
			);
		}
	).thenCatch(
		function(err) {
			//do nothing
		}
	).then(
		function() {
			return mode;
		}
	);
};

listMerchandise.prototype.bargainlizeFirstRowItem = function() {
	var stand = this, data = {};

	return this.one('itemList').then(
		function(item) {
			return item.$(stand.selector.operateOnshelf).click().then(
				function() {
					stand.waitUntilPresent('bargainMutant');
				}
			);
		}
	).then(
		function() {
			return stand.bargainlize();
		}
	).then(
		function(res) {
			data = res;
		}
	).thenCatch(
		function(err) {
			// console.log(err);
			data.flag = false;
		}
	).then(
		function() {
			return data;
		}
	);
};

listMerchandise.prototype.bargainlize = function() {
	var flag = true, itemId, stand = this;
	return this.one('bargainMutantLabel').then(
		function(bargainMutantLabel) {
			bargainMutantLabel.click().then(
				function() {
					browser.sleep(500);//animation
				}
			).thenCatch(
				function(err) {
					//do nothing
				}
			);
		}
	).then(
		function() {
			//fill data
			var requests = {
				salePrice: '10',
				rejectPrice: '1'
			};
			for (var i in requests) {
				var key = 'bargain' + common.capitalize(i);
				if (typeof stand.selector[key] == 'undefined') continue;
				stand.one(key).clear().sendKeys(requests[i]).thenCatch(
					function(err) {
						//do nothing
					}
				);
			}//end for
		}
	).then(
		function() {
			stand.one('bargainMutantConfirm').click().then(
				function() {
					stand.one('bargainBlocker').isPresent().then(
						function(flag) {
							if (flag) stand.one('bargainBlockerSubmit').click();
						}
					);
				}
			).then(
				function() {
					stand.waitUntilPresent('messageBar');
				}
			);
		}
	).then(
		function() {
			var url;
			//get buynow itemId
			stand.one('messageBar').$('a').getAttribute('href').then(
				function(href) {
					var query = common.parse_url(href).query;
					query = common.parse_str(query);
					itemId = query.qstr;
					url = href;
				}
			).then(
				function() {
					var itemPage = require(__base + constants.PO.itemPage);
					// itemId = '100149186540';
					itemPage = new itemPage(itemId);
					
					return itemPage.go().then(
						function() {
							return itemPage.one('mark-bargain').isPresent();
						}
					);
				}
			).then(
				function(flag) {
					browser.get(url).then(
						function() {
							if (!flag) throw new Error('bargainlize fail');
						}
					);
				}
			);
		}
	).thenCatch(
		function() {
			flag = false;
		}
	).then(
		function() {
			return {flag:flag, itemId:itemId};
		}
	);
};

listMerchandise.prototype.turnBargainMutantOn = function() {
	var stand = this, data = {};

	return this.getFirstRowItemBargainMode().then(
		function(flag) {
			if (typeof flag == 'undefined') throw new Error('flexBargain missing');
			stand.one('itemFlexBargain').$(stand.selector.itemBargainMode).click().then(
				function() {
					stand.waitUntilPresent('bargainMutant');
				}
			);
		}
	).then(
		function() {
			return stand.bargainlize();
		}
	).then(
		function(res) {
			data = res;
		}
	).thenCatch(
		function(err) {
			data.flag = false;
		}
	).then(
		function() {
			return data;
		}
	);
};

listMerchandise.prototype.turnBargain = function(mode) {
	var flag = true, stand = this;

	return this.getFirstRowItemBargainMode().then(
		function(flag) {
			if (mode == flag) return;
			stand.one('itemFlexBargain').$(stand.selector.itemBargainMode).click().then(
				function() {
					stand.one('bargainBlocker').isPresent().then(
						function(flag) {
							if (flag) stand.one('bargainBlockerSubmit').click();
						}
					);
				}
			).then(
				function() {
					stand.waitUntilNotPresent('itemFlexBargainProgress');
				}
			).then(
				function() {
					stand.one('itemFlexBargainError').isPresent().then(
						function(flag) {
							if (flag) throw new Error('flexBargain modify fail');
						}
					);
				}
			);
		}
	).then(
		function() {
			var cUrl;
			browser.getCurrentUrl().then(
				function(url) {
					cUrl = url;
				}
			).then(
				function() {
					var itemPage;
					return stand.one('itemList').$(stand.selector.imgLink).then(
						function(imgLink) {
							return stand.clickAndWaitUntilRedirect(imgLink).then(
								function() {
									itemPage = require(__base + constants.PO.itemPage);
									itemPage = new itemPage('000000000000');
									return itemPage.one('mark-bargain').isPresent();
								}
							);
						}
					);
				}
			).then(
				function(flag) {
					browser.get(cUrl).then(
						function() {
							if (flag != mode) throw new Error('flexBargain modify fail - 2');
						}
					);
				}
			);
		}
	).thenCatch(
		function(err) {
			flag = false
		}
	).then(
		function() {
			return flag;
		}
	);
};

module.exports = listMerchandise;