Feature: Dragon series - 「dragonBargain」


    @E2E @CREATEBASICNONESPEC
    Scenario: create a basic none-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                             
        When I create a basic none-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount | bargainSwitch | bargainRejectPrice |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           | 1             | 1                  |
        Then I can get upper item's merchandise id                                      


    @CBARGAIN @E2E @PP @PROD
    Scenario: [商品頁]誠可議                          
        Given I visit "itemPage - buyNow - basic" 
        Then "mark-bargain" must exist            


    @BARGAINON @E2E @PP @PROD
    Scenario: [商品頁]buyer can on a bargain event   
        Given I login as "buyer_general"            
        And I visit "itemPage - buyNow - basic"     
        Then I bargain as price "5" must correct    


    @BARGAINACCETP @E2E @PP @PROD
    Scenario: [商品頁]seller can accept a bargain event   
        Given I login as "seller_store_b2c"              
        And I visit "itemPage - buyNow - basic"          
        Then I accept a specific bargain must correct    


    @E2E @BETA @PP @PROD @BUYBARGAINTHUSCOD
    Scenario: buy bargain item through COD   
        Given I login as "buyer_general"       
        When I buy bargain item through COD    
        Then order must be ready               


    @CODEXECUTESHIPMENT @E2E @PP @PROD
    Scenario: [訂單列表][尚未出貨][COD] 點擊訂單操作之執行出貨   
        Given I login as "seller_store_b2c"     
        And I visit "orderList(Seller)"         
        When I filter order by payType - "all"  
        And I search order as specific id       
        Then search result must exactly be "1"  
        And "COD" execute shipment must correct 


    @RATINGBUYER2SELLER @E2E @PP @PROD
    Scenario: [訂單列表][給賣家評價] 點擊訂單操作之給賣家評價且成功給評   
        Given I login as "buyer_general"          
        And I visit "orderList(Buyer)"            
        Then rate seller as "正評+1" must correct   


    @RATINGSELLER2BUYER @E2E @PP @PROD
    Scenario: [訂單列表][給買家評價] 點擊訂單操作之給買家評價且成功給評   
        Given I login as "seller_store_b2c"       
        And I visit "orderList(Seller)"           
        When I filter order by payType - "all"    
        And I search order as specific id         
        Then search result must exactly be "1"    
        And rate buyer as "正評+1" must correct     


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        