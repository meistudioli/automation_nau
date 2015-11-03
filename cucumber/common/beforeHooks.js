var beforeHooks = function() {
    this.Before(function(next) {
    	if (typeof browser == 'undefined') return;
        browser.clearMockModules();
        browser.manage().deleteAllCookies();
        next();
    });
};
module.exports = beforeHooks;