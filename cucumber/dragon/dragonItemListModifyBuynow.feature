Feature: Dragon series - 「dragonItemListModifyBuynow」


    @E2E @CREATEBASIC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @C4796513 @E2E @PP @PROD
    Scenario: [商品管理][列表][直購品][標題][編輯][上架中] 標題可編輯成功                                
        Given I login as "seller_store_b2c"                                         
        And I visit "item management"                                               
        When I filter item by "buynow"                                              
        And I filter item by status - "onshelf"                                     
        And I pick search type as "mid"                                             
        And I search item as "item - buyNow - basic"'s id                           
        Then search result must have more than "1" record                           
        Then modify item title as "[直購品] 測試商品請勿下標, 所有訂單一律取消 - mei - m" must correct 


    @C4796565 @E2E @PP @PROD
    Scenario: [商品管理][列表][直購品][金額][促銷價][編輯][上架中] 金額可編輯成功   
        Given I login as "seller_store_b2c"                 
        And I visit "item management"                       
        When I filter item by "buynow"                      
        And I filter item by status - "onshelf"             
        And I pick search type as "mid"                     
        And I search item as "item - buyNow - basic"'s id   
        Then search result must have more than "1" record   
        Then modify item price as "9999" must correct       


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        