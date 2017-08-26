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

	self.create = (data, allDone) => {
		data.amountSatoshi = parseFloat(data.amount.toFixed(8)) * 100000000
		data.managementFeeSatoshi = parseFloat(data.managementFee.toFixed(8)) * 100000000
		data.electricityFeeSatoshi = parseFloat(data.electricityFee.toFixed(8)) * 100000000
		var newDistribution = new self.models.earnings.earningsDistribution(data)
		newDistribution.save(allDone)
	}

	// ---------- For users ----------

	// Used in dashboard home page
	self.getTodayEarnings = (data, allDone) => {
		var userGUID = data.userGUID
		var startDate = new Date()
		startDate.setUTCHours(0, 0, 0, 0)
		var endDate = new Date()

		self.getEarnings(userGUID, startDate, endDate, allDone)
	}
	// Used in dashboard home page
	self.getThisMonthEarnings = (data, allDone) => {
		var userGUID = data.userGUID
		var startDate = new Date()
		startDate.setDate(1)
		startDate.setUTCHours(0, 0, 0, 0)
		var endDate = new Date()

		self.getEarnings(userGUID, startDate, endDate, allDone)
	}
	// Used in dashboard home page
	self.getThisYearEarnings = (data, allDone) => {
		var userGUID = data.userGUID
		var startDate = new Date()
		startDate.setMonth(0)
		startDate.setDate(1)
		startDate.setUTCHours(0, 0, 0, 0)
		var endDate = new Date()

		self.getEarnings(userGUID, startDate, endDate, allDone)
	}
	// Used in dashboard home page
	self.getAllTimeEarnings = (data, allDone) => {
		var userGUID = data.userGUID
		var startDate = new Date()
		startDate.setYear(1970)
		startDate.setMonth(0)
		startDate.setDate(1)
		startDate.setUTCHours(0, 0, 0, 0)
		var endDate = new Date()

		self.getEarnings(userGUID, startDate, endDate, allDone)
	}
	// Used in above 4 modules
	self.getEarnings = (userGUID, startDate, endDate, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		Users.findOne({ userGUID: userGUID }, (err, user) => {
			if (err) console.log(err)
			//UserID
			var userID = user._id
			//nlg and chr Daily Earning Array
			var nlgEarning = 0
			var chrEarning = 0

			async.parallel([
				(done) => {
					EarningsDistribution.aggregate({
							$match: {
								$and: [
									{ userID: mongoose.Types.ObjectId(userID) },
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
							if (result && result.length != 0)
								nlgEarning = result[0].sum
							done(err)
						}
					)
				},
				(done) => {
					EarningsDistribution.aggregate({
							$match: {
								$and: [
									{ userID: mongoose.Types.ObjectId(userID) },
									{ currency: 'CHR' },
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
							if (result && result.length != 0)
								chrEarning = result[0].sum
							done(err)
						}
					)
				},
			], (err) => {
				if (err) console.log(err)
				allDone(err, { nlgEarning: nlgEarning, chrEarning: chrEarning })
			})
		})
	}
	// Used
	// Get earning data for chart.
	self.getDailyEarnings = (data, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, (err, user) => {
			if (err) console.log(err)
			//UserID
			var userID = user._id
			//This month first day: UTC 0:0:0:0
			var startTime = new Date()
			startTime.setDate(1)
			//Present Time
			var now = new Date()
			var currentDay = now.getDate()
			//nlg and chr Daily Earning Array
			var nlgEarning = []
			var chrEarning = []
			var usdEarning = []
			//Temperial Variables
			var createdAt = null
			var day = 0
			var i = 0

			for (i = 0; i < currentDay; i++) {
				nlgEarning[i] = 0
				chrEarning[i] = 0
			}
			async.parallel([
				(done) => {
					EarningsDistribution.find({
							'userID': mongoose.Types.ObjectId(userID),
							'currency': 'NLG',
							'created': {
								$gte: startTime,
								$lt: now
							}
						})
						.select('amountSatoshi created')
						.exec(function (err, records) {
							if (err)
								console.log(err)
							if (records) {
								records.forEach(function (value) {
									day = value.created.getUTCDate()
									nlgEarning[day - 1] += value.amountSatoshi
								})
							}
							done(err)
						})
				},
				(done) => {
					EarningsDistribution.find({
							'userID': mongoose.Types.ObjectId(userID),
							'currency': 'CHR',
							'created': {
								$gte: startTime,
								$lt: now
							}
						})
						.select('amountSatoshi created')
						.exec(function (err, records) {
							if (err)
								console.log(err)
							if (records) {
								records.forEach(function (value) {
									day = value.created.getUTCDate()
									chrEarning[day - 1] += value.amountSatoshi
								})
							}
							done(err)
						})
				},
			], (err) => {
				if (err) console.log(err)

				self.lib.currency.nlgToUsd((err, nlgUSDPrice) => {
					for (i = 0; i < currentDay; i++) {
						usdEarning[i] = (chrEarning[i] + nlgEarning[i]) * nlgUSDPrice
					}
					allDone(err, { nlgEarning: nlgEarning, chrEarning: chrEarning, usdEarning: usdEarning, currentDay: currentDay })
				})

			})
		})
	}
	// Used
	// Get earning distribution data for earning table
	self.getEarningsDistributionByUser = (data, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			if (err) console.log(err)
			var userID = user._id
			EarningsDistribution.find({ userID: userID })
				//.select('currency amountSatoshi created')
				.sort('-created')
				.limit(100)
				.exec(allDone)
		})
	}
	// Unused
	// Show sums of earnings using a SUM of all earnings records in the earningsDistribution schema
	self.getTotalEarning = (data, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			if (err) console.log(err)
			var userID = user._id
			var totalEarning = 0
			EarningsDistribution.aggregate({
					$match: {
						$and: [
							{ userID: mongoose.Types.ObjectId(userID) },
							{ amountSatoshi: { $gt: 0 } }
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
					if (result && result.length != 0)
						totalEarning = result[0].sum
					allDone(err, totalEarning)
				}
			)
		})
	}
	// Unused
	// at the top of Dashboard for the Earnings we need to show CHR and NLG earnings
	self.getAllEarningBalances = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			var userID = user._id

			EarningsDistribution.aggregate({
					$match: {
						$and: [
							{ userID: mongoose.Types.ObjectId(userID) },
							{ amountSatoshi: { $gt: 0 } }
						]
					}
				}, {
					$group: {
						_id: '$currency',
						sum: { $sum: "$amountSatoshi" }
						//sum: { $sum: "$netAmountSatoshi" }
					}
				},
				function (err, result) {
					var balances = {}
					result.forEach(function (val) {
						balances[val._id] = val.sum
					})
					allDone(err, balances)
				}
			)
		})
	}

	// ---------- For admin users ----------

	// Used in /dashboard/earning-distributions
	self.getEarningDistributionsByUserID = (data, allDone) => {
		var EarningsDistribution = self.models.earnings.earningsDistribution

		EarningsDistribution.find({ userID: mongoose.Types.ObjectId(data.userID) })
			.sort('-created')
			.limit(100)
			.exec(allDone)
	}

	// Used in /dashboard/earning-distribution-detail
	self.getEarningDistributionByID = (data, allDone) => {
		var EarningsDistribution = self.models.earnings.earningsDistribution

		EarningsDistribution.findOne({ earningsDistributionID: data.earningsDistributionID }, allDone)
	}
	// Used in /dashboard/create-earning-distribution
	self.createEarningDistribution = (data, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var earningsDistributionID = uuid.v4()
		var dupeCheckKey = uuid.v4()

		var newDistribution = new EarningsDistribution({
			earningsDistributionID: earningsDistributionID,
			dupeCheckKey: dupeCheckKey,
			userID: mongoose.Types.ObjectId(data.userID),
			type: data.type,
			currency: data.currency,
			walletAddress: data.walletAddress,
			amountSatoshi: data.amountSatoshi,
			managementFeeSatoshi: data.managementFeeSatoshi,
			electricityFeeSatoshi: data.electricityFeeSatoshi,
		})

		newDistribution.save((err, newDistribution) => {
			if (err) {
				console.log(err)
				allDone(err, null)
			} else {
				allDone(err, newDistribution)

				Users.findOne({ _id: mongoose.Types.ObjectId(newDistribution.userID) }, (err, user) => {

					//Send Notification
					self.lib.messenger.publish("distribution",
						JSON.stringify({
							userGUID: user.userGUID,
							message: `New earning distribution with transactionID (${newDistribution.earningsDistributionID}) has been created!`
						}),
						(err, pub) => {
							console.log('Sent earning distribution created (by adminuser) message to client')
							console.log(err, pub)
						}
					)
				})
			}
		})
	}
	// Used in /dashboard/earning-distribution-detail
	self.updateEarningDistribution = (data, allDone) => {
		var Users = self.models.users.user
		var EarningsDistribution = self.models.earnings.earningsDistribution

		EarningsDistribution.findOne({ earningsDistributionID: data.earningsDistributionID }, (err, updatedDistribution) => {
			updatedDistribution.type = data.type
			updatedDistribution.currency = data.currency
			updatedDistribution.walletAddress = data.walletAddress
			updatedDistribution.amountSatoshi = data.amountSatoshi
			updatedDistribution.managementFeeSatoshi = data.managementFeeSatoshi
			updatedDistribution.electricityFeeSatoshi = data.electricityFeeSatoshi
			updatedDistribution.status = data.status
			updatedDistribution.lastUpdated = Date.now()

			updatedDistribution.save((err, updatedDistribution) => {
				if (err) {
					console.log(err)
					allDone(err, null)
				} else {
					allDone(err, updatedDistribution)

					Users.findOne({ _id: mongoose.Types.ObjectId(updatedDistribution.userID) }, (err, user) => {
						console.log('update', user.userGUID)

						//Send Notification
						self.lib.messenger.publish("distribution",
							JSON.stringify({
								userGUID: user.userGUID,
								message: `The earning distribution with transactionID (${updatedDistribution.earningsDistributionID}) has been updated!`
							}),
							(err, pub) => {
								console.log('Sent earning distribution updated (by adminuser) message to client')
								console.log(err, pub)
							}
						)
					})
				}
			})
		})
	}

	// ---------- Others ----------

	self.checkDupeTransaction = (transactionID, allDone) => {
		var EarningsDistribution = self.models.earnings.earningsDistribution
		EarningsDistribution.findOne({ transactionID: transactionID }, allDone)
	}

	self.getPendingDistributions = (allDone) => {
		var EarningsDistribution = self.models.earnings.earningsDistribution
		var Users = self.models.users.user
		var startDate = new Date()
		startDate.setUTCHours(startDate.getUTCHours(), startDate.getUTCMinutes() - 5, 0, 0)
		var endDate = new Date()
		//get pending distributions that are older than 5 minutes and with a sum GT 1
		console.log(startDate);
		console.log("min", self.lib.helper.toSatoshi(1));
		var min = self.lib.helper.toSatoshi(1)
		EarningsDistribution.aggregate({
			$match: {
				$and: [
					{ amountSatoshi: { $gt: 0 } },
					{ created: { $lte: startDate } },
					{ status: "pending" },
					{ currency: "NLG" },
				]
			}
		}, {
			$group: {
				_id: "$userID",
				sum: { $sum: "$amountSatoshi" }
			},

		}, {
			$project: {
				_id: 1,
				sum: 1
			}
		}, (err, sums) => {
			sums = sums.filter((s) => {
				console.log("min", min, "row", self.lib.helper.fromSatoshi(s.sum));
				return s.sum >= min
			})
			var returnThis = []
			async.each(sums, (row, next) => {
				//only pull the user and process their deposits if they have an address set
				Users.findOne({
					_id: row._id,
					nlgWithdrawAddress: { $nin: ["#", ""] }
				}, (err, user) => {
					if (!user) return next()
					EarningsDistribution.find({
						userID: row._id,
						currency: "NLG",
						created: { $lte: startDate },
						status: "pending"
					}, (err, dists) => {
						var tmp = {
							user: user,
							dists: dists
						}
						tmp.total = dists.reduce((total, curr) => {
							return total += curr.amountSatoshi
						}, 0)

						console.log(user.userGUID + " _ " + user.nlgWithdrawAddress + " _ " + self.lib.helper.fromSatoshi(tmp.total))
						returnThis.push(tmp)
						next()
					})
				})
			}, (err) => {
				//console.log("all done")
				allDone(err, returnThis)
			})
		})
	}
}