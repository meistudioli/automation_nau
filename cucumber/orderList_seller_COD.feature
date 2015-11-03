Feature: orderList_seller_COD
    As a user of auction
    After I visit orderListSeller
    orderListSeller modules should works well

    cls & node suiteQueue.js COD+partition=beta+tags=@mei


    Background: login as "seller_store_b2c" and visit "itemPage - buyNow - basic"
        Given I login as "seller_store_b2c"
        And I visit "orderList(Seller)"


    @C4793884 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單列表][尚未出貨] 點擊操作圖示之執行出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And "the 1st item deliever" redirect function must correct


    @C4793885 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單列表][尚未出貨] 點擊訂單操作之執行出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And order operation - "執行出貨" redirect function must correct


    @C4793886 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單列表][尚未出貨] 取消執行出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And "the 1st item deliever" redirect function must correct
        Given I have already in "codDeliver"
        Then "btnCancel" redirect function must correct


    @C4793887 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單列表][成功要號] 點擊操作圖示之列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        And order operation - "執行出貨" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And "the 1st itemd print button" redirect function must correct

    
    @C4793888 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單列表][成功要號] 點擊訂單操作之列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        And order operation - "執行出貨" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And order operation - "列印出貨單" redirect function must correct


    @C4793734 @REGRESSION
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 點擊操作圖示之執行出貨    
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct


    @C4793735 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 點擊訂單操作之執行出貨  
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        And order operation - "執行出貨" redirect function must correct
    

    @C4793736 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 執行出貨之 breadcrumb 正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then COD item delivery - breadcrumb must match request data


    @C4793737 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 執行出貨之標題正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then COD item delivery - "title" must match request data


    @C4793739 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 執行出貨之運送資訊正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then COD item delivery - "ship info" must match request data


    @C4793740 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 執行出貨之買家收件資料正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then COD item delivery - "reciver info" must match request data


    @C4793741 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 執行出貨之出貨注意事項正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then COD item delivery - "ship notice" must match request data


    @C4793742 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 取消執行出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        Then "btnCancel" redirect function must correct

    
    @C4793743 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id


    @C4793744 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之標題正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then COD item delivery result - "result title" must match request data
        

    @C4793745 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之說明正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then COD item delivery result - "shipment result description" must match request data


    @C4793746 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之物流編號正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then COD item delivery result - "logistic Id" must match request data


    @C4793747 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之提醒事項正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then COD item delivery result - "shipment result note" must match request data

    
    @C4793751 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之運送資訊正確顯示
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then COD item delivery result - "order detail shipment info" must match request data

    
    @C4793752 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之物流編號可連結至郵局 iPost 查詢物流狀態
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        And I expand the order detail
        Then "iPostLink" redirect function must correct


    @C4793753 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then "btnPrint" redirect function must correct


    @C4793754 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨結果頁之返回管理訂單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then "btnBacktolist" redirect function must correct

    
    @C4793755 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][尚未出貨] 確定出貨後, 狀態變更為成功要號
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And "the 1st item print button" must exist
        And orderList Seller - "shipStatus wait for ship" must match request data

    
    @C4793889 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][成功要號] 點擊操作圖示之列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And "the 1st item print button" redirect function must correct


    @C4793756 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][成功要號] 點擊訂單操作之列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And order operation - "列印出貨單" redirect function must correct

    
    @C4793890 @FUNCTIONALITY
    Scenario: [郵局][賣家][訂單明細頁][成功要號] 可重複列印出貨單
        When I filter order by payType - "postOffice"
        And I pick shiptype as "尚未出貨"
        Then search result must have more than "1" record
        And I can gather the 1st order's id
        When I press view order detail
        Given I have already in "orderDetailSeller"
        Then "btnDelivery" redirect function must correct
        Given I have already in "codDeliver"
        When I confirm delivery
        Then I can get logistic id
        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And order operation - "列印出貨單" redirect function must correct

        Given I visit "orderList(Seller)"
        When I search order as specific id
        Then search result must have more than "1" record
        And order operation - "列印出貨單" redirect function must correct