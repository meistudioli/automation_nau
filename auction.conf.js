var config, env, fs;
fs = require('fs');

config = {
    // ---------------------------------------------------------------------------
    // ----- Browser Drivers -----------------------------------------------------
    // ---------------------------------------------------------------------------

    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    // ---------------------------------------------------------------------------
    // ----- What tests to run ---------------------------------------------------
    // ---------------------------------------------------------------------------
    
    specs: [
        'cucumber/**/*.feature'
    ],
    suites: {
        dragonItemListModifyBuynow: 'cucumber/dragon/dragonItemListModifyBuynow.feature',
        dragonItemListModifyBidding: 'cucumber/dragon/dragonItemListModifyBidding.feature',
        dragonRating: 'cucumber/dragon/dragonRating.feature',
        dragonItemStock: 'cucumber/dragon/dragonItemStock.feature',

        dragonFace2Face: 'cucumber/dragon/dragonFace2Face.feature',
        dragonOrderMaker: 'cucumber/dragon/dragonOrderMaker.feature',

        video: 'cucumber/itemPage/itemPage_buyNow.feature',
        
        dragonMultiSpec: 'cucumber/dragon/dragonMultiSpec.feature',
        dragonBidding: 'cucumber/dragon/dragonBidding.feature',
        dragonBiddingBuyNow: 'cucumber/dragon/dragonBiddingBuyNow.feature',
        COD: [
            'cucumber/orderList_seller_COD.feature',
            // 'cucumber/orderList_seller_COD_Batch.feature'
        ],

        boothSRP: [
            'cucumber/booth/boothSRP.feature',
            'cucumber/booth/boothSRPImage.feature',
            'cucumber/booth/searchPreference.feature',
            'cucumber/booth/boothSRPImageText.feature'
        ],
        booth: 'cucumber/booth/**/*.feature',

        navigation: 'cucumber/myAuc/navigation/navigation.feature',
        itemQnaB: 'cucumber/myAuc/buyerDashboard/itemQna.feature',
        watchList: 'cucumber/myAuc/buyerDashboard/watchList.feature',
        favoriteStore: 'cucumber/myAuc/buyerDashboard/favoriteStore.feature',
        itemQna: 'cucumber/myAuc/sellerDashboard/itemQna.feature',
        layout: 'cucumber/myAuc/sellerDashboard/layout.feature',

        flowBidding: 'cucumber/flow/flowBidding.feature',
        flowMultiSpec: 'cucumber/flow/flowMultiSpec.feature',
        flow: 'cucumber/flow/**/*.feature',
        myAuc: 'cucumber/myAuc/**/*.feature',
        sellerDashboard: 'cucumber/myAuc/sellerDashboard/*.feature',
        buyerDashboard: 'cucumber/myAuc/buyerDashboard/*.feature',

        //system suites
        all: 'cucumber/**/*.feature',
        mutantOn: 'cucumber/support/mutantOn.feature',
        mutantOff: 'cucumber/support/mutantOff.feature',
        dragon: 'cucumber/dragon/**/*.feature',
        failure: 'cucumber/dragon/failure.feature'
    },

    // ---------------------------------------------------------------------------
    // ----- How to set up browsers ----------------------------------------------
    // ---------------------------------------------------------------------------

    capabilities: {
        browserName: 'chrome'
    },
    multiCapabilities: [],

    // ---------------------------------------------------------------------------
    // ----- Global test information ---------------------------------------------
    // ---------------------------------------------------------------------------

    beforeLaunch: function() {
        var resultPath = 'result', screenShotsPath = 'screenShots', failure = 'egg/failure.json';
        if (!fs.existsSync(resultPath)) fs.mkdirSync(resultPath);
        if (!fs.existsSync(screenShotsPath)) fs.mkdirSync(screenShotsPath);

        if (env.clearResult == 'on') {
            //unlink exist results
            fs.readdirSync(resultPath).forEach(
                function(result) {
                    var path = resultPath + '/' + result;
                    if (fs.lstatSync(path).isDirectory() || !fs.existsSync(path)) return;
                    fs.unlinkSync(path);
                }
            );
            //unlink screenshots
            fs.readdirSync(screenShotsPath).forEach(
                function(result) {
                    var path = screenShotsPath + '/' + result;
                    if (fs.lstatSync(path).isDirectory() || !fs.existsSync(path)) return;
                    fs.unlinkSync(path);
                }
            );
            //unlink failure
            if (fs.existsSync(failure)) fs.unlinkSync(failure);
        }//end if
    },
    onPrepare: function() {
        var chai, chaiAsPromised, i18n, __base;
        __base = __dirname;
        browser.ignoreSynchronization = true;

        chai = require('chai');
        chaiAsPromised = require('chai-as-promised');
        i18n = require(__base + '/lib/i18n');
        chai.use(chaiAsPromised);

        global.__base = __base;
        global.expect = chai.expect;
        global.common = require(__base + '/lib/common');
        global.constants = require(__base + '/lib/constants');
        global.PageObject = require(__base + '/lib/pages/pageObject');
        global.mutant = require(__base + '/lib/mutant');
        global.i18n = new i18n('zh-TW');

        //dataSrc
        constants.dataSrc = '/lib/data/' + env.dataSrc + '.json';
        constants.plug(env.partition);

        //create test items
        mutant.mutate('on');
    },
    onComplete: function() {
    },
    onCleanUp: function() {
    },
    afterLaunch: function() {
    },
    params: {
        face: {
            ITEM: {
                buyNow: {},
                bidding: {}
            }
        },
        shadow: {
            ITEM: {
                buyNow: {},
                bidding: {}
            }
        },
        loginId: '',
        forceRefresh: false,
        activeMutant: true
    },
    resultJsonOutputFile: 'result/result.json',

    // ---------------------------------------------------------------------------
    // ----- The test framework --------------------------------------------------
    // ---------------------------------------------------------------------------
    
    framework: 'cucumber',
    cucumberOpts: {
        require: 'cucumber/**/*.js',
        tags: [
            process.env.tags || '@E2E,@SMOKE,@REGRESSION,@FUNCTIONALITY',
            '~@X'
        ],
        format: 'summary'
    }
};

// environment variables
env = {
    browserName: process.env.browserName || 'chrome', // chrome || firefox || internet explorer
    activeMutant: process.env.activeMutant || 'on',
    tags: process.env.tags || '@E2E,@SMOKE,@REGRESSION,@FUNCTIONALITY',
    parallel: process.env.parallel || 'off',
    dataSrc: process.env.dataSrc || 'basic',
    report: process.env.report || 'result',
    clearResult: process.env.clearResult || 'on',
    excludeMode: process.env.excludeMode || 'off',
    partition: process.env.partition || 'prod'
};
for (var i in env) env[i] = env[i].trim();

config.capabilities.browserName = env.browserName;
config.cucumberOpts.tags = [env.tags, '~@X'];
config.resultJsonOutputFile = 'result/' + env.report + '.json';

if (env.parallel == 'on') {
    config.capabilities = {
        browserName: env.browserName,
        shardTestFiles: true,
        maxInstances: 3
    };
    env.activeMutant = 'off';
}//end if

if (env.activeMutant == 'off') {
    config.params.activeMutant = false;
}//end if

if (env.excludeMode == 'on') {
    //set exclude attribute
    config.exclude = [
        'cucumber/dragon/**/*.feature',
        'cucumber/flow/**/*.feature'
    ];
}//end if

if (['beta', 'pp', 'prod'].indexOf(env.partition) == -1) env.partition = 'prod';

exports.config = config;