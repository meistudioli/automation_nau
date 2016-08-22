Feature: Dragon series - 「dragonI13n」


    @E2E @CREATEBASICNONESPEC
    Scenario: create a basic none-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                             
        When I create a basic none-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount | bargainSwitch | bargainRejectPrice | hashtags  |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           | 1             | 1                  | mei,lauMu |
        Then I can get upper item's merchandise id                                      


    @GA @E2E @PP @PROD
    Scenario: [商品頁]Google Analytics beacon sending   
        Given I visit "itemPage - buyNow - basic"      
        Then Google Analytics beacon must correct      
        | contentGroup1 | seller      | trackingId    | spaceid    | subtype | itemname                       | sellerName |
        | itempage      | Y9311276010 | UA-71726228-3 | 2092111773 | buynow  | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | mei 新開的店   |


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        