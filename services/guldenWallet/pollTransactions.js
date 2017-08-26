const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")
/*
{ amount: 0.8,
  confirmations: 4,
  blockhash: '4d326d532c9b89ba347c4cc5cb51c907de38307fc52821ac0404e02d0749b750',
  blockindex: 3,
  blocktime: 1492270038,
  txid: 'e891858a969159aae828badb8b0bc1c5bdbb8dd2f7c848f90522296a847cd656',
  walletconflicts: [],
  time: 1492269906,
  timereceived: 1492269906,
  'bip125-replaceable': 'no',
  details:
   [ { account: '77a5f778-59d6-4804-8129-a7e8fa92688a',
       accountlabel: 'My account',
       address: 'GaGuSia69k8ncv9QXWg9Di3LaKyf7rTaJo',
       category: 'receive',
       amount: 0.8,
       vout: 1,
       secured_by_checkpoint: 'no' } ],
  hex: '010000000117c139633dd8daccb2ff21e90e67cc195f8315b60c1ae02214e33cc507da3d81000000006a47304402204a42b85c58f69c3ae5875a14e4b686befb7842bf8c554f7585a336dd5e4c75b802200a024ca65c950f2df6bc264e4b4a59ab93aaaaf3fe4c0d08dd752219982d9d88012102c1fc29c12e39dd03392f3e1395fb383d02a768787044106b76088df29d803f90feffffff0253103102000000001976a914c0c9825be21bd0ebdcc7a9911bfcd883a75e3c4388ac00b4c404000000001976a914b43b99870dacfd3fe3437e51397c4c59ae9ca0be88ac9dc00700' }
*/

new moduleLoader().init(config, function (err, lib) {
	var maxRows = 10
	var startRow = 0
	function go() {
		console.log("Process Transactions - starting from ", startRow)
		var hadDupe = false
		lib.bitcoin.listTransactions(100, startRow, (err, data) => {
			if(err) {
				console.log("ERR", err)
				setTimeout(go, 5000)
			}
			async.each(data, (tx, next) => {
				async.series({
					checkDupe: (done) => {
						lib.deposit.checkDupeByTxid(tx.txid, (err, txn) => {
							if (txn) {
								hadDupe = true
								return done("dupe")
							}
							done()
						})
					},
					checkDupeEarnings : (done) =>{
						if (tx.address != config.system.minerDepositAddress) return done()
						//if it's the miner eearnings address check for dupe
						lib.earning.checkDupeByTxid(tx.txid, (err, txn) => {
							if (txn) {
								hadDupe = true
								return done("dupe")
							}
							done()
						})
					},
					process: (done) => {
						if (tx.category != "receive") return done()
						console.log("Not a dupe transaction, process it", tx)
						if (tx.address == config.system.minerDepositAddress) {
							const deposit = {
								recAddress: tx.address,
								userGUID: false,
								currency: "NLG",
								amount: tx.amount,
								transactionID: tx.txid,
								meta: tx
							}
							lib.system.receiveEarnings(deposit, (err, results) => {
								if (err) {
									console.log("ERR TXN", tx)
									return done(err)
								}
								lib.data_redis.lpush(config.system.workQueue.earnings, tx.txid, done)
							})
						} else {
							lib.data_redis.lpush(config.system.workQueue.userDeposit, tx.txid, (err, queued) => {
								done(err)
							})
						}
					}
				}, (err) => {
					if (err == "dupe") {
						console.log("ERR DUPE",  err)
						return next()
					}
					next(err)
				})
			}, (err) => {
				if (err) console.log(err)
				//if there were no dupe transactions let's run again immediately
				if (!hadDupe) {
					startRow += 10
					return setImmediate(go)
				}
				//there was at least 1 dupe so let's wait for a minute to run again
				console.log("found a dupe so wait for 60 seconds to check again")
				setTimeout(go, 60000)
			})
		})
	}

	go()

})