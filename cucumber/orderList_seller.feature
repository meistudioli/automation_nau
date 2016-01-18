Feature: orderList_seller
    As a user of auction
    After I visit orderListSeller
    orderListSeller modules should works well
    
    ※ need to mutantOn dataSrc: basic
    node suiteQueue.js mutantOn


    Background: login as "seller_store_b2c" and visit "itemPage - buyNow - basic"
        Given I login as "seller_store_b2c"
        And I visit "orderList(Seller)"


    @C49035 @E2E @PP @PROD
    Scenario: [訂單列表][Search Bar]使用訂單編號搜尋關鍵字
        When I filter order by payType - "all"
        And I search order as specific id
        Then search result must exactly be "1"


    @C4627962 @E2E @PP @PROD
    Scenario: [取消訂單][其它原因取消]成功取消
        Given I login as "seller_store_b2c"     
        And I visit "orderList(Seller)"         
        When I filter order by payType - "all"  
        And I search order as specific id       
        Then search result must exactly be "1"
        And cancel order with reason - "賣家取消訂單" must correct

        #And order operation - "取消訂單" redirect function must correct
        #When I cancel order by reason - "其他"
        #And I filled reason with "賣家取消訂單"
        #Then I confirm cancel order must correct


    @CVSEXECUTESHIPMENT @E2E @PP @PROD
    Scenario: [訂單列表][尚未出貨][CVS] 點擊訂單操作之執行出貨
        When I filter order by payType - "all"
        And I search order as specific id
        Then search result must exactly be "1"
        And "CVS" execute shipment must correct 


    @RATINGSELLER2BUYER @E2E @PP @PROD
    Scenario: [訂單列表][給買家評價] 點擊訂單操作之給買家評價且成功給評
        When I filter order by payType - "all"
        And I search order as specific id
        Then search result must exactly be "1"
        And rate buyer as "正評+1" must correct


    @CODEXECUTESHIPMENT @E2E @PP @PROD
    Scenario: [訂單列表][尚未出貨][COD] 點擊訂單操作之執行出貨
        When I filter order by payType - "all"
        And I search order as specific id
        Then search result must exactly be "1"
        And "COD" execute shipment must correct 