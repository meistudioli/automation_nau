Feature: [My Auction][Navigation]
    As a user of myAuc
    After I open a myAuc
    generalInfo module should works well

    Background: login as seller & visit myAuction
        Given I login as "seller_pp_b2c"
        And I visit "myAuction"


    @C451 @BETA @PP @PROD @SMOKE
    Scenario: [我的拍賣][Left Navigation][電子信箱]模組顯示
        Then "emailInfo" must exist


    @C453 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][電子信箱]click整個文字
        Then "emailInfo" redirect function must correct


    @C454 @BETA @PP @PROD @SMOKE
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶]模組顯示
        Then "C2C Section" must exist


    @C456 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶]click輕鬆付帳戶
        Then "C2C Title" redirect function must correct


    @C457 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶][現金]顯示
        Then "C2C Cash" must exist


    @C458 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶][現金]click現金整區
        Then "C2C Cash" redirect function must correct 


    @C459 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶][信用卡]顯示
        Then "C2C Credit Card" must exist


    @C460 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][輕鬆付帳戶][信用卡]click現金整區
        Then "C2C Credit Card" redirect function must correct 


    @C461 @BETA @PP @PROD @SMOKE 
    Scenario: [我的拍賣][Left Navigation][買賣評價總覽]模組顯示
        Then "rating" must exist


    @C465 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation][買賣評價總覽]click %正面評價百分比%
        Then "rating" redirect function must correct


    @C466 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation][買賣評價總覽][好評]顯示
        Then "positive rating" must have content


    @C468 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Left Navigation][買賣評價總覽][差評]顯示
        Then "negative rating" must have content


    @C470 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation][買賣評價總覽][總評價]顯示
        Then "total rating" must have content


    @C472 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation][行銷活動Banner]模組顯示
        Then "AD under generalInfo" must exist


    @C389 @SMOKE @COM
    Scenario: [我的拍賣][header]模組顯示
        Then header must exist


    @C390 @SMOKE @COM
    Scenario: [我的拍賣][footer]模組顯示
        Then footer must exist


    @C391 @SMOKE @BETA @PP @PROD 
    Scenario: [我的拍賣][Left Navigation]模組顯示
        Then "generalInfo" must exist


    @C392 @SMOKE @BETA @PP @PROD 
    Scenario: [我的拍賣]主要內容區
        Then "mainContent" must exist
