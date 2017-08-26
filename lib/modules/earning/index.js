const async = require("async")
const mongoose = require("mongoose")
const uuid = require("node-uuid")
module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		self.db = self.lib.data_mongodb
		self.models = self.lib.data_models.models
		self.cache = self.lib.data_redis
		allDone()
	}

	// For users

	// Used in dashboard/home, buy now page
	self.updateSystemEarnings = (message) => {
		var Earnings = self.models.earnings.earnings
		//Today start time
		var todayStart = new Date()
		todayStart.setUTCHours(0, 0, 0, 0)
		//This month start time
		var monthStart = new Date()
		monthStart.setDate(1)
		monthStart.setUTCHours(0, 0, 0, 0)
		//This year start time
		var yearStart = new Date()
		yearStart.setMonth(0)
		yearStart.setDate(1)
		yearStart.setUTCHours(0, 0, 0, 0)
		//Chratos Begining time
		var startDate = new Date()
		startDate.setYear(1970)
		startDate.setMonth(0)
		startDate.setDate(1)
		startDate.setUTCHours(0, 0, 0, 0)
		var endDate = new Date()

		async.parallel([
			(done) => {
				Earnings.aggregate({
						$match: {
							$and: [
								{ currency: 'NLG' },
								{ created: { $gte: todayStart } },
								{ created: { $lte: endDate } }
							]
						}
					}, {
						$group: {
							_id: null,
							sum: { $sum: "$amountSatoshi" }
							//sum: { $sum: "$netAmountSatoshi" }
						}
					}, {
						$project: {
							_id: 0,
							sum: 1
						}
					},
					function (err, result) {
						var todayEarning
						if (result && result.length != 0)
							todayEarning = result[0].sum
						else
							todayEarning = 0

						done(err, todayEarning)
					}
				)
			},
			(done) => {
				Earnings.aggregate({
						$match: {
							$and: [
								{ currency: 'NLG' },
								{ created: { $gte: monthStart } },
								{ created: { $lte: endDate } }
							]
						}
					}, {
						$group: {
							_id: null,
							sum: { $sum: "$amountSatoshi" }
							//sum: { $sum: "$netAmountSatoshi" }
						}
					}, {
						$project: {
							_id: 0,
							sum: 1
						}
					},
					function (err, result) {
						var monthEarning
						if (result && result.length != 0)
							monthEarning = result[0].sum
						else
							monthEarning = 0

						done(err, monthEarning)
					}
				)
			},
			(done) => {
				Earnings.aggregate({
						$match: {
							$and: [
								{ currency: 'NLG' },
								{ created: { $gte: monthStart } },
								{ created: { $lte: endDate } }
							]
						}
					}, {
						$group: {
							_id: null,
							sum: { $sum: "$amountSatoshi" }
							//sum: { $sum: "$netAmountSatoshi" }
						}
					}, {
						$project: {
							_id: 0,
							sum: 1
						}
					},
					function (err, result) {
						var yearEarning
						if (result && result.length != 0)
							yearEarning = result[0].sum
						else
							yearEarning = 0

						done(err, yearEarning)
					}
				)
			},
			(done) => {
				Earnings.aggregate({
						$match: {
							$and: [
								{ currency: 'NLG' },
								{ created: { $gte: startDate } },
								{ created: { $lte: endDate } }
							]
						}
					}, {
						$group: {
							_id: null,
							sum: { $sum: "$amountSatoshi" }
							//sum: { $sum: "$netAmountSatoshi" }
						}
					}, {
						$project: {
							_id: 0,
							sum: 1
						}
					},
					function (err, result) {
						var wholeEarning
						if (result && result.length != 0)
							wholeEarning = result[0].sum
						else
							wholeEarning = 0

						done(err, wholeEarning)
					}
				)
			},
			(done) => {
				Earnings.find({})
					.select('currency amountSatoshi created')
					.sort('-created')
					.limit(5)
					.exec(done)
			},
		], (err, earnings) => {
			if (err) console.log(err)

			self.lib.messenger.publish('earningsUpdate', {
				channel : "earningsUpdate", 
				userGUID : "*", 
				earnings : JSON.stringify({earnings: earnings, message: message})
			}, (err, pub) => {
				if(err) console.log(err)
				console.log(pub)
			})
		})
	}	

	// For admin users
	
	// Used in /dashboard/earnings
	self.getEarnings = (data, allDone) => {
		var Earnings = self.models.earnings.earnings
		
		Earnings.find({})
			.sort('-created')
			.limit(100)
			.exec(allDone)
	}
	// Used in /dashboard/create-earning
	self.createEarning = (data, allDone) => {
		var Earnings = self.models.earnings.earnings

		var earning = new Earnings({
			currency: data.currency,
			amountSatoshi: data.amountSatoshi,
			transactionID: uuid.v4(),
			payoutTxID: data.payoutTxID
		})
		earning.save(allDone)
	}
	// Used in /dashboard/earning-detail
	// ===== Same as other/getTransaction =====

	// Used in /dashboard/earning-detail
	self.updateEarning  = (data, allDone) => {
		var Earnings = self.models.earnings.earnings

		Earnings.findOne({ transactionID: data.transactionID }, (err, record) => {
			record.currency = data.currency
			record.amountSatoshi = data.amountSatoshi
			record.payoutTxID = data.payoutTxID
			record.lastUpdated = Date.now()
			record.save(allDone)
		})
	}

	// ---------- Other ----------

	self.getTransaction = (transactionID, allDone) => {
		self.models.earnings.earnings.findOne({ transactionID: transactionID }, allDone)
	}

	self.checkDupeByTxid = (txid, allDone)=>{
		var Earnings = self.models.earnings.earnings
		Earnings.findOne({transactionID : txid}, allDone)
	}

	self.getElectricityCostsPaidTodayByUser = (userID, allDone) => {
		var today = new Date(new Date().setUTCHours(0, 0, 0, 0))
		console.log("Get today ", today);
		console.log("user ", userID);
		self.models.earnings.earningsDistribution.aggregate([{
				$match: {
					$and: [{
						currency: "CHR",
						created: { $gte: today },
						userID: mongoose.Types.ObjectId(userID)
					}]
				}
			},
			{ $group: { _id: userID, balance: { $sum: "$electricityFeeSatoshi" } } },
		], allDone)
	}

	self.getPendingEarnings = (allDone) => {
		var Earnings = self.models.earnings.earnings
		var startDate = new Date()
		startDate.setUTCHours(startDate.getUTCHours(), startDate.getUTCMinutes() - 5, 0, 0)
		var endDate = new Date()
		//get pending earnings that are older than 5 minutes and with a sum GT 1
		console.log(startDate);
		Earnings.find({
			processed : null,
			created: { $lte: startDate },
			currency: "NLG"
		}, allDone)
	}
}