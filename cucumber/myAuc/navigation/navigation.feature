Feature: [My Auction][Navigation]
    As a user of myAuc
    After I open a myAuc
    Navigation module should works well

    Background: login as seller & visit myAuction 
        Given I login as "seller_store_b2c"
        And I visit "myAuction"


    @C393 @BETA @PP @PROD @SMOKE
    Scenario: [我的拍賣][個人資料]模組正確顯示
        Then navigation - "user profile" must exist


    @C394 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][個人資料]用戶照片(有設定)
        Then navigation - "user icon" must exist


    @C396 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][個人資料]暱稱顯示
        Then navigation - "user nickname" must have content


    @C398 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][個人資料]拍賣代號
        Then navigation - "user ecid" must have content


    @C399 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][個人資料]click個人資料整區
        Then navigation - "user profile" redirect function must correct


    @C400 @E2E @BETA @PP @PROD @SMOKE 
    Scenario: [我的拍賣][Top Navigation]模組顯示
        Then navigation - "tab section" must exist


    @C401 @BETA @PP @PROD @REGRESSION
    Scenario: [我的拍賣][Top Navigation]項目顯示
        Then navigation - "tab my auction" must exist
        And navigation - "tab seller" must exist
        And navigation - "tab buyer" must exist
        And navigation - "tab member" must exist


    @C403 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation]click我的拍賣
        Then navigation - "tab my auction" redirect function must correct


    @C405 @E2E @BETA @PP @PROD @REGRESSION  @mei
    Scenario: [我的拍賣][Top Navigation][賣家管理][管理相關]顯示
        Then navigation - "賣家管理 > 管理訂單" must exist
        And navigation - "賣家管理 > 管理商品" must exist
        And navigation - "賣家管理 > 我要賣東西" must exist
        And navigation - "賣家管理 > 賣家商品設定" must exist


    @C406 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][管理相關]click管理訂單
        Then navigation - "賣家管理 > 管理訂單" redirect function must correct


    @C407 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][管理相關]click管理商品
        Then navigation - "賣家管理 > 管理商品" redirect function must correct


    @C408 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][管理相關]click我要賣東西
        Then navigation - "賣家管理 > 我要賣東西" redirect function must correct


    @C408-1 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][管理相關]click賣家商品設定
        Then navigation - "賣家管理 > 賣家商品設定" redirect function must correct


    @C409 @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]顯示
        Then navigation - "賣家管理 > 繳費設定" must exist
        And navigation - "賣家管理 > 消費記錄" must exist
        And navigation - "賣家管理 > 查詢預付點" must exist
        And navigation - "賣家管理 > 查詢拍賣回饋金" must exist
        And navigation - "賣家管理 > 輕鬆付累積收款額度" must exist
        And navigation - "賣家管理 > 輕鬆付收款管理" must exist


    @C410 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click繳費設定
        Then navigation - "賣家管理 > 繳費設定" redirect function must correct


    @C411 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click消費記錄
        Then navigation - "賣家管理 > 消費記錄" redirect function must correct


    @C412 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click查詢拍賣回饋金
        Then navigation - "賣家管理 > 查詢拍賣回饋金" redirect function must correct


    @C413 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click查詢預付點
        Then navigation - "賣家管理 > 查詢預付點" redirect function must correct


    @C414 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click輕鬆付收款管理
        Then navigation - "賣家管理 > 輕鬆付收款管理" redirect function must correct


    @C59572 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][帳務相關]click輕鬆付累積收款額度
        Then navigation - "賣家管理 > 輕鬆付累積收款額度" redirect function must correct


    @C415 @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][商店]顯示
        Given I login as "seller_pp_b2c"
        And I visit "myAuction"    
        Then navigation - "賣家管理 > 賣家結帳設定" must exist
        And navigation - "賣家管理 > 輕鬆付信用卡設定" must exist
        And navigation - "賣家管理 > 全家取貨付款設定" must exist
        And navigation - "賣家管理 > 7-11取貨付款設定" must exist
        And navigation - "賣家管理 > 編輯黑名單" must exist
        And navigation - "賣家管理 > 店舖編輯與管理" must exist
        And navigation - "賣家管理 > 品牌廣告購買與管理" must exist
        And navigation - "賣家管理 > 活動廣告購買與管理" must exist


    @C416 @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][非商店]顯示
        Then navigation - "賣家管理 > 賣家結帳設定" must exist
        And navigation - "賣家管理 > 輕鬆付信用卡設定" must exist
        And navigation - "賣家管理 > 全家取貨付款設定" must exist
        And navigation - "賣家管理 > 7-11取貨付款設定" must exist
        And navigation - "賣家管理 > 編輯黑名單" must exist
        And navigation - "賣家管理 > 申請拍賣店舖" must exist
        And navigation - "賣家管理 > 自定我的拍賣賣場" must exist
        And navigation - "賣家管理 > 品牌廣告購買與管理" must exist
        And navigation - "賣家管理 > 活動廣告購買與管理" must exist


    @C417 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click賣家結帳設定
        Then navigation - "賣家管理 > 賣家結帳設定" redirect function must correct


    @C418 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click輕鬆付信用卡設定
        Then navigation - "賣家管理 > 輕鬆付信用卡設定" redirect function must correct


    @C419 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click全家取貨付款設定
        Then navigation - "賣家管理 > 全家取貨付款設定" redirect function must correct


    @C420 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click 7-11取貨付款設定
        Then navigation - "賣家管理 > 7-11取貨付款設定" redirect function must correct


    @C421 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click編輯黑名單
        Then navigation - "賣家管理 > 編輯黑名單" redirect function must correct


    @C422 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][商店]click商店編輯與管理
        Given I login as "seller_pp_b2c"
        And I pass "seller_pp_b2c" DID
        And I visit "myAuction" 
        Then navigation - "賣家管理 > 店舖編輯與管理" redirect function must correct


    @C423 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][非商店]click申請商店
        Then navigation - "賣家管理 > 申請拍賣店舖" redirect function must correct


    @C424 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][商店]不顯示自訂我的拍賣賣場
        Given I login as "seller_pp_b2c"
        And I visit "myAuction"  
        Then navigation - "賣家管理 > 自定我的拍賣賣場" must not exist


    @C425 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定][非商店]click自訂我的拍賣賣場
        Then navigation - "賣家管理 > 自定我的拍賣賣場" redirect function must correct


    @C426 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click品牌廣告購買與管理
        Then navigation - "賣家管理 > 品牌廣告購買與管理" redirect function must correct

    @C427 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][銷售設定]click活動廣告購買與管理
        Then navigation - "賣家管理 > 活動廣告購買與管理" redirect function must correct


    @C428 @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][賣家管理][問答相關]顯示
        Then navigation - "賣家管理 > 商品問與答" must exist
        And navigation - "賣家管理 > 買賣留言板" must exist


    @C429 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][問答相關]click商品問與答
        Then navigation - "賣家管理 > 商品問與答" redirect function must correct


    @C430 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][賣家管理][問答相關]click買賣留言板
        Then navigation - "賣家管理 > 買賣留言板" redirect function must correct


    @C432  @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][買家管理]顯示
        Then navigation - "買家管理 > 訂單查詢" must exist
        And navigation - "買家管理 > 商品問與答" must exist
        And navigation - "買家管理 > 買賣留言板" must exist
        And navigation - "買家管理 > 競標商品" must exist
        And navigation - "買家管理 > 最愛賣家" must exist
        And navigation - "買家管理 > 追蹤商品" must exist
        And navigation - "買家管理 > 買家收貨地址設定" must exist
        And navigation - "買家管理 > 輕鬆付付款管理" must exist


    @C433 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click訂單查詢
        Then navigation - "買家管理 > 訂單查詢" redirect function must correct


    @C434 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Top Navigation][買家管理]click商品問與答
        Then navigation - "買家管理 > 商品問與答" redirect function must correct


    @C435 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click買賣留言板
        Then navigation - "買家管理 > 買賣留言板" redirect function must correct


    @C436 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click競標商品
        Then navigation - "買家管理 > 競標商品" redirect function must correct


    @C437 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click最愛賣家
        Then navigation - "買家管理 > 最愛賣家" redirect function must correct


    @C438 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click追蹤商品
        Then navigation - "買家管理 > 追蹤商品" redirect function must correct


    @C439 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][買家管理]click買家收貨地址設定
        Then navigation - "買家管理 > 買家收貨地址設定" redirect function must correct


    @C440 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Top Navigation][買家管理]click輕鬆付付款管理
        Then navigation - "買家管理 > 輕鬆付付款管理" redirect function must correct


    @C442 @BETA @PP @PROD @REGRESSION 
    Scenario: [我的拍賣][Top Navigation][會員設定]顯示
        Then navigation - "會員設定 > 編輯大頭貼" must exist
        And navigation - "會員設定 > 編輯會員資料" must exist        
        And navigation - "會員設定 > 會員認證狀態" must exist
        And navigation - "會員設定 > 商品情報通知" must exist 
        And navigation - "會員設定 > 設定事件通知" must exist
        And navigation - "會員設定 > 編輯評價訊息" must exist 
        And navigation - "會員設定 > 編輯關於我" must exist 
        #And navigation - "會員設定 > 安全憑證" must exist 
        And navigation - "會員設定 > 安心鎖" must exist


    @C473 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click編輯評價訊息
        Then navigation - "會員設定 > 編輯評價訊息" redirect function must correct


    @C443 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click編輯大頭貼
        Then navigation - "會員設定 > 編輯大頭貼" redirect function must correct


    @C444 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click編輯會員資料
        Then navigation - "會員設定 > 編輯會員資料" redirect function must correct


    @C445 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click會員認證狀態
        Then navigation - "會員設定 > 會員認證狀態" redirect function must correct


    @C446 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click商品情報通知
        Then navigation - "會員設定 > 商品情報通知" redirect function must correct


    @C447 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click設定事件通知
        Then navigation - "會員設定 > 設定事件通知" redirect function must correct


    @C448 @E2E @BETA @PP @PROD 
    Scenario: [我的拍賣][Top Navigation][會員設定]click編輯關於我
        Then navigation - "會員設定 > 編輯關於我" redirect function must correct


    @C449 @E2E @BETA @PP @PROD 
    #Scenario: [我的拍賣][Top Navigation][會員設定]click安全憑證
        Then navigation - "會員設定 > 安全憑證" redirect function must correct


    @C450 @E2E @BETA @PP @PROD
    Scenario: [我的拍賣][Top Navigation][會員設定]click安心鎖
        Then navigation - "會員設定 > 安心鎖" redirect function must correct