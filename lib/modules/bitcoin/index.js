const bitcoin = require("bitcoin")

module.exports = function (config) {
	var self = this
	self.config = config
	self.init = (allDone) => {
		self.client = new bitcoin.Client(config.bitcoin)
		allDone()
	}

	self.listAccounts = (allDone) => {
		self.client.listAccounts(allDone)
	}

	self.listTransactions = (count, start, allDone) => {
		self.client.listTransactions("*", count, start, allDone)
	}

	self.getBalance = (account, confirms, allDone) => {
		self.client.getBalance(account, confirms, allDone)
	}

	self.getTransaction = (txid, allDone) => {
		self.client.getTransaction(txid, allDone)
	}

	self.getRawTransaction = (txid, allDone) => {
		self.client.getRawTransaction(txid, allDone)
	}

	self.decodeRawTransaction = (txn, allDone) => {
		self.client.decodeRawTransaction(txn, allDone)
	}

	self.createAddress = (allDone) => {
		self.client.getNewAddress(allDone)
	}

	self.getReceivedByAddress = (address, allDone) => {
		self.client.listreceivedbyaddress(3, allDone)
	}

	self.sendMany = (sends, comment, allDone) => {
		self.client.sendMany(self.config.system.nlgSendFromAccount, sends, 1, comment, allDone)
	}
}