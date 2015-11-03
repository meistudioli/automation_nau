Feature: [My Auction][Seller Dashboard][Seller Dashboard: Item QnA]


    Background: login as "buyer_general" and make a quiz then switch to "seller_pp_b2c"
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        Then I make a quiz with content - "買家 "buyer_general" 發問" 

        Given I login as "seller_pp_b2c"
        And I pass "seller_pp_b2c" DID
        And I visit "myAuction"
        When I click seller dashboard tab - "item Qna"


    @C516 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表]顯示最新5則未回覆問答
        Then I can get seller dashboard tab - "item Qna"'s listing order
        Given I visit "item Qna list(Seller)"
        When I filter item Qna by time - "最近1個月"
        And I sort item Qna by "最近發問時間"
        Then I can get current item Qna listing
        And the upper listings must equal each other


    @C518 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][商品]商品圖
        Then "SellerDashboard List - item Qna - thumbnail" must exist


    @C521 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][商品]商品名稱
        Then "SellerDashboard List - item Qna - title" must have content


    @C523 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][商品]click商品名稱
        Then "SellerDashboard List - item Qna - title" redirect function must correct


    @C524 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][發問時間]顯示發問時間
        Then "SellerDashboard List - item Qna - date" must have content


    @C525 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][發問內容]顯示發問內容
        Then "SellerDashboard List - item Qna - content" must have content


    @C528 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][商品問答][列表][操作]click我要回覆
        Then "SellerDashboard List - item Qna - reply" redirect function must correct


    @C529 @E2E @BETA @PP @PROD 
    Scenario: [賣家動態][商品問答][列表]click看全部商品問答
        Then "SellerDashboard List - item Qna - view all" redirect function must correct

   