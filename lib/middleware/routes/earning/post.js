module.exports = function(config){
	var self = this
	self.config = config

	self.init = function(app,allDone){
		allDone()
	}

	// ---------- For users ----------

	// Used in dashboard home page
	self.getTodayEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getTodayEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home page
	self.getThisMonthEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getThisMonthEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home page
	self.getThisYearEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getThisYearEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home page
	self.getAllTimeEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getAllTimeEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home page (chart)
	self.getDailyEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getDailyEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard home page (earning table)
	self.getEarningsDistributionByUser = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getEarningsDistributionByUser(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Unused
	self.getTotalEarning = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getTotalEarning(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Unused
	self.getAllEarningBalances = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getAllEarningBalances(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}

	// ---------- For admin users ----------

	// Used in /dashboard/earning-distributions
	self.getEarningDistributionsByUserID = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getEarningDistributionsByUserID(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in /dashboard/create-earning-distribution
	self.createEarningDistribution = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.createEarningDistribution(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})		
	}
	// Used in /dashboard/earning-distribution-detail
	self.getEarningDistributionByID = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.getEarningDistributionByID(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})		
	}
	// Used in /dashboard/earning-distribution-detail
	self.updateEarningDistribution = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earningDistribution.updateEarningDistribution(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}

	// Used in /dashboard/earnings
	self.getEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earning.getEarnings(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in /dashboard/create-earning
	self.createEarning = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.earning.createEarning(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in /dashboard/earning-detail
	self.getEarningByTransactionID = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.earning.getTransaction(req.params[2].transactionID, (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in /dashboard/earning-detail
	self.updateEarning = (req, res, allDone) => {
		console.log(req.params[2])
		req.lib.earning.updateEarning(req.params[2], (err, data) => {
		 	res.json({ err: err, data: data })
		})
	}
	// Used in dashboard/ system earnings
	self.updateSystemEarnings = (req, res, allDone) => {
		console.log(req.params[2]);
		req.lib.earning.updateSystemEarnings()
	}
}
