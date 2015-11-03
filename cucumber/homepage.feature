Feature: homepage
    As a user of auction
    After I visit homepage
    homepage modules should works well
    

	Background: visit "homepage"
		Given I visit "homepage"


    @C4798249 @E2E @PP @PROD @HP
    Scenario: [homepage][熱銷強強滾]功能是否正常
        Then "AD - hotSell" must exist
        And "hotSell first item" redirect function must correct


    @CXXXX @E2E @PP @PROD @HP
    Scenario: [homepage][賣家精選]功能是否正常
        Then "AD - SellerChosen" must exist
        And "SellerChosen first item" redirect function must correct


    @CXXXX @E2E @PP @PROD @HP
    Scenario: [homepage][賣家推薦]功能是否正常
        Then "AD - recommandation" must exist
        And expand detail function must correct
        And "Recommandation first item" redirect function must correct


    @CXXXX @E2E @PP @PROD @HP
    Scenario: [homepage][品牌主打]功能是否正常
        Then "AD - BrandStore" must exist
        And "BrandStore first item" redirect function must correct