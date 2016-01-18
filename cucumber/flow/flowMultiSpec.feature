Feature: flow multi-spec item


    @E2E @CREATEBASIC  
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic
        Given I login as "seller_store_b2c"
        #Given I pass "seller_store_b2c" DID
        When I create a basic multi-spec item
        | itemTitle                                         | itemBrief                                   | salePrice  | itemDesc                                    | payType            | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10         | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod     | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |

        Then I can get upper item's merchandise id


    @E2E @CREATEBASICONELAYERSPEC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic
        Given I login as "seller_store_b2c"
        When I create a basic multi-spec(layerx1) item
        | itemTitle                                         | itemBrief                                   | salePrice  | itemDesc                                    | payType            | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10         | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod     | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |

        Then I can get upper item's merchandise id


    @E2E @CREATEBASICNONESPEC
    Scenario: create a basic none-spec item & plug data in shadow.ITEM.buyNow.basic
        Given I login as "seller_store_b2c"
        #Given I pass "seller_store_b2c" DID
        When I create a basic none-spec item
        | itemTitle                                         | itemBrief                                   | salePrice  | itemDesc                                    | payType            | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount | bargainSwitch | bargainRejectPrice |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10         | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod     | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           | 1             | 1                  |

        Then I can get upper item's merchandise id


    @E2E @CREATEBASICWITHSHIPTYPE
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic
        Given I login as "seller_store_b2c"
        When I create a basic multi-spec item
        | itemTitle                                         | itemBrief                                   | salePrice  | itemDesc                                    | payType            | barCode       | itemNumber | totalQuantity | videoSet                                        | shipType | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10         | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod     | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/121341504424 | sff_sg   | 9           |

        Then I can get upper item's merchandise id


    @E2E @C3790
    Scenario: [商品頁][商品資訊][商品標題]顯示
        Given I visit "itemPage - buyNow - basic"
        Then "item title" must match request data


    @E2E @C3792
    Scenario: [商品頁][商品資訊][商品副標題]顯示
        Given I visit "itemPage - buyNow - basic"
        Then "itemBrief" must match request data


	@E2E @C3796
	Scenario: [商品頁][商品資訊][原價][無促銷價]顯示定價
        Given I visit "itemPage - buyNow - basic"
        Then "item price" must match request data


    @C3963 @E2E @BETA @PP @PROD 
    Scenario: [商品頁][加入購物車][已登入]click button
        Given I login as "buyer_general"
        Given I visit "itemPage - buyNow - basic"
        Then add to shopping cart function must correct


    @E2E @BETA @PP @PROD @BUYMULTISPECITEM711
    Scenario: buy item through 711
        Given I login as "buyer_general"
        Given I visit "itemPage - buyNow - basic"
        When I buy item through "711"
        Then order must be ready


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMTHUSFAMILYMART
    Scenario: buy item through FamilyMart
        Given I login as "buyer_general"
        Given I visit "itemPage - buyNow - basic"
        When I buy item through "family"
        Then order must be ready


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMTHUSCOD
    Scenario: buy item through COD
        Given I login as "buyer_general"
        Given I visit "itemPage - buyNow - basic"
        When I buy item through "cod"
        Then order must be ready


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMWITHSHIPTYPEFACE2FACE
    Scenario: buy item with ShipType - Face to Face
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        When I buy item directly with shipType - "Face2Face"
        Then order must be ready


   @E2E @BETA @PP @PROD @ORDERCONFIRMWITHSHIPTYPEFACE2FACE
   Scenario: visit  ordercomfirm with ShipType - Face to Face & check receiver info
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        When I visit ordercomfirm with shipType - "Face2Face"
        Then "receiverCity" must exist
        And "receiverDistrict" must exist
        And "receiverZipcode" must exist
        And "receiverAddress" must exist


    @E2E @BETA @PP @PROD @BUYBARGAINTHUSCOD
    Scenario: buy bargain item through COD
        Given I login as "buyer_general"
        When I buy bargain item through COD
        Then order must be ready


    @E2E @OFFSHELFBASIC 
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow
        Given I login as "seller_store_b2c"
        #Given I pass "seller_store_b2c" DID
        Then offshelf the basic multi-spec item must success
