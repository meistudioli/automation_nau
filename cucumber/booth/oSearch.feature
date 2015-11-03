Feature: [booth][booth search]
    As a user of auction
    After I visit booth search
    boothSearch module should works well

    Background: visit "booth - seller_prod_b2c"
        Given I visit "booth - seller_prod_b2c"



    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 表頭 - 促銷標籤 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_buynow.html"
        Then "list title - promote tag" content must empty 


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: "輕鬆付保障方案" icon 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_buynow.html"
        Then "plan for C2C" must not exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: "有設直接購買價" icon 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_buynow.html"
        Then "sign for buyNow set" must not exist


    @Cxxxx @BETA @PP @PROD @E2E 
    Scenario: 商品圖的寬高 attribute 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_buynow.html"
        Then "thumbnail with attribute height" must not exist


    @Cxxxx @BETA @PP @PROD @E2E 
    Scenario: 直購品標籤必須要顯示
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_buynow.html"
        Then "buyNow mark" must exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 競標品標籤必須要顯示
        When I search "競標 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_bidding.html"
        Then "bidding mark" must exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 競標品直購價必須要顯示為 "直購價：-"
        When I search "競標 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_bidding.html"
        Then "buyNow price info" must same as "直購價：-"


    @Cxxxx @BETA @PP @PROD @E2E 
    Scenario: "24小時內新刊登" icon 必須移除
        When I search "競標 mei" from booth
        Then booth search result must have more than "1" record

        Given switch to dummy - "auction_srp_imagetext_uat_bidding.html"
        Then "sign for new submit" must not exist



    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, 直購品標籤必須要顯示
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_buynow.html"
        Then "buyNow mark" must exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, "有設直接購買價" icon 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_buynow.html"
        Then "sign for buyNow set" must not exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, "商品資訊" 必須符合顯示格式
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_buynow.html"
        Then item sell infomatin must match request pattern


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, 商品圖的寬高 attribute 必須移除
        When I search "直購 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_buynow.html"
        Then "thumbnail with attribute height(viewMode:image)" must not exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, 競標品標籤必須要顯示
        When I search "競標 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_bidding.html"
        Then "bidding mark" must exist


    @Cxxxx @BETA @PP @PROD @E2E
    Scenario: 圖片模式, "競標品資訊" 必須符合顯示格式
        When I search "競標 mei" from booth
        Then booth search result must have more than "1" record
        Given I pick viewMode as "image"

        Given switch to dummy - "auction_srp_image_uat_bidding.html"
        Then item bidding infomatin must match request pattern
