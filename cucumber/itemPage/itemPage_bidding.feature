Feature: Item Page (Bidding)
    As a user of auction
    After I visit itemPage - bidding - buynow
    itemPage modules should works well
    
    ※ need to mutantOn dataSrc: basic
    node suiteQueue.js mutantOn


    @C4796099X @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]影片播放
        Given I visit "itemPage - bidding - basic"
        When I roll to "item navigation"
        Then "video section" must exist
        And video function must correct


    @C4796099XX @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]影片播放
        Given I visit "itemPage - bidding - buynow"
        When I roll to "item navigation"
        Then "video section" must exist
        And video function must correct
