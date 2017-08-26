const bittrex = require('node.bittrex.api');

module.exports = function (config) {
	var self = this;
	self.config = config;
	self.init = (allDone) => {
		bittrex.options(self.config.bittrex);
		console.log(self.client);
		allDone()
	}

	self.getBalance = (currency, allDone) => {
		bittrex.getbalance({ currency: currency }, allDone)
	}

}