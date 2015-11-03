var booth = function() {
	var Given = When = Then = this.defineStep;

    /*------------------------ Given ------------------------*/

    // I've already in pagination - "2" page
    Given(/I've already in pagination - "([^"]*)" page/, function(page, next) {
        //boothSearch
        this.stand.pickPage(page).then(
            function(boothSearch) {
                // browser.sleep(5000);
            }
        ).then(next, next);
    });

    // I sort by "目前出價" desc
    Given(/I sort by "([^"]*)" (.*)/, function(type, order, next) {
        var world = this;

        //boothSearch
        this.stand.sortItemBy(type, order).then(
            function(boothSearch) {
                world.type = type;
                world.order = order;
            }
        ).then(next, next);
    });
    
    // I pick viewMode as "image"
    Given(/I pick viewMode as "([^"]*)"/, function(mode, next) {
        //boothSearch
        this.stand.pickViewMode(mode).then(
            function(boothSearch) {
                // browser.sleep(5000);
            }
        ).then(next, next);
    });

    // switch to dummy - "my_booth_it_uat.html"
    Given(/switch to dummy - "([^"]*)"/, function(path, next) {
        // next();
        var path = 'http://localhost:8080/legacyAuc/' + path;
        browser.get(path).then(next);
    });

    /*------------------------ When -------------------------*/

    // I press left-bottom pagination - "下一頁"
    When(/I press left-bottom pagination - "([^"]*)"/, function(key, next) {
        //boothSearch
        this.stand.leftBottomPageAct(key).then(
            function(boothSearch) {
                
            }
        ).then(next, next);
    });

    // I press right-top pagination - "下一頁"
    When(/I press right-top pagination - "([^"]*)"/, function(key, next) {
        //boothSearch
        this.stand.rightTopPageAct(key).then(
            function(boothSearch) {
                
            }
        ).then(next, next);
    });

    // I pick category - "mei"
    When(/I pick category - "(.*)"/, function(key, next) {
        var world = this;
        //boothSearch
        this.stand.pickCategoryAs(key).then(
            function(amount) {
                world.request = amount;
            }
        ).then(next, next);
    });

    // I pick search filter - "長刊期商品"
    When(/I pick search filter - "(.*)"/, function(key, next) {
        //booth
        this.stand.pickFilterAs(key).then(
            function(booth) {
                //
            }
        ).then(next, next);
    });

    // I search "mei" from booth
    When(/I search "([^"]*)" from booth/, function(key, next) {
        var world = this;
        //booth
        this.stand.goSearch(key).then(
            function(boothSearch) {
                world.stand = boothSearch;
            }
        ).then(next, next);
    });

    /*------------------------ Then -------------------------*/

    // booth search - "icon cash" redirect function must correct
    Then(/^booth search - "([^"]*)" redirect function must correct$/, function(key, next) {
        var stand = this.stand, world = this;

        stand.getIcon(key).then(
            function(e) {
                stand.redirect(e, key, world.userId).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                );
            },
            function() {
                expect(false, key + ' missing').to.be.true;
            }
        ).then(next, next);
    });

    // current perPageAmount must be "25"
    Then(/^current perPageAmount must be "([^"]*)"$/, function(request, next) {
        this.stand.getPerPageAmount().then(
            function(perPageAmount) {
                expect(perPageAmount, 'perPageAmount match error').to.be.eq(Number(request));
            }
        ).then(next, next);
    });

    // current sorting must be "相關度"
    Then(/^current sorting must be "([^"]*)"$/, function(request, next) {
        this.stand.getCurrentSorting().then(
            function(sorting) {
                expect(sorting, 'sorting is empty').to.not.be.empty;
                expect(sorting, 'sorting match error').to.be.eq(request.trim());
            }
        ).then(next, next);
    });

    // current viewMode must be "圖文瀏覽"
    Then(/^current viewMode must be "([^"]*)"$/, function(request, next) {
        this.stand.getViewMode().then(
            function(viewMode) {
                expect(viewMode, 'viewMode is empty').to.not.be.empty;
                expect(viewMode, 'viewMode match error').to.be.eq(request.trim());
            }
        ).then(next, next);
    });

    // search request must match upper request
    Then(/search request must match upper request/, function(next) {
        var world = this;
        this.stand.getsearchRequest().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                expect(result, 'search request match error').to.be.eql(world.request);
            }
        ).then(next, next);
    });

    // I can get current search request 
    Then(/I can get current search request/, function(next) {
        var world = this;
        this.stand.getsearchRequest().then(
            function(request) {
                world.request = request;
            }
        ).then(next, next);
    });

    // current pagination must be "1"
    Then(/current pagination must be "(\d+)"/, function(page, next) {
        var request = Number(page);
        this.stand.getPagination().then(
            function(pagination) {
                expect(pagination, 'content is empty').to.not.be.empty;
                expect(pagination, 'pagination match error').to.be.eq(request);
            }
        ).then(next, next);
    });

    // booth search - "bidding info" must match request data
    Then(/^booth search - "(.*)" must match request data$/, function(key, next) {
        var request = new RegExp(this.testData.formats[key.replace(/\s/g, '')]);
        // console.log(request);

        this.stand.one(key).getInnerHtml().then(
            function(result) {
                // console.log(result);
                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'format match error').to.be.true;
            }
        ).then(next, next);
    });

    // none promote item price must match request data
    Then(/^none promote item price must match request data/, function(next) {
        var request = this.testData.nonePromotePrice;

        this.stand.one('itemPrice').getInnerHtml().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                result = Number(result.replace(/(\d+) 元/, '$1'));
                expect(result, 'item price match error').to.be.eq(request);
            }
        ).then(next, next);
    });

    // booth search - pagination (more than 10 page) must match request data
    Then(/^booth search - pagination \(more than 10 page\) must match request data$/, function(next) {
        var request = new RegExp(this.testData.formats['pagination(morethan10page)']);

        this.stand.one('left-bottompaginationlinks').getInnerHtml().then(
            function(result) {
                result = common.stripTags(result).replace(/\s+/gm, ' ').trim();
                console.log(result+'\n'+request);

                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'pagination(more than 10 page) match error').to.be.true;
            }
        ).then(next, next);
    });

    // booth search - pagination (less than 10 page) must match request data
    Then(/^booth search - pagination \(less than 10 page\) must match request data$/, function(next) {
        var request = new RegExp(this.testData.formats['pagination(lessthan10page)']);

        this.stand.one('left-bottompaginationlinks').getInnerHtml().then(
            function(result) {
                result = common.stripTags(result).replace(/\s+/gm, ' ').trim();
                expect(result, 'content is empty').to.not.be.empty;
                expect(request.test(result), 'pagination(less than 10 page) match error').to.be.true;
            }
        ).then(next, next);
    });

    // item price must match request data
    Then(/^item price must match request data/, function(next) {
        var request = this.testData.promotePrice;

        this.stand.one('itemPrice').getInnerHtml().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                result = Number(result.replace(/(\d+) 元/, '$1'));
                expect(result, 'item price match error').to.be.eq(request);
            }
        ).then(next, next);
    });    

    // result's order must correct
    Then(/result's order must correct/, function(next) {
        this.stand.isResultSortingCorrect(this.type, this.order).then(
            function(flag) {
                expect(flag, 'result sorting error').to.be.true;
            }
        ).then(next, next)
    });

    // sortings must match request data
    Then(/^sortings must match request data$/, function(next) {
        var request = this.testData.sortings;

        this.stand.getSortingTxts().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                expect(result, 'sortings match').to.be.eql(request);
            }
        ).then(next, next);
    });

    // booth search columes must match request data
    Then(/^booth search columes must match request data$/, function(next) {
        var request = this.testData.columes;

        this.stand.getColumes().then(
            function(result) {
                expect(result, 'content is empty').to.not.be.empty;
                expect(result, 'search columes match').to.be.eql(request);
            }
        ).then(next, next);
    });

    // viewMode must be "圖片瀏覽"
    Then(/viewMode must be "([^"]*)"/, function(viewMode, next) {
        //boothSearch
        this.stand.getViewMode().then(
            function(mode) {
                expect(mode, 'viewMode match error').to.eq(viewMode.trim());
            }
        ).then(next, next);
    });

    // set search preference - viewMode "圖文瀏覽" must success
    Then(/set search preference - .* "([^"]*)" must success/, function(setting, next) {
        //boothSearch
        this.stand.turnSearchPreferenceOn().then(
            function(boothSearch) {
                return boothSearch.setSearchPreferenceAs(setting);
            }
        ).then(
            function(boothSearch) {
                return boothSearch.goSearchPreferenceSubmit();
            }
        ).then(
            function(flag) {
                expect(flag, 'search preference set fail').to.be.true;
            },
            function(err) {
                //err catch
            }
        ).then(next, next);
    });

    // I can get search result amount
    Then(/I can get search result amount/, function(next) {
        var world = this;
        this.stand.getSearchResultAmount().then(
            function(amount) {
                world.request = amount;
            }
        ).then(next, next);
    });

    // booth search result amount must match request amount
    Then(/booth search result amount must match request amount/, function(next) {
        var request = this.request;
        //boothSearch
        this.stand.getSearchResultAmount().then(
            function(amount) {
                expect(amount, 'search result error').to.be.eq(request);
            }
        ).then(next, next);
    });

    // "buyNow price info" must same as "直購價：-"
    Then(/"([^"]*)" must same as "([^"]*)"/, function(key, request, next) {
        this.stand.one(key).getInnerHtml().then(
            function(content) {
                expect(content, key + "'s content is empty").to.not.be.empty;
                expect(content, 'content match error').to.be.eq(request);
            },
            function() {
                expect(false, key+' is missing').to.be.true;
            }
        ).then(next, next);
    });

    // item sell infomatin must match request pattern
    Then(/item sell infomatin must match request pattern/, function(next) {
        this.stand.one('itemSellInfo').getInnerHtml().then(
            function(content) {
                expect(content, "content is empty").to.not.be.empty;
                expect(/^直購價.*已售出.*/.test(content), 'content match error').to.be.true;
            },
            function() {
                expect(false, key+' is missing').to.be.true;
            }
        ).then(next, next);
    });

    // item bidding infomatin must match request pattern
    Then(/item bidding infomatin must match request pattern/, function(next) {
        this.stand.one('itemSellInfo').getInnerHtml().then(
            function(content) {
                expect(content, "content is empty").to.not.be.empty;
                expect(/^目前出價.*出價次數.*/.test(content), 'content match error').to.be.true;
            },
            function() {
                expect(false, key+' is missing').to.be.true;
            }
        ).then(next, next);
    });
};
module.exports = booth;