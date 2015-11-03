Feature: [My Auction][Buyer Dashboard][Buyer Dashboard: Favorite Store]
    As a user of myAuc
    After I open a myAuc
    Buyer Dashboard: Favorite Store module should works well

    Background: login as "buyer_general"
        Given I login as "buyer_general"
        And I visit "myAuction"


    @C598863 @SMOKE @BETA @PP @PROD
    Scenario: [最愛賣家]模組顯示
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist


    @C598867 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]商品圖
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "each favoritestore thumbnail" amount must exactly be "3" pieces


    @C598872 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]賣家名稱
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "each favoritestore title" must have content


    @C598873 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]click賣家名稱
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "each favoritestore title" redirect function must correct 


    @C598874 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]促銷活動-滿額
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "favoritestore Promote" must exist


    @C598875 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]促銷活動-滿件
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "favoritestore Promote" must exist


    @C598876 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]click促銷活動
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "favoritestore Promote" redirect function must correct 


    @C598887 @E2E @BETA @PP @PROD
    Scenario: [最愛賣家]click更多最愛賣家
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And "favoritestore see more" redirect function must correct


    @C598882 @E2E @BETA @PP @PROD 
    Scenario: [最愛賣家][刪除]成功執行刪除
        Given I visit "itemPage - buyNow - basic"
        Then seller has been added in favorite store list

        Given I visit "myAuction"
        When I roll to "footer"
        Then "favroite store" must exist
        And remove first favoritestore must success
