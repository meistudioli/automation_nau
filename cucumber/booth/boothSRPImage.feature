Feature: [booth][Booth SRP (Image View)]
    As a user of auction
    After I visit booth search
    boothSearch module should works well
    
    ※ need to mutantOn dataSrc: boothSRP
    node suiteQueue.js mutantOn+dataSrc=boothSRP


    Background: visit "booth - seller_store_b2c"
        Given I visit "booth - seller_store_b2c"


    @C4791191 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP]顯示套用自訂搜尋偏好
    	Given I login as "buyer_general2"
    	And I visit "booth - seller_store_b2c"
    	When I search "mei" from booth
    	Then set search preference - viewMode "圖片瀏覽" must success

        #Given I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then booth search result must have more than "1" record
        And viewMode must be "圖片"

        Then set search preference - viewMode "圖文瀏覽" must success


    @C4791193 @FUNCTIONALITY @PP @PROD @X
    Scenario: [商店賣場SRP]click訂閱RSS
        When I search "" from 
        And I pick viewMode as "圖片"
        Then "RSS" redirect function must correct


    @C4791195 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖片]Header
        When I search "" from booth
        And I pick viewMode as "圖片"
        Then header must exist
        

    @C4791196 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖片]Footer
        When I search "" from booth
        And I pick viewMode as "圖片"
        Then footer must exist


    @C4791199 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖片]搜尋結果顯示
        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search - "search result infomation" must match request data
    

    @C4791203 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][排序]項目顯示
        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then sortings must match request data


    @C4791204 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][排序]目前出價
        When I search "mei 直購" from booth
        And I pick viewMode as "圖片"
        And I sort by "目前出價" desc
        Then result's order must correct 


    @C4791205 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][排序]直購價
        When I search "mei 直購" from booth
        And I pick viewMode as "圖片"
        And I sort by "直購價" desc
        Then result's order must correct 


    @C4791214 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區]click商品名稱
        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then "item title" redirect function must correct
    

    @C4791207 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][排序]剩餘時間
        When I search "mei 刊期" from booth
        And I pick viewMode as "圖片"
        And I sort by "剩餘時間" asc
        Then result's order must correct 


    @C4791212 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區]商品圖顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖片"
        Then "item thumbnail" must exist


    @C4791213 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區]商品名稱顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖片"
        Then "item title" must have content 


    @C4791215 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區][直購品][無促銷價]直購價顯示
        When I search "mei 刊期x30" from booth
        And I pick viewMode as "圖片"
        Then none promote item price must match request data


    @C4791216 @REGRESSION @PP @PROD 
    Scenario: [商店賣場SRP-圖片][結果區][直購品][有促銷價]直購價顯示
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖片"
        Then item price must match request data


    @C4791219 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區][直購品]click已售出件數
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖片"
        Then "has sold / bid amount" redirect function must correct


    @C4791220 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區][競標品]目前出價價顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖片" 
        Then booth search - "bidding info" must match request data


    @C4791223 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][結果區][競標品]click出價次數
        When I search "mei 競標" from booth
        And I pick viewMode as "圖片"
        Then "has sold / bid amount" redirect function must correct


    @C4791224 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][上方頁碼]顯示
        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search - "right-top pagination info" must match request data


    @C4791225 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][上方頁碼]click上一頁
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "2" page
        When I press right-top pagination - "上一頁"
        Then current pagination must be "1"

        And set search preference - resultAmount "50" must success


    @C4791226 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][上方頁碼]click下一頁
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record
        When I press right-top pagination - "下一頁"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success
     

    @C4791227 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][上方頁碼]click上下一頁時搜尋條件不變
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press right-top pagination - "下一頁"
        Then search request must match upper request

        When I press right-top pagination - "上一頁"
        Then search request must match upper request        

        And set search preference - resultAmount "50" must success


    @C4791228 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]顯示
        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search - "left-bottom pagination info" must match request data
        And booth search - "left-bottom pagination links" must match request data


    @C4791229 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]click上一頁
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        Given I've already in pagination - "2" page
        Then current pagination must be "2"

        When I press left-bottom pagination - "上一頁"
        Then current pagination must be "1"
        
        And set search preference - resultAmount "50" must success   


    @C4791230 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]click下一頁
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record
        When I press left-bottom pagination - "下一頁"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success    
            

    @C4791231 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]click上下一頁時搜尋條件不變
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press left-bottom pagination - "下一頁"
        Then search request must match upper request

        When I press left-bottom pagination - "2"
        Then search request must match upper request        

        And set search preference - resultAmount "50" must success


    @C4791234 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]click頁碼
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press left-bottom pagination - "2"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success


    @C4791235 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]輸入頁碼值
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "2" page
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success


    @C4791236 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][下方頁碼]輸入無效頁碼值
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "noResult" page
        Then "no result section" must exist

        When I search "mei" from booth
        Then set search preference - resultAmount "50" must success


    @C4791237 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][無結果]顯示
        When I search "noResult" from booth
        Then "no result section" must exist   


    @C4791238 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖片][無結果]click搜尋物品描述符合者
        When I search "noResult" from booth
        Then "items might match link" redirect function must correct


    @C4791210 @REGRESSION @PP @PROD 
    Scenario: [商店賣場SRP-圖片][結果區]直購品顯示
        When I search "mei 直購" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record

        #Given switch to dummy - "my_booth_img_uat_buynow.html"
        Then "buyNow mark" must exist
        And "item title" must have content 
        And "item thumbnail" must exist
        And booth search - "buyNow info" must match request data
        And "sign for new submit" must not exist
        And "sign for buyNow set" must not exist


    @C4791211 @REGRESSION @PP @PROD 
    Scenario: [商店賣場SRP-圖片][結果區]競標品顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record

        #Given switch to dummy - "my_booth_img_uat_bidding.html"
        Then "bidding mark" must exist
        And "item title" must have content 
        And "item thumbnail" must exist
        And booth search - "bidding info" must match request data
        And "sign for new submit" must not exist
        And "sign for buyNow set" must not exist


    @C4791217 @REGRESSION @PP @PROD @X
    Scenario: [商店賣場SRP-圖片][結果區][直購品][售出/下標次數]有賣出顯示
        When I search "mei 直購" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record
        #Given switch to dummy - "my_booth_img_uat_buynow.html"
        Then booth search - "buyNow info (with sale amount)" must match request data


    @C4791218 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖片][結果區][直購品][售出/下標次數]沒賣出顯示
        When I search "mei 直購" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record
        #Given switch to dummy - "my_booth_img_uat_buynow.html"
        Then booth search - "buyNow info (none sale amount)" must match request data


    @C4791233 @FUNCTIONALITY @PP @PROD  
    Scenario: [商店賣場SRP-圖片][下方頁碼]超過十頁顯示
        Given I login as "buyer_general2"
        And I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "25" must success    
    
        When I search "" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record

        Given I've already in pagination - "10" page
        Then booth search - pagination (more than 10 page) must match request data
        And set search preference - perPageAmount "50" must success


    @C4791232 @FUNCTIONALITY @PP @PROD  
    Scenario: [商店賣場SRP-圖片][下方頁碼]不足十頁顯示
        Given I login as "buyer_general2"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - perPageAmount "25" must success  

        When I search "mei" from booth
        And I pick viewMode as "圖片"
        Then booth search result must have more than "1" record

        Then booth search - pagination (less than 10 page) must match request data
        And set search preference - perPageAmount "50" must success        