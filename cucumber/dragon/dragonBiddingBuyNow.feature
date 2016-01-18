Feature: Dragon series - 「dragonBiddingBuyNow」


    @E2E @CREATEBUYNOWCLEAR
    Scenario: create a buyNow item & plug data in shadow.ITEM.buyNow.clear   
        Given I login as "seller_store_b2c"                                    
        When I create a clear cart item                                        
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType    | imageAmount | shipFee |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family | 1           | 100     |
        Then I can get upper item's merchandise id                             


    @E2E @CREATEBIDDINGBUYNOW
    Scenario: create a bidding item & plug data in shadow.ITEM.bidding.buynow   
        Given I login as "seller_store_b2c"                                       
        When I create a buynow bidding item                                       
        | itemTitle                     | itemBrief               | startPrice | itemDesc                | payType        | imageAmount | videoSet                                        | buynowPrice |
        | [競標] 測試商品請勿下標, 所有訂單一律取消 - mei | [競標] 測試商品請勿下標, 所有訂單一律取消 | 10         | [競標] 測試商品請勿下標, 所有訂單一律取消 | family,711,cod | 9           | http://meistudioli.tumblr.com/post/125311009171 | 20          |
        Then I can get upper item's merchandise id                                


    @C39332X @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][上架中][競標品][無人出價]click取消出價   
        Given I login as "seller_store_b2c"                   
        And I visit "item management"                         
        When I filter item by "bidding"                       
        And I filter item by status - "onshelf"               
        And I pick search type as "mid"                       
        And I search item as "item - bidding - buynow"'s id   
        Then search result must have more than "1" record     
        And offshelf the first row item must success          


    @C39374X @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][已下架][競標品][沒賣出]click重新刊登   
        Given I login as "seller_store_b2c"                  
        And I visit "item management"                        
        When I filter item by "bidding"                      
        And I filter item by status - "offshelf"             
        And I pick search type as "mid"                      
        And I search item as "item - bidding - buynow"'s id  
        Then search result must have more than "1" record    
        And onshelf the first row item must success          


    @C4796538X @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][標題][編輯][上架中] 標題可編輯成功                               
        Given I login as "seller_store_b2c"                                        
        And I visit "item management"                                              
        When I filter item by "bidding"                                            
        And I filter item by status - "onshelf"                                    
        And I pick search type as "mid"                                            
        And I search item as "item - bidding - buynow"'s id                        
        Then search result must have more than "1" record                          
        Then modify item title as "[競標] 測試商品請勿下標, 所有訂單一律取消 - mei - m" must correct 


    @C4343X @E2E @PP @PROD
    Scenario: [商品頁]Header                         
        Given I visit "itemPage - bidding - buynow" 
        Then header must exist                      


    @C4344X @E2E @PP @PROD
    Scenario: [商品頁]Footer                         
        Given I visit "itemPage - bidding - buynow" 
        Then footer must exist                      


    @C4394X @E2E @PP @PROD
    Scenario: [商品頁][商品資訊][商品標題]顯示                 
        Given I visit "itemPage - bidding - buynow" 
        Then "item title" must match request data   


    @C4396X @E2E @PP @PROD
    Scenario: [商品頁][商品資訊][商品副標題]顯示                
        Given I visit "itemPage - bidding - buynow" 
        Then "itemBrief" must match request data    


    @C4442X @E2E @PP @PROD
    Scenario: [商品頁][商品資訊][出價模組]顯示                 
        Given I visit "itemPage - bidding - buynow" 
        Then "bid module" must exist                


    @C4505X @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]顯示上傳的第1~9張圖                              
        Given I visit "itemPage - bidding - buynow"                             
        When I roll to "item navigation"                                        
        Then "navigation - item info" must exist                                
        And "navigation - item info - images" amount must exactly be "9" pieces 


    @C3735XX @E2E @PP @PROD
    Scenario: [商品頁][商品圖][主圖區][主圖>1400x1400]放大圖顯示   
        Given I visit "itemPage - bidding - buynow"  
        Then "main image" must exist                 
        And magnifier function must correct          


    @C4796099XX @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]影片播放         
        Given I visit "itemPage - bidding - buynow" 
        When I roll to "item navigation"            
        Then "video section" must exist             
        And video function must correct             


    @C4507X @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]賣家設的商品描述(文字)           
        Given I visit "itemPage - bidding - buynow"           
        When I roll to "item navigation"                      
        Then "navigation - item info" must exist              
        And item description(bidding) must match request data 


    @C4637X @E2E @PP @PROD
    Scenario: [出價模組][預覽]模組顯示                    
        Given I login as "buyer_general"          
        And I visit "itemPage - bidding - buynow" 
        When I bid as price - "10"                
        Then "bidPreview" must exist              


    @C598735XX @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][已回覆]顯示已回覆                                    
        Given I login as "buyer_general"                                          
        And I visit "itemPage - bidding - buynow"                                 
        Then I make a quiz with content - "買家 "buyer_general" 發問"                 
        Given I visit "myAuction"                                                 
        When I click buyer dashboard tab - "item Qna"                             
        Given I login as "seller_store_b2c"                                       
        And I visit "item Qna list(Seller)"                                       
        Then reply for "itemPage - bidding - buynow" quiz must correct            
        Given I login as "buyer_general"                                          
        And I visit "myAuction"                                                   
        When I click buyer dashboard tab - "item Qna"                             
        Then "BuyerDashboard List - item Qna - operation"'s content must be "已回覆" 


    @C598882XX @E2E @BETA @PP @PROD
    Scenario: [最愛賣家][刪除]成功執行刪除                          
        Given I login as "buyer_general"                  
        And I visit "myAuction"                           
        Given I visit "itemPage - bidding - buynow"       
        Then seller has been added in favorite store list 
        Given I visit "myAuction"                         
        When I roll to "footer"                           
        Then "favroite store" must exist                  
        And remove first favoritestore must success       


    @C598800XX @E2E @BETA @PP @PROD
    Scenario: [追蹤商品][直購商品][刪除]成功執行刪除               
        Given I login as "buyer_general"             
        And I visit "itemPage - bidding - buynow"    
        Then item has been added in watch list       
        Given I visit "myAuction"                    
        When I roll to "footer"                      
        Then "watch list" must exist                 
        And remove first watchList item must success 


    @E2E @BETA @PP @PROD @BUYBIDDINGBUYNOWTHUS711
    Scenario: buy bidding item through 711            
        Given I login as "buyer_general"                
        And I visit "itemPage - bidding - buynow"       
        And I bidMax this item                          
        When I buy the upper bidding item through "711" 
        Then order must be ready                        


    @CVSEXECUTESHIPMENT @E2E @PP @PROD
    Scenario: [訂單列表][尚未出貨][CVS] 點擊訂單操作之執行出貨   
        Given I login as "seller_store_b2c"     
        And I visit "orderList(Seller)"         
        When I filter order by payType - "all"  
        And I search order as specific id       
        Then search result must exactly be "1"  
        And "CVS" execute shipment must correct 


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


    @E2E @CREATEBIDDINGBUYNOW
    Scenario: create a bidding item & plug data in shadow.ITEM.bidding.buynow   
        Given I login as "seller_store_b2c"                                       
        When I create a buynow bidding item                                       
        | itemTitle                     | itemBrief               | startPrice | itemDesc                | payType        | imageAmount | videoSet                                        | buynowPrice |
        | [競標] 測試商品請勿下標, 所有訂單一律取消 - mei | [競標] 測試商品請勿下標, 所有訂單一律取消 | 10         | [競標] 測試商品請勿下標, 所有訂單一律取消 | family,711,cod | 9           | http://meistudioli.tumblr.com/post/125311009171 | 20          |
        Then I can get upper item's merchandise id                                


    @E2E @BETA @PP @PROD @BUYBIDDINGBUYNOWTHUSFAMILY
    Scenario: buy bidding item through family            
        Given I login as "buyer_general"                   
        And I visit "itemPage - bidding - buynow"          
        And I bidMax this item                             
        When I buy the upper bidding item through "family" 
        Then order must be ready                           


    @C49035 @E2E @PP @PROD
    Scenario: [訂單列表][Search Bar]使用訂單編號搜尋關鍵字   
        Given I login as "seller_store_b2c"     
        And I visit "orderList(Seller)"         
        When I filter order by payType - "all"  
        And I search order as specific id       
        Then search result must exactly be "1"  


    @E2E @CREATEBIDDINGBUYNOW
    Scenario: create a bidding item & plug data in shadow.ITEM.bidding.buynow   
        Given I login as "seller_store_b2c"                                       
        When I create a buynow bidding item                                       
        | itemTitle                     | itemBrief               | startPrice | itemDesc                | payType        | imageAmount | videoSet                                        | buynowPrice |
        | [競標] 測試商品請勿下標, 所有訂單一律取消 - mei | [競標] 測試商品請勿下標, 所有訂單一律取消 | 10         | [競標] 測試商品請勿下標, 所有訂單一律取消 | family,711,cod | 9           | http://meistudioli.tumblr.com/post/125311009171 | 20          |
        Then I can get upper item's merchandise id                                


    @E2E @BETA @PP @PROD @BUYBIDDINGBUYNOWTHUSCOD
    Scenario: buy bidding item through cod            
        Given I login as "buyer_general"                
        And I visit "itemPage - bidding - buynow"       
        And I bidMax this item                          
        When I buy the upper bidding item through "cod" 
        Then order must be ready                        


    @C49035 @E2E @PP @PROD
    Scenario: [訂單列表][Search Bar]使用訂單編號搜尋關鍵字   
        Given I login as "seller_store_b2c"     
        And I visit "orderList(Seller)"         
        When I filter order by payType - "all"  
        And I search order as specific id       
        Then search result must exactly be "1"  


    @E2E @OFFSHELFCLEAR
    Scenario: offshelf the clear cart item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                              
        Then offshelf the clear cart item must success                                   
        