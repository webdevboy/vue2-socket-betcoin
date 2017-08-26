const crypto = require("crypto")
const uuid = require("node-uuid")
const async = require("async")
module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		self.db = self.lib.data_mongodb
		self.models = self.lib.data_models.models
		self.cache = self.lib.data_redis

		self.helper = self.lib.helper;
		self.encryptPassword = self.helper.encryptPassword;
		self.coinbase = self.lib.coinbase
		self.createBTCDepositAddress = self.coinbase.createBTCDepositAddress
		self.createETHDepositAddress = self.coinbase.createETHDepositAddress
		self.gulden = self.lib.bitcoin
		self.createNLGDepositAddress = self.gulden.createAddress

		allDone()
	}

	self.receiveEarnings = (data, allDone) => {
		data.amountSatoshi = self.helper.toSatoshi(data.amount)
		var newEarnings = new self.models.earnings.earnings(data)
		newEarnings.save(allDone)
	}

	self.distributeEarnings = (user, grossAmount, allDone) => {

	}
}

