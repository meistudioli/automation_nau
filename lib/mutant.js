var mutant = {
    createItem: function(type, data) {
        var selectType = require(__base + constants.PO.selectType),
            neoData = {},
            removes = ['mid', 'payType', 'barCode', 'itemNumber', 'itemLocation', 'durationDay', 'customCategory', 'promotePrice', 'shipFee', 'shipType', 'imageAmount', 'specs', 'owner'];

        for (var i=-1,l=removes.length;++i<l;) {
            var key = removes[i];
            if (typeof data[key] == 'undefined') continue;
            neoData[key] = data[key];
            delete(data[key]);
        }//end for

        selectType = new selectType();
        return selectType.go().then(
            function(stand) {
                return stand.generalSubmit();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.selectItemType(type.toLowerCase());
            }
        ).then(
            function(selectCategory) {
                return selectCategory.selectNewCategory();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.pickCategoryDirectly();
            }
        ).then(
            function(selectCategory) {
                return selectCategory.goNext();
            }
        ).then(
            function(singleEdit) {
                return singleEdit.pickCustomCategory(neoData.customCategory);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillRequestData(data);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillPromotePrice(neoData.promotePrice);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.imageUpload(neoData.imageAmount);
            }
        ).then(
            function(singleEdit) {
                if (!neoData.specs) return singleEdit;
                else {
                    return singleEdit.createSpecs(neoData.specs).then(
                        function(singleEdit) {
                            return singleEdit.specImgUpload();
                        }
                    ).then(
                        function(singleEdit) {
                            return singleEdit.fillSpecQty(data.totalQuantity || 1, neoData.barCode, neoData.itemNumber);
                        }
                    )
                }//end if
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillBasicAttribute();
            }
        ).then(
            function(singleEdit) {
                return singleEdit.pickLocation(neoData.itemLocation || '台北市');
            }
        ).then(
            function(singleEdit) {
                return singleEdit.pickDurationDay(neoData.durationDay);
            }
        ).then(
            function(singleEdit) {
                return singleEdit.fillSingleShipping(neoData.payType || 'srm', neoData.shipFee || 100, neoData.shipType || 'srm');
            }
        ).then(
            function(singleEdit) {
                return singleEdit.goNext();
            }
        ).then(
            function(itemPreview) {
                return itemPreview.goSubmit();
            }
        ).then(
            function(submitSuccess) {
                return submitSuccess.getItemId();
            }
        );
    },
    mutate: function(type, force) {
        var fs              = require('fs'),
            path            = __base + constants.dataSrc,
            source          = {},
            m               = this,
            reBuild         = false,
            type            = (['on', 'off'].indexOf(type) == -1) ? 'off' : type,
            listMerchandise = require(__base + constants.PO.listMerchandise),
            isForce;

        source = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
        isForce = (typeof force != 'undefined') ? true : false;
        browser.params.face.ITEM = source;

        //plug other test data
        for (var i in source) {
            if (['buyNow', 'bidding'].indexOf(i) == -1) browser.params[i] = source[i];
        }//end for

        listMerchandise = new listMerchandise();
        return browser.getCurrentUrl().then(
            function() {
                if (type == 'on') return;
                //autoDestruct
                m.autoDestruct();
            }
        ).then(
            function() {
                if (!browser.params.activeMutant && !isForce) {
                    throw new Error('activeMutant silent.');
                }//end if
            }
        ).then(
            function() {
                //buyNow
                for (var i in source.buyNow) {
                    (function(key) {
                        var deferred = protractor.promise.defer(), item;
                        item = JSON.parse(JSON.stringify(source.buyNow[key]));

                        deferred.promise.then(
                            function() {
                                //login & did
                                listMerchandise.login(item.owner).thenCatch(
                                    function(err) {
                                        console.log(err)
                                    }
                                );
                            }
                        ).then(
                            function() {
                                return listMerchandise.go();
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.filterByStatus('all');
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.pickSearchType('mid');
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.goSearch(item.mid);
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.getFirstRowItemStatus();
                            }
                        ).then(
                            function(status) {
                                switch (type) {
                                    case 'on':
                                        if (status == '上架中') return;
                                        else if (status == '已下架') {
                                            listMerchandise.onshelfFirstRowItem();
                                        } else {
                                            reBuild = true;
                                            m.createItem('buyNow', item).then(
                                                function(itemId) {
                                                    source.buyNow[key].mid = itemId;
                                                },
                                                function(err) {
                                                    console.log(err)
                                                }
                                            );
                                        }//end if
                                        break;
                                    case 'off':
                                        if (status == '上架中') listMerchandise.offshelfFirstRowItem();
                                        break;
                                }//end switch
                            }
                        );
                        deferred.fulfill(true);
                    })(i);
                }//end for
            }
        ).then(
            function() {
                //bidding
                for (var i in source.bidding) {
                    (function(key) {
                        var deferred = protractor.promise.defer(), item;
                        item = JSON.parse(JSON.stringify(source.bidding[key]));

                        deferred.promise.then(
                            function() {
                                //login & did
                                listMerchandise.login(item.owner);
                            }
                        ).then(
                            function() {
                                return listMerchandise.go();
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.filterByStatus('all');
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.pickSearchType('mid');
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.goSearch(item.mid);
                            }
                        ).then(
                            function(listMerchandise) {
                                return listMerchandise.getFirstRowItemStatus();
                            }
                        ).then(
                            function(status) {
                                switch (type) {
                                    case 'on':
                                        if (status == '上架中') return;
                                        else if (status == '已下架') {
                                            listMerchandise.onshelfFirstRowItem();
                                        } else {
                                            reBuild = true;
                                            m.createItem('bidding', item).then(
                                                function(itemId) {
                                                    source.bidding[key].mid = itemId;
                                                }
                                            );
                                        }//end if
                                        break;
                                    case 'off':
                                        if (status == '上架中') listMerchandise.offshelfFirstRowItem();
                                        break;
                                }//end switch
                            }
                        );
                        deferred.fulfill(true);
                    })(i);
                }//end for
            }
        ).then(
            function() {
                if (type == 'off') return;
                browser.params.face.ITEM = source;
                if (reBuild) {
                    fs.writeFileSync(path, JSON.stringify(source, null, 4), {encoding: 'utf8'});
                }//end if
            }
        ).thenCatch(
            function() {
                browser.params.face.ITEM = source;
            }
        );
    },
    autoDestruct: function() {
        var destruction,
            stand,
            itemQnaListSeller = require(__base + constants.PO.itemQnaListSeller),
            itemPagePO = require(__base + constants.PO.itemPage);

        if (!browser.params.destruction) return;
        
        destruction = browser.params.destruction;
        stand = new PageObject();
        itemQnaListSeller = new itemQnaListSeller();

        for (var i in destruction) {
            (function(userId) {
                var deferred = protractor.promise.defer(), data = destruction[userId];
                deferred.promise.then(
                    function() {
                        //login & did
                        stand.login(userId);
                    }
                ).then(
                    function() {
                        //quiz
                        if (!data.quiz) return;
                        data.quiz.forEach(
                            function(itemId, idx) {
                                itemQnaListSeller.go().then(
                                    function(itemQnaListSeller) {
                                        return itemQnaListSeller.pickSearchType('mid');
                                    }
                                ).then(
                                    function(itemQnaListSeller) {
                                        return itemQnaListSeller.goSearch(itemId);
                                    }
                                ).then(
                                    function(itemQnaListSeller) {
                                        return itemQnaListSeller.getSearchResultAmount();
                                    }
                                ).then(
                                    function(amount) {
                                        expect(amount, 'search result error').to.be.at.least(1);
                                    }
                                ).then(
                                    function() {
                                        return itemQnaListSeller.deleteQuiz();
                                    }
                                ).then(
                                    function(flag) {
                                        expect(flag, 'quiz delete fail').to.be.true;
                                    }
                                );
                            }
                        );
                    }
                ).then(
                    function() {
                        //favoritestore
                        if (!data.favoritestore) return;
                        data.favoritestore.forEach(
                            function(itemId, idx) {
                                var itemPage = new itemPagePO(itemId);
                                itemPage.go().then(
                                    function(itemPage) {
                                        itemPage.favoriteStoreActs('remove');
                                    }
                                ).thenCatch(
                                    function(err) {
                                        //error catch
                                    }
                                );
                            }
                        );
                    }
                ).then(
                    function() {
                        //watchlist
                        if (!data.watchlist) return;
                        data.watchlist.forEach(
                            function(itemId, idx) {
                                var itemPage = new itemPagePO(itemId);
                                itemPage.go().then(
                                    function(itemPage) {
                                        itemPage.watchListActs('remove');
                                    }
                                ).thenCatch(
                                    function(err) {
                                        //error catch
                                    }
                                );
                            }
                        );
                    }
                );
                deferred.fulfill(true);
            })(i);
        }//end for
    }
};

module.exports = mutant;
