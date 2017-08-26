const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")

const txid = process.env.TXNID || false
new moduleLoader().init(config, function (err, lib) {
	const workQueue = lib.workQueue

	function go() {
		var transaction, transactionID = false
		async.series({
			getWork: (done) => {
				workQueue.getWork("userDeposit", (err, work) => {
					if (!work) return done("nowork")
					if (err) return done(err)
					transactionID = work.trim()
					console.log("WORK", work);
					done()
				})
			},
			getTransaction: (done) => {
				lib.bitcoin.getTransaction(transactionID, (err, data) => {
					if (err) return done(err)
					transaction = data
					if (transaction.amount < 0) {
						console.log(transaction)
						return done("notDeposit")
					}
					console.log(transaction)
					done()
				})
			},
			checkDupe: (done) => {
				lib.deposit.checkDupeByTxid(transactionID, (err, exists) => {
					if (!!exists) return done("dupeTransaction")
					done()
				})
			},
			logPayment: (done) => {
				if (transaction.details.length === 0) return done("notransaction")

				const deposit = {
					recAddress: transaction.details[0].address,
					userGUID: false,
					currency: "NLG",
					amount: transaction.details[0].amount,
					transactionID: transactionID,
					meta: transaction
				}

				if (deposit.recAddress == config.system.minerDepositAddress) {
					// THIS IS THE ACCOUNT FOR MINER EARNINGS!!!
					console.log("process miner earnings")
					lib.system.receiveEarnings(deposit, (err, results) => {
						if (err) return done(err)
						lib.messenger.publish('earnings', { channel: "earnings", userGUID: "*", amount: transaction.details[0].amount }, (err, pub) => {
							if (err) console.log(err)
							console.log(pub)
						})
						lib.data_redis.lpush(config.system.workQueue.earnings, transactionID, done)
					})
				} else {
					lib.users.receivePayment(deposit, (err, results) => {
						if (err) return done(err)

						lib.messenger.publish("alert", JSON.stringify({
							userGUID: results.user.userGUID,
							message: `Deposit Received:  ${transaction.details[0].amount} NLG and converted to ${lib.helper.fromSatoshi(results.chrDeposit.netAmountSatoshi).toFixed(8)} CHR`
						}), (err, pub) => {
							done()
						})

						if (!!results.refUser.userGUID) {
							lib.messenger.publish("bonus", JSON.stringify({
								userGUID: results.refUser.userGUID,
								message: `Referral Bonus received for ${lib.helper.fromSatoshi(results.refDeposit.netAmountSatoshi).toFixed(8)} ${results.refDeposit.currency} `
							}), (err, pub) => {})
						}

						lib.messenger.publish('deposit', { channel: "deposit", userGUID: "*", amount: transaction.details[0].amount }, (err, pub) => {
							if (err) console.log(err)
							console.log(pub)
						})
					})
				}

			},
			deleteWork: (done) => {
				workQueue.delete("userDeposit", transactionID, (err, res) => {
					console.log("WORK DELETED", res);
					done(err)
				})
			}
		}, (err) => {
			if (err && err == "nowork") {
				console.log("No work to do, trying again in 5 seconds");
				setTimeout(go, 5000)
			} else if (err && err == "notDeposit") {
				workQueue.delete("userDeposit", transactionID, (err, res) => {
					console.log("WORK DELETED - NOT DEPOSIT", res);
					setImmediate(go)
				})
			} else if (err && err == "dupeTransaction") {
				workQueue.delete("userDeposit", transactionID, (err, res) => {
					console.log("WORK DELETED - DUPE TRANSACTION", res);
					setImmediate(go)
				})
			} else if (err) {
				console.log("ERROR");
				console.log(err);
				setImmediate(go)
			} else {
				setImmediate(go)
			}
		})
	}

	go()

})