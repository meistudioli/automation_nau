Feature: [booth][booth search]
    As a user of auction
    After I visit booth search
    boothSearch module should works well
    ※ need to mutantOn dataSrc: boothSRP
    node suiteQueue.js mutantOn+dataSrc=boothSRP


    Background: visit "booth - seller_store_b2c"
        Given I visit "booth - seller_store_b2c"


    @C4791160 @SMOKE @PP @PROD
    Scenario: [商店賣場]以正確關鍵字搜尋
        When I search "mei" from booth
        Then booth search result must have more than "1" record


    @C4791161 @REGRESSION @PP @PROD
    Scenario: [商店賣場]以錯誤關鍵字搜尋
        When I search "noResult" from booth
        Then booth search result must exactly be "0" record


    @C4791162 @FUNCTIONALITY @PP @PROD @X
    Scenario: [商店賣場][有找到]以長刊期條件搜尋
    	When I pick search filter - "長刊期商品"
        And I search "" from booth
        Then booth search result must have more than "1" record


    @C4791163 @FUNCTIONALITY @PP @PROD @X
    Scenario: [商店賣場][沒找到]以長刊期條件搜尋
    	When I pick search filter - "長刊期商品"
        And I search "noResult" from booth
        Then booth search result must exactly be "0" record


    @C4791164 @REGRESSION @PP @PROD
    Scenario: [商店賣場][有找到]以沒有設定拍賣底價條件搜尋
    	When I pick search filter - "未設拍賣底價的競標品"
        And I search "" from booth
        Then booth search result must have more than "1" record


    @C4791165 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場][沒找到]以沒有設定拍賣底價條件搜尋
    	When I pick search filter - "未設拍賣底價的競標品"
        And I search "noResult" from booth
        Then booth search result must exactly be "0" record


    @C4791166 @REGRESSION @PP @PROD
    Scenario: [商店賣場][有找到]以有直接購買價條件搜尋
    	When I pick search filter - "有直接購買價"
        And I search "" from booth
        Then booth search result must have more than "1" record


    @C4791167 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場][沒找到]以有直接購買價條件搜尋
    	When I pick search filter - "有直接購買價"
        And I search "noResult" from booth
        Then booth search result must exactly be "0" record


    @C4791168 @FUNCTIONALITY @PP @PROD @X
    Scenario: [商店賣場][關鍵字+長刊期]搜尋結果
    	When I pick search filter - "長刊期商品"
        And I search "mei" from booth
        Then booth search result must have more than "1" record


    @C4791169 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場][關鍵字+沒有底價]搜尋結果
    	When I pick search filter - "未設拍賣底價的競標品"
        And I search "mei" from booth
        Then booth search result must have more than "1" record


    @C4791170 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場][關鍵字+有直購價]搜尋結果
    	When I pick search filter - "有直接購買價"
        And I search "mei" from booth
        Then booth search result must have more than "1" record


    @C4791171 @FUNCTIONALITY @PP @PROD
    Scenario: [商店賣場][關鍵字+商品分類]搜尋結果
        When I search "mei" from booth
        Then booth search result must have more than "1" record
        When I pick category - "長刊期"
        Then booth search result amount must match request amount


    @C4791172 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+沒有底價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "mei" from booth
		Then booth search result amount must match request amount


    @C4791173 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+有直購價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "有直接購買價"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "mei" from booth
		Then booth search result amount must match request amount		


    @C4791174 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791175 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+沒有底價+有直購價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "mei" from booth
		Then booth search result amount must match request amount


    @C4791176 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+沒有底價+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791177 @REGRESSION @PP @PROD @X
	Scenario: [商店賣場][關鍵字+長刊期+沒有底價+有直購價+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "mei" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791178 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+沒有底價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I search "" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "" from booth
		Then booth search result amount must match request amount		


    @C4791179 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+有直購價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "有直接購買價"
		And I search "" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "" from booth
		Then booth search result amount must match request amount	
	

    @C4791180 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I search "" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791181 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+沒有底價+有直購價]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "" from booth
		Then booth search result must have more than "1" record
		And I can get search result amount

		Given I visit "booth - seller_store_b2c"
		When I pick search filter - "長刊期商品"
		And I search "" from booth
		Then booth search result amount must match request amount		


    @C4791182 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+沒有底價+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I search "" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791183 @FUNCTIONALITY @PP @PROD @X
	Scenario: [商店賣場][長刊期+沒有底價+有直購價+商品分類]搜尋結果
		When I pick search filter - "長刊期商品"
		And I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "" from booth
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount


    @C4791184 @FUNCTIONALITY @PP @PROD
	Scenario: [商店賣場][沒有底價+有直購價]搜尋結果
		When I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "mei" from booth
		Then booth search result must exactly be "1" record


    @C4791185 @FUNCTIONALITY @PP @PROD
	Scenario: [商店賣場][沒有底價+商品分類]搜尋結果
		When I pick search filter - "未設拍賣底價的競標品"
		And I search "" from booth
		Then booth search result must have more than "1" record
		#When I pick category - "長刊期"
		When I pick category - "其他"
		Then booth search result amount must match request amount


    @C4791186 @FUNCTIONALITY @PP @PROD
	Scenario: [商店賣場][沒有底價+有直購價+商品分類]搜尋結果
		When I pick search filter - "未設拍賣底價的競標品"
		And I pick search filter - "有直接購買價"
		And I search "" from booth	
		Then booth search result must have more than "1" record
		#When I pick category - "長刊期"
		When I pick category - "其他"
		Then booth search result amount must match request amount


    @C4791187 @FUNCTIONALITY @PP @PROD
	Scenario: [商店賣場][有直購價+商品分類]搜尋結果
		When I pick search filter - "有直接購買價"
		And I search "" from booth	
		Then booth search result must have more than "1" record
		When I pick category - "長刊期"
		Then booth search result amount must match request amount
