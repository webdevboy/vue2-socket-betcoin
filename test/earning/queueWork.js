const config = require("../../config");
const moduleLoader = require("../../lib/modules");
new moduleLoader().init(config, function (err, lib) {
	//TXNID=661e483de74702ec3efb91de3e0ae143e332b4e74e4edbd96a098892adbbf0c7 node newTransaction.js local
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
})