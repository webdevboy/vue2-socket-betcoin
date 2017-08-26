const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")
const uuid = require("node-uuid")
const request = require("request")

new moduleLoader().init(config, function (err, lib) {
	const workQueue = lib.workQueue
	const users = lib.users
	const earnings = lib.earning
	const deposits = lib.deposit
	const earningsDistribution = lib.earningDistribution
	const gulden = lib.bitcoin
	const dataCache = lib.data_redis
	const toSatoshi = lib.helper.toSatoshi
	const fromSatoshi = lib.helper.fromSatoshi

	function go() {
		var transactionID, transaction, userBalances = false
		var totalMhash = false
		var nlgPayments = {}
		var nlgUSDPrice = 0
		var chrNLGPrice = 1
		var distributions = []
		var nlgSendTxn = false
		async.series({
			haveWork: (done) => {
				workQueue.getWork("earnings", (err, work) => {
					if (!work) return done("nowork")
					if (err) return done(err)
					transactionID = work.trim()
					console.log("WORK", work);
					done()
				})
				// transactionID = "8589072f3c2778ffef7a196959c46c96a4811317c385085c2e0d3ef548d51657"
				// done()
			},
			getTransaction: (done) => {
				earnings.getTransaction(transactionID, (err, record) => {
					if (err) console.log(err);
					if (!record) return done("missingTransaction")
					if (err) return done(err)
					console.log("RECORD AMOUNT", record.amountSatoshi);
					if (record.amountSatoshi <= 0) {
						return done("notDeposit")
					}

					transaction = record
					done()
				})
			},
			checkDupe: (done) => {

				done()
			},

			getCHRBalance: (done) => {
				deposits.getDepositSumsAllUsersGT0("CHR", (err, rows) => {
					userBalances = rows
					done()
				})
			},
			getTotalCHRCount: (done) => {
				lib.deposit.getAllDepositsByCurrency("CHR", (err, data) => {
					totalMhash = lib.helper.fromSatoshi(data[0].sum)
					done(err)
				})
			},
			processCHR: (done) => {
				// each CHR is equal to 1 NLG so it's easy to calculate the payout
				var earningsInCHR = fromSatoshi(transaction.amountSatoshi)
				console.log("total mhash", totalMhash)
				// figure out how much they earn based on how much CHR has been sold total
				var perMHASHEarningNLG = fromSatoshi(transaction.amountSatoshi) / totalMhash
				console.log("Per MSHASH Earnings NLG", perMHASHEarningNLG);
				//console.log(userBalances);
				async.each(userBalances, (row, next) => {
					//CHR BALANCE
					var userMhash = fromSatoshi(row.balance)

					// EARNING IN NLG
					var userEarning = (perMHASHEarningNLG * userMhash)

					var currUser = false
					var userPaidElectricityToday = 0
					//take the electric cost in CHR and multiply by their CHR balance - convert to satoshi
					var userOwesElectricityPerDay = toSatoshi(config.system.electricityCostPerMhashPerDay * userMhash)
					var electricityFee = 0
					var manageFeeCHR = 0
					var manageFeeNLG = 0
					var userEarningDistribution = false
					var userEarningCHR = (userEarning * 0.9) / chrNLGPrice
					var userEarningCHRSatoshi = toSatoshi(userEarningCHR)
					var userEarningNLG = userEarning * 0.1
					var userNetPaymentCHR = 0
					var userNetPaymentNLG = 0
					//we need to create a CHR deposit for this 
					async.series({
						getUser: (sDone) => {
							users.getByID(row._id, (err, user) => {
								if (user === null) return sDone("nouser")
								currUser = user
								sDone(err)
							})
						},
						getElectricyPaidToday: (sDone) => {
							earnings.getElectricityCostsPaidTodayByUser(row._id, (err, paidToday) => {
								console.log("Earnings NLG ", fromSatoshi(transaction.amountSatoshi));
								console.log("Earnings CHR ", earningsInCHR);
								console.log("USer has ", userMhash, " CHR");
								console.log("User Earns ", userEarning, " NLG ");
								console.log("User Earns ", userEarningCHR, " CHR ");
								console.log("User Earns ", userEarningCHRSatoshi, " Satoshi CHR");

								userPaidElectricityToday = paidToday.length > 0 ? paidToday[0].balance : 0
								if (userPaidElectricityToday >= userOwesElectricityPerDay) return sDone()
								//they still owe for today so calculate their payment
								userElecticityOwedToday = userOwesElectricityPerDay - userPaidElectricityToday
								if (userEarningCHRSatoshi < userElecticityOwedToday) {
									// they aren't earning enough to cover their electricity cost so take half of their earnings
									console.log("Use half of their earnings for electricity");
									electricityFee = userEarningCHRSatoshi * 0.5
									//if half of what they earn is more than what they owe, take it all
									if (electricityFee > userElecticityOwedToday) electricityFee = userElecticityOwedToday
								} else if (userEarningCHRSatoshi >= userElecticityOwedToday) {
									//if they earn more on this block than they owe just take the whole fee
									electricityFee = userElecticityOwedToday
								}
								//console.log("CHR BEFORE ELECT ", fromSatoshi(userEarningCHRSatoshi));
								//console.log("FEE CHARGED FOR ELECT ", electricityFee);
								//console.log("FEE CHARGED FOR ELECT ", fromSatoshi(electricityFee));

								userEarningCHRSatoshi = userEarningCHRSatoshi - electricityFee
								userEarningCHR = fromSatoshi(userEarningCHRSatoshi)
								//console.log("USER EARNINGS CHR - ", userEarningCHR);
								sDone()
							})
						},
						createEarningsDistributionCHR: (sDone) => {
							//calculate the earnings after fees per currency
							console.log("USER EARNINGS CHR - ", userEarningCHR)
							manageFeeCHR = userEarningCHR * 0.05
							console.log("manageFeeCHR ", manageFeeCHR)
							console.log("userNetPaymentCHR ", userEarningCHR)
							userNetPaymentCHR = userEarningCHR - manageFeeCHR
							manageFeeNLG = userEarningNLG * 0.05
							userNetPaymentNLG = userEarningNLG - manageFeeNLG
							console.log("manageFeeNLG ", manageFeeNLG);
							console.log("userNetPaymentNLG ", userNetPaymentNLG)

							var chrDistribution = {
								earningsDistributionID: uuid.v4(),
								earningsID: transaction._id,
								userID: row._id,
								currency: "CHR",
								walletAddress: row.userGUID,
								amount: userNetPaymentCHR,
								managementFee: manageFeeCHR ,
								electricityFee: electricityFee , //convert this to CHR,
								status: "sent"
							}
							earningsDistribution.create(chrDistribution, (err, dist) => {
								userEarningDistribution = dist
								distributions.push(dist)
								sDone(err)
							})
						},
						createCHRDeposit: (sDone) => {
							var deposit = {
								recAddress: currUser.userGUID,
								userGUID: currUser.userGUID,
								currency: "CHR",
								amount: userNetPaymentCHR,
								transactionID: uuid.v4(),
								meta: {
									earningsID: transaction._id,
									earningsDistributionID: earningsDistribution._id
								},
								status: "sent"
							}

							deposits.create(deposit, (err, results) => {
								if (err) return sDone(err)
								//console.log("RES", results);
								lib.messenger.publish("alert", JSON.stringify({
									userGUID: deposit.userGUID,
									message: `You have just received mining earnings of ${userNetPaymentCHR.toFixed(8)} CHR `
								}), (err, pub) => {})
								sDone(err)
							})
						},
						createEarningsDistributionNLG: (sDone) => {
							var nlgDistribution = {
								earningsDistributionID: uuid.v4(),
								earningsID: transaction._id,
								userID: row._id,
								currency: "NLG",
								walletAddress: currUser.nlgWithdrawAddress,
								amount: userNetPaymentNLG,
								managementFee: manageFeeNLG,
								electricityFee: 0,
								status: "pending"
							}

							earningsDistribution.create(nlgDistribution, (err, dist) => {
								console.log("NLG DIST", dist);
								distributions.push(dist)
								if (err) console.log("ERR", err);
								console.log("DEPOSIT ADDY ", currUser.nlgWithdrawAddress);
								sDone(err)
							})
						},
					}, (err) => {
						if (err) console.log("SERIES ERROR", err);
						next(err)
					})
				}, (err) => {
					console.log("LOOP DONE", err);
					done()
				})
			},
		}, (err) => {
			if (err && err == "nowork") {
				console.log("no work to do, checking again in a few seconds");
				return setTimeout(go, 5000)
			} else if (err == "notDeposit") {
				console.log("Not a Deposit - delete it and move on", err);
				workQueue.delete("earnings", transactionID, (err, res) => {
					console.log("WORK DELETED", res);
					setImmediate(go)
				})
			} else if (err) {
				console.log("Error ", err);
				return setTimeout(go, 5000)
			} else {
				workQueue.delete("earnings", transactionID, (err, res) => {
					console.log("WORK DELETED", res);
					setImmediate(go)
				})
			}

		})
	}
	// start the processor
	console.log("Start earnings queue processor");
	go()

})