const request = require('request')
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
		var currency = data.currency
		data.amountSatoshi = data.amount * 100000000
		data.conversionFee = 0
		var newDeposit = new self.models.users.deposit(data)
		if (currency != "NLG" && currency != "CHR") newDeposit.conversionFee = data.amountSatoshi * .05

		newDeposit.netAmountSatoshi = data.amountSatoshi - newDeposit.conversionFee
		self.lib.users.getByDepositAddress(data.recAddress, (err, user) => {
			newDeposit.userID = user._id
			newDeposit.save((err, newDeposit) => {
				allDone(err, newDeposit)

				//Send Notification
				self.lib.messenger.publish("deposit",
					JSON.stringify({
						userGUID: user.userGUID,
						message: `Deposit of ${data.amount} CHR has been created.`
					}),
					(err, pub) => {
						console.log('Sent deposit created message to client')
					}
				)
			})
		})
	}

	// ---------- For users ----------

	// Used
	// Fill deposit history data table
	self.getDepositsByUser = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			if (err) console.log(err)
			if (user == null) {
				allDone(err, [])
			} else {
				var userID = user._id
				Deposits.find({ userID: userID })
					//.select('currency amountSatoshi created')
					.sort('-created')
					.limit(100)
					.exec(allDone)
			}
		})
	}

	// Used
	// Display all balances on "My Detail" section of "Profile" page
	// Formula: Deposit + EarningsDistribution
	self.getAllDepositBalances = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			var userID = user._id
			async.parallel([
					(done) => {
						Deposits.aggregate({
								$match: {
									$and: [
										{ userID: mongoose.Types.ObjectId(userID) },
										{ currency: 'CHR' }
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
								done(err, result)
							}
						)
					},
					(done) => {
						EarningsDistribution.aggregate({
								$match: {
									$and: [
										{ userID: mongoose.Types.ObjectId(userID) },
										{ currency: 'NLG' }
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
								done(err, result)
							}
						)
					},
				],
				(err, results) => {
					if (err) console.log(err)
					var balance = {}
					balance['CHR'] = results[0][0] ? results[0][0].sum : 0
					balance['NLG'] = results[1][0] ? results[1][0].sum : 0
					allDone(err, balance)
				}
			)
		})
	}

	//Unused
	self.getEarningsDepositsTotal = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit
		var EarningsDistribution = self.models.earnings.earningsDistribution
		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			var userID = user._id
			Deposits.aggregate({
					$match: {
						$and: [
							{ userID: mongoose.Types.ObjectId(userID) },
							{ "meta.earningsID": { "$exists": true } }
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
					allDone(err, result)
				})
		})

	}

	//Unused
	self.getAllDepositsByCurrency = (currency, allDone) => {
		var Deposits = self.models.users.deposit
		Deposits.aggregate({
				$match: { currency: currency }
			}, {
				$group: {
					_id: '$currency',
					sum: { $sum: "$amountSatoshi" }
					//sum: { $sum: "$netAmountSatoshi" }
				}
			}, allDone)
	}

	//Unused
	self.getNonEarningsDepositsTotal = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit
		var EarningsDistribution = self.models.earnings.earningsDistribution

		var userGUID = data.userGUID
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			var userID = user._id
			Deposits.aggregate({
					$match: {
						$and: [
							{ userID: mongoose.Types.ObjectId(userID) },
							{ "meta.earningsID": { "$exists": false } }
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
					allDone(err, result)
				})
		})

	}

	// Used
	// Called when the user press "Send" button on "Confirm Remittance" dialog
	this.remit = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		Users.findOne({
			$or: [
				{ userGUID: data.receiver },
				{ email: data.receiver }
			]
		}, (err, user) => {
			if (err) console.log(err)
			if (user == null) {
				allDone("You have entered incorrect receiver.", null)
			} else {
				var senderDeposit = new Deposits({
					userID: mongoose.Types.ObjectId(data._id),
					currency: 'CHR',
					amountSatoshi: -data.remittance,
					netAmountSatoshi: -data.remittance,
					convertedAmount: -data.remittance,
					convertedCurrency: 'CHR',
					conversionFee: 0,
					meta: { receiverID: user._id },
					transactionID: uuid.v4(),
					type: 'transfer'
				})
				senderDeposit.markModified('meta')

				var receiverDeposit = new Deposits({
					userID: user._id,
					currency: 'CHR',
					amountSatoshi: data.remittance,
					netAmountSatoshi: data.remittance,
					convertedAmount: data.remittance,
					convertedCurrency: 'CHR',
					conversionFee: 0,
					meta: { receiverID: data._id },
					transactionID: uuid.v4(),
					type: 'receive'
				})
				receiverDeposit.markModified('meta')

				senderDeposit.save()
				receiverDeposit.save()
				//Send Response
				allDone(null, null)

				//Send Notification

				var nonSatoshiRemittance = self.lib.helper.fromSatoshi(data.remittance).toFixed(8);
				self.lib.messenger.publish("deposit",
					JSON.stringify({
						userGUID: data.userGUID,
						message: `Deposit of -${nonSatoshiRemittance} CHR has been created.`
					}),
					(err, pub) => {
						console.log('Deposit of -${nonSatoshiRemittance} CHR has been created.')
					}
				)

				self.lib.messenger.publish("deposit",
					JSON.stringify({
						userGUID: user.userGUID,
						message: `Deposit of +${nonSatoshiRemittance} CHR has been created.`
					}),
					(err, pub) => {
						console.log('Deposit of +${nonSatoshiRemittance} CHR has been created.')
					}
				)
			}
		})
	}

	// Unused
	// Get deposit sum by userGUID and currency
	// Calculate BTC/ETH/NLG/CHR balances by doing a SUM of all deposits in the arrays on user record
	self.getDepositSumByCurrency = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		var userGUID = data.userGUID
		var currency = data.currency.toUpperCase()
		Users.findOne({ userGUID: userGUID }, function (err, user) {
			var userID = user._id
			Deposits.aggregate({
					$match: {
						$and: [
							{ userID: mongoose.Types.ObjectId(userID) },
							{ currency: currency }
						]
					}
				}, {
					$group: {
						_id: null,
						sum: { $sum: "$amountSatoshi" }
					}
				}, {
					$project: {
						_id: 0,
						sum: 1
					}
				},
				function (err, result) {
					if (err) console.log(err)
					allDone(err, (!result || result.length == 0) ? 0 : result[0].sum)
				}
			)
		})
	}

	// ---------- For admin users ----------

	// Fill deposit history data table (Admin)
	self.getDepositsByUserID = (data, allDone) => {
		var Deposits = self.models.users.deposit
		Deposits.find({ userID: mongoose.Types.ObjectId(data._id) })
			.sort('-created')
			.limit(100)
			.exec(allDone)
	}

	// Get deposit by transactionID (Admin)
	// == Same as method below (checkDupeByTxid) ==

	// Create deposit
	self.createDeposit = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		var deposit = new Deposits({
			userID: mongoose.Types.ObjectId(data.userID),
			currency: data.currency,
			amountSatoshi: data.amountSatoshi,
			netAmountSatoshi: data.netAmountSatoshi,
			convertedCurrency: data.convertedCurrency,
			convertedAmount: data.convertedAmount,
			conversionFee: data.conversionFee,
			transactionID: uuid.v4()
		})

		deposit.save((err, newDeposit) => {
			allDone(err, newDeposit)

			Users.findOne({ _id: mongoose.Types.ObjectId(data.userID) }, (err, user) => {

				var amountNonSatoshi = self.lib.helper.fromSatoshi(newDeposit.amountSatoshi).toFixed(8);
				//Send Notification
				self.lib.messenger.publish("deposit",
					JSON.stringify({
						userGUID: user.userGUID,
						message: `Deposit of ${amountNonSatoshi} CHR has been created.`
					}),
					(err, pub) => {
						console.log('Sent deposit created (by adminuser) message to client')
					}
				)
			})
		})
	}

	// Update deposit
	self.updateDeposit = (data, allDone) => {
		var Users = self.models.users.user
		var Deposits = self.models.users.deposit

		Deposits.findOne({ transactionID: data.transactionID }, (err, deposit) => {
			deposit.currency = data.currency
			deposit.amountSatoshi = data.amountSatoshi
			deposit.netAmountSatoshi = data.netAmountSatoshi
			deposit.convertedCurrency = data.convertedCurrency
			deposit.convertedAmount = data.convertedAmount
			deposit.conversionFee = data.conversionFee
			deposit.lastUpdated = Date.now()
			deposit.save((err, updatedDeposit) => {
				allDone(err, updatedDeposit)

				Users.findOne({ _id: mongoose.Types.ObjectId(deposit.userID) }, (err, user) => {

					//Send Notification
					self.lib.messenger.publish("deposit",
						JSON.stringify({
							userGUID: user.userGUID,
							message: `Deposit has been updated by administrator.`
						}),
						(err, pub) => {
							console.log('Sent deposit updated (by adminuser) message to client')
							console.log(err, pub)
						}
					)
				})
			})
		})
	}

	// ---------- Other ----------

	self.checkDupeByTxid = (txid, allDone) => {
		var Deposits = self.models.users.deposit
		Deposits.findOne({ transactionID: txid }, allDone)
	}

	self.getDepositSumsAllUsers = (currency, allDone) => {
		self.models.users.deposit.aggregate([{
				$match: {
					currency: currency
				}
			},
			{ $group: { _id: "$userID", balance: { $sum: "$netAmountSatoshi" } } },
		], allDone)
	}

	self.getDepositSumsAllUsersGT0 = (currency, allDone) => {
		self.models.users.deposit.aggregate([{
				$match: { currency: currency }
			},
			{
				$group: { _id: "$userID", balance: { $sum: "$netAmountSatoshi" } }
			},
			{
				$match: { balance: { $gt: 0 } }
			},
			{
				$project: { _id: 1, balance: 1 }
			}
		], allDone)
	}
}