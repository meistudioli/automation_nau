Feature: [booth][Booth SRP (Image Text View)]
    As a user of auction
    After I visit booth search
    boothSearch module should works well

    ※ need to mutantOn dataSrc: boothSRP
    node suiteQueue.js mutantOn+dataSrc=boothSRP


    Background: visit "booth - seller_store_b2c"
        Given I visit "booth - seller_store_b2c"


    @C4791240 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖文]Header
        When I search "" from booth
        And I pick viewMode as "圖文並列"
        Then header must exist
        

    @C4791241 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖文]Footer
        When I search "" from booth
        And I pick viewMode as "圖文並列"
        Then footer must exist


    @C4791244 @SMOKE @PP @PROD
    Scenario: [商店賣場SRP-圖文]搜尋結果顯示
        When I search "mei" from booth
        Then booth search - "search result infomation" must match request data
    

    @C4791248 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][排序]項目顯示
        When I search "mei" from booth
        Then sortings must match request data


    @C4791249 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][排序]目前出價
        When I search "mei 直購" from booth
        And I pick viewMode as "圖文並列"
        And I sort by "目前出價" desc
        Then result's order must correct 


    @C4791250 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][排序]直購價
        When I search "mei 直購" from booth
        And I pick viewMode as "圖文並列"
        And I sort by "直購價" desc
        Then result's order must correct 


    @C4791252 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][排序]剩餘時間
        When I search "mei 刊期" from booth
        And I pick viewMode as "圖文並列"
        And I sort by "剩餘時間" asc
        Then result's order must correct 
        

    @C4791254 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][排序]刊登時間
        When I search "mei 競標" from booth
        And I pick viewMode as "圖文並列"
        And I sort by "刊登時間" asc
        Then result's order must correct 


    @C4791258 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]商品圖顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖文並列"
        Then "item thumbnail" must exist
    

    @C4791259 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]商品名稱顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖文並列"
        Then "item title" must have content 
        

    @C4791260 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]click商品名稱
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then "item title" redirect function must correct


    @C4791261 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]賣方顯示
        When I search "mei" from booth
        And I pick viewMode as "圖文並列" 
        Then "item seller info" must exist   


    @C4791262 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]click賣方名稱
        When I search "mei" from booth
        And I pick viewMode as "圖文並列" 
        Then "item seller info" redirect function must correct


    @C4791263 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]剩餘時間
        When I search "mei" from booth
        And I pick viewMode as "圖文並列" 
        Then "item less time" must have content


    @C4791264 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]評價
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search - "item seller rating" must match request data


    @C4791269 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][直購價][直購品]無促銷價顯示
        When I search "mei 刊期x30" from booth
        And I pick viewMode as "圖文並列"
        Then none promote item price must match request data


    @C4791270 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][直購價][直購品]有促銷價顯示
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then item price must match request data

    
    @C4791272 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][結果區][售出/下標次數][直購品]沒賣出顯示
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search - "item sold or bid amount" must match request data
        

    @C4791274 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][目前出價][競標品]無人出價顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖文並列" 
        #Then booth search - "bidding info" must match request data
        Then booth search - "bidding info(image text)" must match request data


    @C4791292 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][上方頁碼]顯示
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search - "right-top pagination info" must match request data


    @C4791293 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][上方頁碼]click上一頁
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "2" page
        When I press right-top pagination - "上一頁"
        Then current pagination must be "1"

        And set search preference - resultAmount "50" must success


    @C4791294 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][上方頁碼]click下一頁
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record
        When I press right-top pagination - "下一頁"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success


    @C4791295 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][上方頁碼]click上下一頁時搜尋條件不變
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press right-top pagination - "下一頁"
        Then search request must match upper request

        When I press right-top pagination - "上一頁"
        Then search request must match upper request        

        And set search preference - resultAmount "50" must success
    

    @C4791296 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]顯示
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search - "left-bottom pagination info" must match request data
        And booth search - "left-bottom pagination links" must match request data


    @C4791297 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]click上一頁
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "2" page
        Then current pagination must be "2"

        When I press left-bottom pagination - "上一頁"
        Then current pagination must be "1"
        
        And set search preference - resultAmount "50" must success     


    @C4791298 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]click下一頁
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record
        When I press left-bottom pagination - "下一頁"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success 

    
    @C4791299 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]click上下一頁時搜尋條件不變
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press left-bottom pagination - "下一頁"
        Then search request must match upper request

        When I press left-bottom pagination - "2"
        Then search request must match upper request        

        And set search preference - resultAmount "50" must success


    @C4791302 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]click頁碼
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record
        And I can get current search request

        When I press left-bottom pagination - "2"
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success
    

    @C4791303 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]輸入頁碼值
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "2" page
        Then current pagination must be "2"

        And set search preference - resultAmount "50" must success


    @C4791304 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]輸入無效頁碼值
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - resultAmount "25" must success

        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "25" record

        Given I've already in pagination - "noResult" page
        Then "no result section" must exist

        When I search "mei" from booth
        Then set search preference - resultAmount "50" must success
    

    @C4791305 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][無結果]顯示
        When I search "noResult" from booth
        Then "no result section" must exist  


    @C4791306 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][無結果]click搜尋物品描述符合者
        When I search "noResult" from booth
        Then "items might match link" redirect function must correct


    @C4791282 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]現金付icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And "icon cash" must exist


    @C4791283 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]click現金付icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "icon cash" redirect function must correct


    @C4791284 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]可刷卡icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And "icon credit card" must exist


    @C4791285 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]click可刷卡icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "icon credit card" redirect function must correct


    @C4791286 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]可分期icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And "icon credit card installment" must exist


    @C4791287 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]click可分期icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "icon credit card installment" redirect function must correct


    @C4791288 @FUNCTIONALITY @PP @PROD 
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]全家取icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And "icon family" must exist
    

    @C4791289 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]click全家取icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "icon family" redirect function must correct


    @C4791290 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]7-11取icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And "icon 711" must exist
       

    @C4791291 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][付款方式]click7-11取icon
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "icon 711" redirect function must correct


    @C4791281 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]商品所在地
        When I search "mei 刊期x20" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search - "item location" must match request data 


    @C4791255 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]欄位
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record
        And booth search columes must match request data


    @C4791256 @REGRESSION @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區]直購品顯示
        When I search "mei 直購" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record

        Then "buyNow mark" must exist
        And "item title" must have content 
        And "item thumbnail" must exist
        And booth search - "buyNow info" must match request data
        And "sign for new submit" must not exist
        And "sign for buyNow set" must not exist
        And "sign for auction store" must not exist


    @C4791301 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]超過十頁顯示
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "25" must success    
    
        When I search "" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record

        Given I've already in pagination - "10" page
        Then booth search - pagination (more than 10 page) must match request data
        And set search preference - perPageAmount "50" must success


    @C4791300 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][下方頁碼]不足十頁顯示
        Given I login as "seller_store_b2c"
        And I visit "booth - seller_store_b2c"
        When I search "mei" from booth
        Then set search preference - perPageAmount "25" must success    
    
        When I search "mei" from booth
        And I pick viewMode as "圖文並列"
        Then booth search result must have more than "1" record

        Then booth search - pagination (less than 10 page) must match request data
        And set search preference - perPageAmount "50" must success  


    @C4791279 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][售出/下標次數][競標品]無人出價顯示
        When I search "mei 競標" from booth
        And I pick viewMode as "圖文並列"
        Then "none bidding info" must match request data


    @C4791276 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][直購價][競標品]有立即結標價顯示
        When I search "mei 競標品 3" from booth
        And I pick viewMode as "圖文並列"
        Then "bidding item come with buyNow price" must match request data


    @C4791277 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][直購價][競標品]沒立即結標價顯示
        When I search "mei 競標品 1" from booth
        And I pick viewMode as "圖文並列"
        Then "bidding item come without buyNow price" must match request data


    @C4791266 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場SRP-圖文][結果區][運費]單筆運費顯示
        When I search "mei 競標品 1" from booth
        And I pick viewMode as "圖文並列"
        Then "shipfee" must match request data





