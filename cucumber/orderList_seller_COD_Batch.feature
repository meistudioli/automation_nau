Feature: orderList_seller_COD
    As a user of auction
    After I visit orderListSeller
    orderListSeller modules should works well

    cls & node suiteQueue.js COD+partition=beta+tags=@mei


    Background: login as "seller_store_b2c" and visit "itemPage - buyNow - basic"
        Given I login as "seller_store_b2c"
        And I visit "orderList(Seller)"


    @C4793759 @REGRESSION
    Scenario: [賣家][訂單列表][批次功能][執行出貨] 選單內容
        When I filter order by payType - "all"
        #And I pick batch as "尚未出貨"
        Then batch operate - ship's options must match request data


    @C4793760 @REGRESSION
    Scenario: [賣家][訂單列表][批次功能][執行出貨-郵局] 尚未出貨訂單可執行出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I pick all orders
        Then "toolbar - delivery" redirect function must correct


    @C4793761 @FUNCTIONALITY
    Scenario: [賣家][訂單列表][批次功能][執行出貨-郵局] breadcrumb 正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I pick all orders
        Then "toolbar - delivery" redirect function must correct
        Given I have already in "codMultiDeliver"
        Then codMultiDeliver - breadcrumb must match request data


    @C4793762 @FUNCTIONALITY
    Scenario: [賣家][訂單列表][批次功能][執行出貨-郵局] 執行出貨之標題正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I pick all orders
        Then "toolbar - delivery" redirect function must correct
        Given I have already in "codMultiDeliver"
        Then codMultiDeliver - breadcrumb must match request data