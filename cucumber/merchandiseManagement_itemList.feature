Feature: Merchandise Management: Item List
    As a user of auction
    After I visit Merchandise Management
    Merchandise Management modules should works well
    
    ※ need to mutantOn dataSrc: basic
    node suiteQueue.js mutantOn

	Background: login as "seller_store_b2c" and visit "itemPage - buyNow - basic"
		Given I login as "seller_store_b2c"
		And I visit "item management"


    @C39316 @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][上架中][直購品][下架]click確定
    	When I filter item by "buynow"
    	And I filter item by status - "onshelf"
    	And I pick search type as "mid"
    	And I search item as "item - buyNow - basic"'s id
    	Then search result must have more than "1" record
    	And offshelf the first row item must success


    @C39352 @E2E @PP @PROD
    Scenario: [管理商品][列表][商品][操作][已下架][直購品][沒賣出][上架]click確定 	
    	When I filter item by "buynow"
    	And I filter item by status - "offshelf"
    	And I pick search type as "mid"
    	And I search item as "item - buyNow - basic"'s id
    	Then search result must have more than "1" record
    	And onshelf the first row item must success
    	

    @C4796513 @E2E @PP @PROD
    Scenario: [商品管理][列表][直購品][標題][編輯][上架中] 標題可編輯成功
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item title as "[直購品] 測試商品請勿下標, 所有訂單一律取消 - mei - m" must correct


    @C4796538 @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][標題][編輯][上架中] 標題可編輯成功
        When I filter item by "bidding"                       
        And I filter item by status - "onshelf"               
        And I pick search type as "mid"                       
        And I search item as "item - bidding - basic"'s id    
        Then search result must have more than "1" record
        Then modify item title as "[競標] 測試商品請勿下標, 所有訂單一律取消 - mei - m" must correct


    @C4796538X @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][標題][編輯][上架中] 標題可編輯成功
        When I filter item by "bidding"                       
        And I filter item by status - "onshelf"               
        And I pick search type as "mid"                       
        And I search item as "item - bidding - buynow"'s id    
        Then search result must have more than "1" record
        Then modify item title as "[競標] 測試商品請勿下標, 所有訂單一律取消 - mei - m" must correct


    @C4796565 @E2E @PP @PROD
    Scenario: [商品管理][列表][直購品][金額][促銷價][編輯][上架中] 金額可編輯成功
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item price as "9999" must correct


    @C4796584 @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][金額][起標價][編輯][上架中] 金額可編輯成功
        When I filter item by "bidding"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - bidding - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item price as "9999" must correct


    @C4796667 @E2E @PP @PROD
    Scenario: [商品管理][列表][全店運] 直購品可成功套用全店運費
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record
        When I pick all items
        Then the first row item apply shipping-preference must success



    @ITEMSTOCKMODIFY @E2E @PP @PROD @C4797511
    Scenario: [商品管理][列表][直購品][庫存][編輯][上架中] 庫存可編輯成功
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item stock as "33" must correct


    @C4797529 @E2E @PP @PROD
    Scenario: [商品管理][列表][競標品][庫存][編輯][上架中] 庫存可編輯成功
        When I filter item by "bidding"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"                   
        And I search item as "item - bidding - basic"'s id 
        Then search result must have more than "1" record 
        Then modify item stock as "33" must correct


    @BARGAINSWITCH @E2E @PP @PROD
    Scenario: [商品管理][列表][直購品][議價][編輯][上架中] 議價 on / off 可成功
        When I filter item by "buynow"                    
        And I filter item by status - "onshelf"           
        And I pick search type as "mid"          
        And I search item as "item - buyNow - basic"'s id 
        Then search result must have more than "1" record 
        Then bargain switch function must correct