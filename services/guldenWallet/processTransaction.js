const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")

new moduleLoader().init(config, function (err, lib) {
	const workQueue = lib.workQueue
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
				console.log(transaction)
				done()
			})
		},
		sendWorkd: (done) => {
			const deposit = {
				recAddress: transaction.details[0].address,
				userGUID: false,
				currency: "NLG",
				amount: transaction.details[0].amount,
				transactionID: txid,
				meta: transaction
			}

			if(deposit.amount < 0) return done("notDeposit")

			if (deposit.recAddress == config.system.minerDepositAddress) {
				// THIS IS THE ACCOUNT FOR MINER EARNINGS!!!
				async.series({
					logDeposit: (done) => {
						lib.system.receiveEarnings(deposit, (err, results) => {
							if (err) console.log(err);
							//console.log("SAVED", results);
							done(err)
						})
					},
					queuePayout: (done) => {
						lib.data_redis.lpush(config.system.workQueue.earnings, txid, done)
					}
				}, (err) => {
					//if(err) throw err
					if (err) console.log(err)
					console.log("Miner earnings received and processed");
					process.exit(0)
				})
			} else {
				lib.data_redis.lpush(config.system.workQueue.userDeposit, txid, (err, queued) => {
					if (err) return process.exit(-1)
					process.exit(0)
				})
			}

		}
	}, (err) => {
		if (!err || err == "notDeposit") {
			workQueue.delete("userDeposit", transactionID, (err, res) => {
				console.log("WORK DELETED", res);
			})
		}else{
			console.log("ERROR")
			console.log(err)
		}
	})
})