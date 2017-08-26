const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.earning.getPendingEarnings((err, data) => {
		if (err) console.log(err);
		//console.log(data);
		var earningTotal = data.reduce((sum, curr) => {
			return sum += curr.amountSatoshi
		}, 0)
		console.log("total payout", lib.helper.fromSatoshi(earningTotal))
		console.log("DONE!")
		//console.log(data[0].dists);
	})

})