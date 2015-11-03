Feature: [My Auction][Seller Dashboard][Seller Dashboard: Layout]
    As a user of myAuc
    After I open a myAuc
    Layout module should works well

    Background: login as "seller_store_b2c"
        Given I login as "seller_store_b2c"
        Given I visit "myAuction"


    @C476 @BETA @PP @PROD @E2E
    Scenario: [賣家動態]顯示
        Then "Seller Dashboard" must exist


    @C598901 @BETA @PP @PROD @REGRESSION
    Scenario: [賣家動態][標題]click舊拍買賣留言板
        Then "Seller Dashboard old auction msgBoard link" redirect function must correct


    @C598902 @BETA @PP @PROD @REGRESSION
    Scenario: [賣家動態][標題]click舊拍交易
        Then "Seller Dashboard old auction order link" redirect function must correct