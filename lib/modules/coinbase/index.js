const coinbase = require("coinbase")

module.exports = function (config) {
	var self = this;
	self.config = config;
	self.init = function (allDone) {
		self.client = new coinbase.Client(self.config.coinbase)
		allDone()
	}

	self.createBTCDepositAddress = function (userGUID, allDone) {
		self.client.getAccount(self.config.coinbase.btcWalletID, function (err, account) {
			if(!account) {
				allDone(err, account)
			} else {
				account.createAddress({ name: userGUID }, function (err, address) {
					allDone(err,address)
				});
			}
		});
	}

	self.createETHDepositAddress = function (userGUID, allDone) {
		self.client.getAccount(self.config.coinbase.ethWalletID, function (err, account) {
			if(!account) {
				allDone(err, account)
			} else {
				account.createAddress({ name: userGUID }, function (err, address) {
					allDone(err,address)
				});
			}
		});
	}

	self.getAccounts = function (allDone) {
		self.client.getAccounts({}, allDone)
	}
}