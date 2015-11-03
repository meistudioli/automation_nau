Feature: [My Auction][Buyer Dashboard][Buyer Dashboard: Item QnA]
    As a user of myAuc
    After I open a myAuc
    Buyer Dashboard: Item QnA module should works well

    Background: login as "buyer_general"
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        Then I make a quiz with content - "買家 "buyer_general" 發問"

        Given I visit "myAuction"
        When I click buyer dashboard tab - "item Qna"


    @C598725 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表]顯示最新5則問答
        Then I can get buyer dashboard tab - "item Qna"'s listing order
        Given I visit "item Qna list(Buyer)"
        #When I filter item Qna by time - "最近1個月"
        Then I can get current item Qna listing
        And the upper listings must equal each other


    @C598727 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][商品]商品圖
        Then "BuyerDashboard List - item Qna - thumbnail" must exist


    @C598730 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][商品]商品名稱
        Then "BuyerDashboard List - item Qna - title" must have content


    @C598733 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][我的發問]顯示發問內容
        Then "BuyerDashboard List - item Qna - content" must have content


    @C598739 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表]click全部商品問與答
        Then "BuyerDashboard List - item Qna - view all" redirect function must correct


    @C598737 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][未回覆]顯示未回覆
        Then "BuyerDashboard List - item Qna - operation"'s content must be "未回覆"


    @C598738 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][未回覆]click未回覆
        Then "BuyerDashboard List - item Qna - operation" redirect function must correct


    @C598735 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][已回覆]顯示已回覆
        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        And I visit "item Qna list(Seller)"
        Then reply for "itemPage - buyNow - basic" quiz must correct

        Given I login as "buyer_general"
        And I visit "myAuction"
        When I click buyer dashboard tab - "item Qna"
        Then "BuyerDashboard List - item Qna - operation"'s content must be "已回覆"


    @C598736 @E2E @BETA @PP @PROD
    Scenario: [買家動態][商品問答][列表][操作][已回覆]click已回覆
        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        And I visit "item Qna list(Seller)"
        Then reply for "itemPage - buyNow - basic" quiz must correct

        Given I login as "buyer_general"
        And I visit "myAuction"
        When I click buyer dashboard tab - "item Qna"
        Then "BuyerDashboard List - item Qna - operation" redirect function must correct

