var afterHooks = function() {
	this.registerHandler('AfterFeatures', function (event, callback) {
		if (typeof mutant == 'undefined') return;
		// clean up!
		// Be careful, there is no World instance available on `this` here
		// because all scenarios are done and World instances are long gone.

		mutant.mutate('off').then(callback, callback);
	});
};
module.exports = afterHooks;