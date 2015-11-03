Feature: Dragon series - 「dragonItemListModifyBidding」


    @E2E @CREATEBIDDINGBASIC
    Scenario: create a bidding item & plug data in shadow.ITEM.bidding.basic   
        Given I login as "seller_store_b2c"                                      
        When I create a basic bidding item                                       
        | itemTitle                     | itemBrief               | startPrice | itemDesc                | payType        | imageAmount | videoSet                                        |
        | [競標] 測試商品請勿下標, 所有訂單一律取消 - mei | [競標] 測試商品請勿下標, 所有訂單一律取消 | 10         | [競標] 測試商品請勿下標, 所有訂單一律取消 | family,711,cod | 9           | http://meistudioli.tumblr.com/post/125311009171 |
        Then I can get upper item's merchandise id                               


    @C4796584 @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][金額][起標價][編輯][上架中] 金額可編輯成功   
        Given I login as "seller_store_b2c"                 
        And I visit "item management"                       
        When I filter item by "bidding"                     
        And I filter item by status - "onshelf"             
        And I pick search type as "mid"                     
        And I search item as "item - bidding - basic"'s id  
        Then search result must have more than "1" record   
        Then modify item price as "9999" must correct       


    @E2E @OFFSHELFBIDDINGBASIC
    Scenario: offshelf the basic bidding item & remove data from shadowData.ITEM.bidding   
        Given I login as "seller_store_b2c"                                                  
        Then offshelf the basic bidding item must success                                    
        