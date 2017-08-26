const config = require("../../config");
config.modules = ["data_redis"]
const moduleLoader = require("../../lib/modules");
const async = require("async")

const txid = process.env.TXNID || false

/*

walletnotify=/home/ubuntu/txn.sh %s
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

  walletnotify=/home/ubuntu/.nvm/versions/node/v6.10.2/bin/node /home/ubuntu/ChratosMining/services/guldenWallet/newTransaction.js 

{
            "_id": {
                "$oid": "58f6ca17707e2b1a97de0d57"
            },
            "amountSatoshi": 1000000,
            "meta": {
                "amount": 0.01,
                "confirmations": 0,
                "trusted": false,
                "txid": "f3d966b028808cd415dec327019355d9fe108794294b9830fb8af2808eba3a8b",
                "walletconflicts": [],
                "time": 1492568598,
                "timereceived": 1492568598,
                "bip125-replaceable": "no",
                "details": [
                    {
                        "account": "77a5f778-59d6-4804-8129-a7e8fa92688a",
                        "accountlabel": "My account",
                        "address": "GaGuSia69k8ncv9QXWg9Di3LaKyf7rTaJo",
                        "category": "receive",
                        "amount": 0.01,
                        "vout": 0,
                        "secured_by_checkpoint": "no"
                    }
                ],
                "hex": "010000000127ffcb87bbdf46f10162b37113802e8bf091adc41704f5c32fa898e760b9f160010000006a473044022029c6237103a59afae1794ac1729428ccb8a33fd96f857f8f3d669f80d1eb85ad0220378ea50f8c955266db4b5bef42837aa9320492fb505e7361f7e192a414bffeb6012102caead041a1715caf5aa41e248afa7a6154e34f2a51a388f51ed98ba77ceead0bfeffffff0240420f00000000001976a914b43b99870dacfd3fe3437e51397c4c59ae9ca0be88ac10937430170000001976a91470c784c4fd1aec4f21a81574d9304e01ad4c2ade88ac74c80700"
            },
            "transactionID": "f3d966b028808cd415dec327019355d9fe108794294b9830fb8af2808eba3a8b",
            "currency": "nlg",
            "__v": 0,
            "lastUpdated": {
                "$date": "2017-04-19T02:23:19.677Z"
            },
            "created": {
                "$date": "2017-04-19T02:23:19.677Z"
            },
            "convertedOn": {
                "$date": "2017-04-19T02:23:19.677Z"
            },
            "conversionFee": 0
        },

*/

new moduleLoader().init(config, function (err, lib) {
	lib.data_redis.lpush(config.system.workQueue.userDeposit, txid, (err, queued) => {
		if (err) return process.exit(-1)
        console.log("new transaction ", txid)
        console.log("transactions in queue ", queued)
		process.exit(0)
	})

})

// new moduleLoader().init(config, function (err, lib) {
// 	console.log("New Deposit TXN ", txid)
// 	if (!txid) return console.log("NO TXN ID")
// 	lib.bitcoin.getTransaction(txid, (err, data) => {
// 		//console.log("Transaction Details", data)
// 		if (err) {
// 			console.log("ERROR FINDNG TXN", err);
// 			process.exit(-1)
// 		}

// 		//don't process transactions less than 0 - we only care about deposits
// 		if (data.details[0].amount <= 0) process.exit(0)

// 		const deposit = {
// 			recAddress: data.details[0].address,
// 			userGUID: false,
// 			currency: "NLG",
// 			amount: data.details[0].amount,
// 			transactionID: txid,
// 			meta: data
// 		}

// 		if (deposit.recAddress == config.system.minerDepositAddress) {
// 			// THIS IS THE ACCOUNT FOR MINER EARNINGS!!!
// 			async.series({
// 				logDeposit: (done) => {
// 					lib.system.receiveEarnings(deposit, (err, results) => {
// 						if (err) console.log(err);
// 						//console.log("SAVED", results);
// 						done(err)
// 					})
// 				},
// 				queuePayout: (done) => {
// 					lib.data_redis.lpush(config.system.workQueue.earnings, txid, done)
// 				}
// 			}, (err) => {
// 				//if(err) throw err
// 				if (err) console.log(err)
// 				console.log("Miner earnings received and processed");
// 				process.exit(0)
// 			})
// 		} else {
// 			lib.data_redis.lpush(config.system.workQueue.userDeposit, txid, (err, queued) => {
// 				if (err) return process.exit(-1)
// 				process.exit(0)
// 			})

// 		}

// 	})
// })