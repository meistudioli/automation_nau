Feature: Dragon series - 「dragonFace2Face」


    @E2E @CREATEBASICWITHSHIPTYPE
    Scenario: create a basic multi-spec item & plug data in shadow.ITEM.buyNow.basic   
        Given I login as "seller_store_b2c"                                              
        When I create a basic multi-spec item                                            
        | itemTitle                      | itemBrief                | salePrice | itemDesc                 | payType        | barCode       | itemNumber | totalQuantity | videoSet                                        | shipType | imageAmount |
        | [直購品] 測試商品請勿下標, 所有訂單一律取消 - mei | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 10        | [直購品] 測試商品請勿下標, 所有訂單一律取消 | 711,family,cod | 4710018135606 | ABC        | 3             | http://meistudioli.tumblr.com/post/121341504424 | sff_sg   | 9           |
        Then I can get upper item's merchandise id                                       


    @E2E @BETA @PP @PROD @ORDERCONFIRMWITHSHIPTYPEFACE2FACE
    Scenario: visit  ordercomfirm with ShipType - Face to Face & check receiver info   
        Given I login as "buyer_general"                                                 
        And I visit "itemPage - buyNow - basic"                                          
        When I visit ordercomfirm with shipType - "Face2Face"                            
        Then "receiverCity" must exist                                                   
        And "receiverDistrict" must exist                                                
        And "receiverZipcode" must exist                                                 
        And "receiverAddress" must exist                                                 


    @E2E @BETA @PP @PROD @BUYMULTISPECITEMWITHSHIPTYPEFACE2FACE
    Scenario: buy item with ShipType - Face to Face        
        Given I login as "buyer_general"                     
        And I visit "itemPage - buyNow - basic"              
        When I buy item directly with shipType - "Face2Face" 
        Then order must be ready                             


    @E2E @OFFSHELFBASIC
    Scenario: offshelf the basic multi-spec item & remove data from shadowData.ITEM.buyNow   
        Given I login as "seller_store_b2c"                                                    
        Then offshelf the basic multi-spec item must success                                   
        