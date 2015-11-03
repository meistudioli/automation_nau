Feature: Dragon series - 「dragonOrderMaker」


    @E2E @CREATEBASIC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMTHUSFAMILYMART
    Scenario: buy item through FamilyMart       
        Given I login as "buyer_general"          
        Given I visit "itemPage - buyNow - basic" 
        When I buy item through "family"          
        Then order must be ready                  


    @C4627962 @E2E @PP @PROD
    Scenario: [取消訂單][其它原因取消]成功取消                           
        Given I login as "seller_store_b2c"                  
        And I visit "orderList(Seller)"                      
        Given I login as "seller_store_b2c"                  
        And I visit "orderList(Seller)"                      
        When I filter order by payType - "all"               
        And I search order as specific id                    
        Then search result must exactly be "1"               
        And cancel order with reason - "賣家取消訂單" must correct 


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        