Feature: Dragon series - 「example」


    @E2E @CREATEBASIC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @E2E @CREATEBASICONELAYERSPEC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec(layerx1) item                                   
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @E2E @C3790
    Scenario: [商品頁][商品資訊][商品標題]顯示               
        Given I visit "itemPage - buyNow - basic" 
        Then "item title" must match request data 


    @E2E @C3792
    Scenario: [商品頁][商品資訊][商品副標題]顯示              
        Given I visit "itemPage - buyNow - basic" 
        Then "itemBrief" must match request data  


    @C485 @BETA @PP @PROD @E2E
    Scenario: [賣家動態][上架中商品]tab顯示上架中的總件數                                  
        Given I login as "seller_pp_b2c"                                   
        And I pass "seller_pp_b2c" DID                                     
        And I visit "myAuction"                                            
        When I click seller dashboard tab - "on sale item"                 
        Then I can get seller dashboard tab - "on sale item"'s amount info 
        Given I visit "item management"                                    
        When I filter item by "all"                                        
        Then I can get total item amount                                   
        And the upper amount infos must equal each other                   


    @E2E @C3796
    Scenario: [商品頁][商品資訊][原價][無促銷價]顯示定價         
        Given I visit "itemPage - buyNow - basic" 
        Then "item price" must match request data 


    @C3963 @E2E @BETA @PP @PROD
    Scenario: [商品頁][加入購物車][已登入]click button           
        Given I login as "buyer_general"                
        Given I visit "itemPage - buyNow - basic"       
        Then add to shopping cart function must correct 


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        