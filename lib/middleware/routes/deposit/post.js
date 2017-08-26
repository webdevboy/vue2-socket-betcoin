module.exports = function(config){
	var self = this
	self.config = config

	self.init = function(app,allDone){
		allDone()
	}

	// ---------- For users ----------

	// Used in dashboard deposit table
	self.getDepositsByUser = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.getDepositsByUser(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home and profile pages
	self.getAllDepositBalances = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.getAllDepositBalances(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in buy now page
	self.remit = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.remit(req.params[2], (err, data) => {
			res.json({ err: err, data: data })
		})
	}
	// Unused
	self.getDepositSumByCurrency = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.getDepositSumByCurrency(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}

	// ---------- For admin users ----------

	// Used in dashboard/deposits page
	self.getDepositsByUserID = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.getDepositsByUserID(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard/deposit-detail page
	self.getDepositByTransactionID = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.checkDupeByTxid(req.params[2].transactionID, (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard/deposit-detail page
	self.updateDeposit = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.updateDeposit(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard/create-deposit page
	self.createDeposit = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.deposit.createDeposit(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
}