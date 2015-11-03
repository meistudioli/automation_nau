var navigation = function() {
	var Given = When = Then = this.defineStep;

    // navigation - "uesr profile" must exist
    Then(/^navigation - "([^"]*)" must exist$/, function(key, next) {
        var stand = this.stand;

        stand.navigation.get(key).then(
            function(e) {
                stand.isExist(e).then(
                    function(flag) {
                        expect(flag, key + ' missing').to.be.true;
                    }
                );
            },
            function() {
                // throw new Error('element missing');
                expect(false, key + ' missing').to.be.true;
            }
        ).then(next, next);
    });

    // navigation - "uesr profile" must not exist
    Then(/^navigation - "([^"]*)" must not exist$/, function(key, next) {
        var stand = this.stand;

        stand.navigation.get(key).then(
            function(e) {
                stand.isExist(e).then(
                    function(flag) {
                        expect(flag, key + ' exist').to.be.false;
                    }
                );
            },
            function() {
                // throw new Error('element missing');
                expect(false, key+' exist').to.be.false;
            }
        ).then(next, next);
    });

    // navigation - "uesr nickname" must have content
    Then(/^navigation - "([^"]*)" must have content$/, function(key, next) {
        var stand = this.stand;

        stand.navigation.get(key).then(
            function(e) {
                e.getInnerHtml().then(
                    function(html) {
                        // console.log(key+' content: '+html);
                        expect(html, key + "'s content is empty").to.not.be.empty;
                    }
                );
            },
            function() {
                // throw new Error('element missing');
                expect(false, key + ' missing').to.be.true;
            }
        ).then(next, next);
    });

    // navigation - "uesr profile" redirect function must correct
    Then(/^navigation - "([^"]*)" redirect function must correct$/, function(key, next) {
        var stand = this.stand, world = this;

        stand.navigation.get(key).then(
            function(e) {
                stand.redirect(e, key, world.userId).then(
                    function(flag) {
                        expect(flag, 'redirect result error').to.be.true;
                    }
                );
            },
            function() {
                // throw new Error('element missing');
                expect(false, key + ' missing').to.be.true;
            }
        ).then(next, next);
    });
};
module.exports = navigation;