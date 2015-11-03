Feature: [booth][Search Preference]
    As a user of auction
    After I visit booth search
    boothSearch module should works well
    
    ※ need to mutantOn dataSrc: boothSRP
    node suiteQueue.js mutantOn+dataSrc=boothSRP


    Background: login as "buyer_general" & visit "booth - seller_store_b2c"
        Given I login as "buyer_general"
        And I visit "booth - seller_store_b2c"


    @C4791310 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][瀏覽方式]套用圖文瀏覽
        When I search "mei" from booth
        Then set search preference - viewMode "圖文瀏覽" must success

        When I search "mei" from booth
        Then current viewMode must be "圖文並列"


    @C4791311 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][瀏覽方式]套用圖片瀏覽
        When I search "mei" from booth
        Then set search preference - viewMode "圖片瀏覽" must success

        When I search "mei" from booth
        Then current viewMode must be "圖片"


    @C4791318 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用相關度
        When I search "mei" from booth
        Then set search preference - sorting "相關度" must success

        When I search "mei" from booth
        Then current sorting must be "相關度"


    @C4791319 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用剩餘時間
        When I search "mei" from booth
        Then set search preference - sorting "剩餘時間" must success

        When I search "mei" from booth
        Then current sorting must be "剩餘時間"


    @C4791320 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用刊登時間
        When I search "mei" from booth
        Then set search preference - sorting "刊登時間" must success

        When I search "mei" from booth
        Then current sorting must be "刊登時間"


    @C4791321 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用售出/下標次數
        When I search "mei" from booth
        Then set search preference - sorting "售出/下標次數" must success

        When I search "mei" from booth
        Then current sorting must be "售出/下標次數"


    @C4791322 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用直購價
        When I search "mei" from booth
        Then set search preference - sorting "直購價" must success

        When I search "mei" from booth
        Then current sorting must be "直購價"

        	
    @C4791323 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][排序方式]套用目前出價
        When I search "mei" from booth
        Then set search preference - sorting "目前出價" must success

        When I search "mei" from booth
        Then current sorting must be "目前出價"
	

    @C4791313 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][顯示商品數]套用25項
		Given I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "25" must success		

        When I search "" from booth
        Then current perPageAmount must be "25"


    @C4791314 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][顯示商品數]套用50項
		Given I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "50" must success		

        When I search "" from booth
        Then current perPageAmount must be "50"


    @C4791315 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][顯示商品數]套用75項
		Given I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "75" must success		

        When I search "" from booth
        Then current perPageAmount must be "75"


    @C4791316 @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好][顯示商品數]套用100項    
		Given I visit "booth - seller_super_bra"
        When I search "" from booth
        Then set search preference - perPageAmount "100" must success		

        When I search "" from booth
        Then current perPageAmount must be "100"


    @FUNCTIONALITY @PP @PROD
    Scenario: [自訂搜尋偏好] recover default setting
        Given I visit "booth - seller_super_bra"
        When I search "" from booth
        Given set search preference - viewMode "圖文瀏覽" must success
        And set search preference - perPageAmount "50" must success
        And set search preference - sorting "剩餘時間" must success

        When I search "" from booth
        Then current viewMode must be "圖文並列"
        And current perPageAmount must be "50"
        And current sorting must be "剩餘時間"
