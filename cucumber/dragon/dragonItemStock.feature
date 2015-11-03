Feature: Dragon series - 「dragonItemStock」


    @E2E @CREATEBASIC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @ITEMSTOCKMODIFY @E2E @PP @PROD @C4797511
    Scenario: [商品管理][列表][直購品][庫存][編輯][上架中] 庫存可編輯成功      
        Given I login as "seller_store_b2c"               
        And I visit "item management"                     
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item stock as "33" must correct       


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   


    @E2E @CREATEBASICONELAYERSPEC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec(layerx1) item                                   
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @ITEMSTOCKMODIFY @E2E @PP @PROD @C4797511
    Scenario: [商品管理][列表][直購品][庫存][編輯][上架中] 庫存可編輯成功      
        Given I login as "seller_store_b2c"               
        And I visit "item management"                     
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item stock as "33" must correct       


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   


    @E2E @CREATEBIDDINGBASIC
    Scenario: create a bidding item & plug data in shadow.ITEM.bidding.basic   
        Given I login as "seller_store_b2c"                                      
        When I create a basic bidding item                                       
        | itemTitle                     | itemBrief               | startPrice | itemDesc                | payType        | imageAmount | videoSet                                        |
        | [競標] 測試商品請勿下標, 所有訂單一律取消 - mei | [競標] 測試商品請勿下標, 所有訂單一律取消 | 10         | [競標] 測試商品請勿下標, 所有訂單一律取消 | family,711,cod | 9           | http://meistudioli.tumblr.com/post/125311009171 |
        Then I can get upper item's merchandise id                               


    @C4797529 @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][庫存][編輯][上架中] 庫存可編輯成功       
        Given I login as "seller_store_b2c"                
        And I visit "item management"                      
        When I filter item by "bidding"                    
        And I filter item by status - "onshelf"            
        And I pick search type as "mid"                    
        And I search item as "item - bidding - basic"'s id 
        Then search result must have more than "1" record  
        Then modify item stock as "33" must correct        


    @E2E @OFFSHELFBIDDINGBASIC
    Scenario: offshelf the basic bidding item & remove data from shadowData.ITEM.bidding   
        Given I login as "seller_store_b2c"                                                  
        Then offshelf the basic bidding item must success                                    
        