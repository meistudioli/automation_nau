var did;

did = function() {
	PageObject.call(this); // call super constructor.

    this.data.id = 'did';
    this.data.url = constants.DID_URL + 'http://tw.bid.yahoo.com/status.html';

    this.selector = {
        inputSection: 'dl.list',
        inputs: '.list dd .read,.list dd .write',
        comName: '.unknown_computer_name',
        goSubmit: '.btn-send',
        success: '.success',
        useService: 'dd.use a',
        mask: '.mask',
        poplayer: '#tran-poplayer_c'
    };
};
did.prototype = Object.create(PageObject.prototype);

did.prototype.go = function() {
    var stand = this;
    return browser.get(this.data.url).then(
        function() {
            stand.one('mask').isPresent().then(
                function() {
                    stand.hide('mask');
                    stand.hide('poplayer');
                }
            );
        }
    ).thenCatch(
        function(err) {
            //err catch
        }
    ).then(
        function() {
            return stand;
        }
    );
};

did.prototype.pass = function(userId) {
    var passCode, stand = this, idx = 0;
    passCode = constants.USERS[userId].did;
    return stand.one('inputSection').isPresent().then(
        function(flag) {
            if (flag) {
                stand.all('inputs').each(
                    function(e) {
                        e.getAttribute('className').then(
                            function(cn) {
                                if (/(read)|(write)/.test(cn)) {
                                    if (/write/.test(cn)) e.clear().sendKeys(passCode.charAt(idx));
                                    idx++;
                                }//end if
                            }
                        );
                    }
                ).then(
                    function() {
                        stand.one('comName').clear().sendKeys('automation');
                        stand.one('goSubmit').click().then(
                            function() {
                                stand.waitUntilPresent('success', 3000);
                            }
                        );
                    }
                );
            }//end if
        }
    ).then(
        function() {
            // return stand.clickAndWaitUntilRedirect('useService');
            return stand.one('useService').isPresent().then(
                function(flag) {
                    if (flag) stand.clickAndWaitUntilRedirect('useService');
                }
            );
        }
    ).thenCatch(
        function(err) {
            //err catch
        }
    );
};

module.exports = did;