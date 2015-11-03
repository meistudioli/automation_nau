Feature: [My Auction][Seller Dashboard][Seller Dashboard: On Sale]
    As a user of myAuc
    After I open a myAuc
    Seller Dashboard: On Sale module should works well

    Background: login as "seller_pp_b2c"
        Given I login as "seller_pp_b2c"
        And I pass "seller_pp_b2c" DID
        And I visit "myAuction"
        When I click seller dashboard tab - "on sale item"


    @C485 @BETA @PP @PROD @E2E
    Scenario: [賣家動態][上架中商品]tab顯示上架中的總件數
        Then I can get seller dashboard tab - "on sale item"'s amount info
        Given I visit "item management"
        When I filter item by "all"
        Then I can get total item amount
        And the upper amount infos must equal each other


    @C487 @BETA @PP @PROD @E2E
    Scenario: [賣家動態][上架中商品]直購商品件數
        Then I can get seller dashboard tab - on sale item's "buynow" item amount info 
        Given I visit "item management"
        When I filter item by "buynow"
        Then I can get total item amount
        And the upper amount infos must equal each other


    @C488 @BETA @PP @PROD @E2E
    Scenario: [賣家動態][上架中商品]競標商品件數
        Then I can get seller dashboard tab - on sale item's "bidding" item amount info 
        Given I visit "item management"
        When I filter item by "bidding"
        Then I can get total item amount
        And the upper amount infos must equal each other


    @C489 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][上架中商品][列表]顯示最新5筆上架商品
        Then I can get seller dashboard tab - "on sale item"'s listing order
        Given I visit "item management"
        When I sort item by "上架時間新到舊"
        Then I can get current item listing
        And the upper listings must equal each other


    @C491 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][上架中商品][列表][商品]商品圖
        Then "SellerDashboard List - on sale item - thumbnail" must exist


    @C494 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][上架中商品][列表][商品]商品名稱
        Then "SellerDashboard List - on sale item - title" must have content


    @C496 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][上架中商品][列表][商品]click商品名稱
        Then "SellerDashboard List - on sale item - title" redirect function must correct


    @C509 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][出售中商品][列表]click看全部上架中商品
        Then "SellerDashboard List - on sale item - view all" redirect function must correct



