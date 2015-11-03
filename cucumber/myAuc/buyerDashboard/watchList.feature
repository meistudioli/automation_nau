Feature: [My Auction][Buyer Dashboard][Buyer Dashboard: Watch List]
    As a user of myAuc
    After I open a myAuc
    Buyer Dashboard: watchList module should works well

    Background: login as "buyer_general" and add item to watchList
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        Then item has been added in watch list


    @C598780 @SMOKE @BETA @PP @PROD
    Scenario: [追蹤商品]模組顯示
        Given I visit "myAuction"
        When I roll to "footer"
        Then "watch list" must exist


    @C598800 @E2E @BETA @PP @PROD
    Scenario: [追蹤商品][直購商品][刪除]成功執行刪除
        Given I visit "myAuction"
        When I roll to "footer"
        Then "watch list" must exist
        And remove first watchList item must success
