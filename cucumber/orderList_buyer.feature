Feature: orderList_buyer
    As a user of auction
    After I visit orderListBuyer
    orderListBuyer modules should works well
    
    ※ need to mutantOn dataSrc: basic
    node suiteQueue.js mutantOn


    Background: login as "buyer_general" and visit "orderList(Buyer)"
        Given I login as "buyer_general"
        And I visit "orderList(Buyer)"


    @RATINGBUYER2SELLER @E2E @PP @PROD
    Scenario: [訂單列表][給賣家評價] 點擊訂單操作之給賣家評價且成功給評
        Then rate seller as "正評+1" must correct