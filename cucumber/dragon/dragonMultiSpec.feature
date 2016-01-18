Feature: Dragon series - 「dragonMultiSpec」


    @E2E @CREATEBASIC
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/125311009171 | 9           |
        Then I can get upper item's merchandise id                                       


    @C39316 @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][上架中][直購品][下架]click確定   
        Given I login as "seller_store_b2c"               
        And I visit "item management"                     
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        And offshelf the first row item must success      


    @C39352 @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][已下架][直購品][沒賣出][上架]click確定   
        Given I login as "seller_store_b2c"                    
        And I visit "item management"                          
        When I filter item by "buynow"                         
        And I filter item by status - "offshelf"               
        And I pick search type as "mid"                        
        And I search item as "item - buyNow - basic"'s id      
        Then search result must have more than "1" record      
        And onshelf the first row item must success            


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


    @C3712 @E2E @PP @PROD
    Scenario: [商品頁]Header                       
        Given I visit "itemPage - buyNow - basic" 
        Then header must exist                    


    @C3713 @E2E @PP @PROD
    Scenario: [商品頁]Footer                       
        Given I visit "itemPage - buyNow - basic" 
        Then footer must exist                    


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


    @C4115 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]顯示上傳的第1~9張圖                              
        Given I visit "itemPage - buyNow - basic"                               
        When I roll to "item navigation"                                        
        Then "navigation - item info" must exist                                
        And "navigation - item info - images" amount must exactly be "9" pieces 


    @C4106 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]賣家設的商品描述(文字)    
        Given I visit "itemPage - buyNow - basic"      
        When I roll to "item navigation"               
        Then "navigation - item info" must exist       
        And "item description" must match request data 


    @C3826 @FUNCTIONALITY @PP @PROD
    Scenario: [商品頁][商品資訊][規格][規格一][圖片][有綁商品圖]點選規格連動預覽模組                        
        Given I visit "itemPage - buyNow - basic"                                
        Then item gallery carousel function must correct after press spec - "超小" 


    @C3735 @E2E @PP @PROD
    Scenario: [商品頁][商品圖][主圖區][主圖>1400x1400]放大圖顯示   
        Given I visit "itemPage - buyNow - basic"    
        Then "main image" must exist                 
        And magnifier function must correct          


    @C4796099 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]影片播放       
        Given I visit "itemPage - buyNow - basic" 
        When I roll to "item navigation"          
        Then "video section" must exist           
        And video function must correct           


    @C598735 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][已回覆]顯示已回覆                                    
        Given I login as "buyer_general"                                          
        And I visit "itemPage - buyNow - basic"                                   
        Then I make a quiz with content - "買家 "buyer_general" 發問"                 
        Given I visit "myAuction"                                                 
        When I click buyer dashboard tab - "item Qna"                             
        Given I login as "seller_store_b2c"                                       
        And I pass "seller_store_b2c" DID                                         
        And I visit "item Qna list(Seller)"                                       
        Then reply for "itemPage - buyNow - basic" quiz must correct              
        Given I login as "buyer_general"                                          
        And I visit "myAuction"                                                   
        When I click buyer dashboard tab - "item Qna"                             
        Then "BuyerDashboard List - item Qna - operation"'s content must be "已回覆" 


    @C598882 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家][刪除]成功執行刪除                          
        Given I login as "buyer_general"                  
        And I visit "myAuction"                           
        Given I visit "itemPage - buyNow - basic"         
        Then seller has been added in favorite store list 
        Given I visit "myAuction"                         
        When I roll to "footer"                           
        Then "favroite store" must exist                  
        And remove first favoritestore must success       


    @C598800 @E2E @BETA @PP @PROD
    Scenario: [追蹤商品][直購商品][刪除]成功執行刪除               
        Given I login as "buyer_general"             
        And I visit "itemPage - buyNow - basic"      
        Then item has been added in watch list       
        Given I visit "myAuction"                    
        When I roll to "footer"                      
        Then "watch list" must exist                 
        And remove first watchList item must success 


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


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMTHUSCOD
    Scenario: buy item through COD              
        Given I login as "buyer_general"          
        Given I visit "itemPage - buyNow - basic" 
        When I buy item through "cod"             
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
        