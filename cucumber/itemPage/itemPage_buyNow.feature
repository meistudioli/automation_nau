Feature: Item Page (Buy Now)
    As a user of auction
    After I visit itemPage - buyNow - basic
    itemPage modules should works well
    
    ※ need to mutantOn dataSrc: basic
    node suiteQueue.js mutantOn


    @C3712 @E2E @PP @PROD
    Scenario: [商品頁]Header
    	Given I visit "itemPage - buyNow - basic"
    	Then header must exist
	

    @C3713 @E2E @PP @PROD
    Scenario: [商品頁]Footer
    	Given I visit "itemPage - buyNow - basic"
    	Then footer must exist


    @C3826 @FUNCTIONALITY @PP @PROD
    Scenario: [商品頁][商品資訊][規格][規格一][圖片][有綁商品圖]點選規格連動預覽模組
        Given I visit "itemPage - buyNow - basic"
        Then item gallery carousel function must correct after press spec - "超小"


    @C3735 @E2E @PP @PROD
    Scenario: [商品頁][商品圖][主圖區][主圖>1400x1400]放大圖顯示
        Given I visit "itemPage - buyNow - basic"
        Then "main image" must exist
        And magnifier function must correct


    @C4106 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]賣家設的商品描述(文字)
		Given I visit "itemPage - buyNow - basic"
		When I roll to "item navigation"
		Then "navigation - item info" must exist
		And "item description" must match request data


    @C4115 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]顯示上傳的第1~9張圖
		Given I visit "itemPage - buyNow - basic"
		When I roll to "item navigation"
		Then "navigation - item info" must exist
		And "navigation - item info - images" amount must exactly be "9" pieces
	

    @C4796099 @E2E @PP @PROD
    Scenario: [商品頁][Navigation][商品資訊]影片播放
        Given I visit "itemPage - buyNow - basic"
        #Given switch to dummy page - "https://devnet020-vm6.corp.sg3.yahoo.com/Thor/item/itemPage?debug_item_detail=detailData4Videotumblr.json"
        #Given switch to dummy page - "https://devnet020-vm6.corp.sg3.yahoo.com/Thor/item/itemPage"
        When I roll to "item navigation"
        Then "video section" must exist
        And video function must correct


    @CBARGAIN @E2E @PP @PROD
    Scenario: [商品頁]誠可議
        Given I visit "itemPage - buyNow - basic"
        #Given switch to dummy page - "http://sleevesbelieves.corp.sg3.yahoo.com/Thor/item/itemPage"
        Then "mark-bargain" must exist


    @BARGAINON @E2E @PP @PROD
    Scenario: [商品頁]buyer can on a bargain event
        Given I login as "buyer_general"
        And I visit "itemPage - buyNow - basic"
        Then I bargain as price "5" must correct


    @BARGAINACCETP @E2E @PP @PROD
    Scenario: [商品頁]seller can accept a bargain event
        Given I login as "seller_store_b2c"
        And I visit "itemPage - buyNow - basic"
        Then I accept a specific bargain must correct