Feature: [My Auction][Seller Dashboard][Seller Dashboard: CVS Order]
    As a user of myAuc
    After I open a myAuc
    Seller Dashboard: CVS Order module should works well

    Background: login as "seller_pp_b2c"
        Given I login as "seller_pp_b2c"
        And I pass "seller_pp_b2c" DID
        And I visit "myAuction"
        When I click seller dashboard tab - "cvs order"


    @C588 @BETA @PP @PROD @E2E
    Scenario: [賣家動態][超商訂單]tab顯示待出貨的筆數
        Then I can get seller dashboard tab - "cvs order"'s amount info
        Given I visit "orderList(Seller)"
        Then I can get total cvs order amount
        And the upper amount infos must equal each other


    @C589 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][超商訂單]列表筆數顯示
        Then I can get seller dashboard tab - cvs order's order amount info
        Given I visit "orderList(Seller)"
        Then I can get total cvs order amount
        And the upper amount infos must equal each other


    @C591 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][超商訂單][舊拍提示]click提示文案
        Then "seller dashboard - cvs order - auction classic tip" redirect function must correct


    @C594 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][超商訂單][列表][訂單編號]
        Then "SellerDashboard List - cvs order - orderId" must have content


    @C601 @E2E @BETA @PP @PROD
    Scenario: [賣家動態][超商訂單][列表][訂單成立時間]顯示
        Then "SellerDashboard List - cvs order - create time" must have content