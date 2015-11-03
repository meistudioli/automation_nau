Feature: Flow setting

    Background: login as seller do some flow testing.
        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID


    @E2E @FLOW @X
    Scenario: create a "buynow" item & offshelf it
        When I create a "buynow" item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | itemLocation | payType |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | 台北市       | srm     |

        Then offshelf the upper item must success
        #Given I visit "item management"
        #Given I pick search type as "mid"
        #Given I make a "100044603551" search
        #Then search result must have more than "1" record 
        #Then offshelf the first row item must success


    @E2E @FLOW @CHECKOUTBUYNOWTHUSFAMILYMART
    Scenario: create a "buynow" item & switch user to buy it (family)
        When I create a "buynow" item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType     | shipFee |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | 711,family  | 200     |

        Given I login as "buyer_general"
        And I buy the upper item
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success     


    @E2E @FLOW @CHECKOUTBUYNOWTHUS711
    Scenario: create a "buynow" item & switch user to buy it (711)
        When I create a "buynow" item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType        | shipFee |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711     | 100     |

        Given I login as "buyer_general"
        And I buy the upper item through 711
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success  





    @E2E @FLOW @X
    Scenario: create a "bidding" item & offshelf it
        When I create a "bidding" item
        | itemTitle                                                       | itemBrief                                                     | startPrice | itemDesc                                                     | payType    |
        | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711 |

        Then offshelf the upper item must success


    @E2E @FLOW @CHECKOUTBIDDINGTHUSFAMILYMART
    Scenario: create a "bidding" item & switch user to buy it (family)
        When I create a "bidding" item
        | itemTitle                                                       | itemBrief                                                     | startPrice | itemDesc                                                     | payType    |
        | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711 |
        
        And I create a "buynow" item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType    |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711 |

        Given I login as "buyer_general"
        And I bid and won the upper item
        And I buy the upper bidding item
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success


    @E2E @FLOW @CHECKOUTBIDDINGTHUS711
    Scenario: create a "bidding" item & switch user to buy it (711)
        When I create a "bidding" item
        | itemTitle                                                       | itemBrief                                                     | startPrice | itemDesc                                                     | payType    |
        | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][競標] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711 |
        
        When I create a "buynow" item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType    |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family,711 |

        Given I login as "buyer_general"
        And I bid and won the upper item
        And I buy the upper bidding item through 711
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success





    @E2E @FLOW @X
    Scenario: create a basic multi-spec item & offshelf it
        When I create a basic multi-spec item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType        | barCode       | itemNumber | itemLocation |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | 711,family     | 4710018135606 | ABC        | 台北市       |

        Then offshelf the upper item must success


    @E2E @FLOW @CHECKOUTMULTISPECTHUSFAMILYMART
    Scenario: create a basic multi-spec item & switch user to buy it (family)
        When I create a basic multi-spec item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType    | barCode       | itemNumber |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | family     | 4710018135606 | ABC        |

        Given I login as "buyer_general"
        And I buy the upper item
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success


    @E2E @FLOW @CHECKOUTMULTISPECTHUS711
    Scenario: create a basic multi-spec item & switch user to buy it (711)
        When I create a basic multi-spec item
        | itemTitle                                                         | itemBrief                                                       | salePrice  | itemDesc                                                       | payType | barCode       | itemNumber |
        | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - title - mei | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemBrief | 10         | [NewAuc][直購品] 測試商品請勿下標, 所有訂單一律取消 - itemDesc | 711     | 4710018135606 | ABC        |

        Given I login as "buyer_general"
        And I buy the upper item through 711
        Then order must be ready

        Given I login as "seller_store_b2c"
        And I pass "seller_store_b2c" DID
        Then offshelf the upper item must success

