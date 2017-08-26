const config = require("../../config");
const moduleLoader = require("../../lib/modules");

/*

*/

new moduleLoader().init(config, function (err, lib) {
	lib.bitcoin.listTransactions(1000, 0, (err, data) => {
		if (err) console.log(err);
		//console.log(data);
		console.log("Found ", data.length, " transactions")
		var sendFeeSum = 0
		var sendFeesCount =0
		data.forEach((t)=>{
			if(t.amount < 0){
				sendFeesCount++
				sendFeeSum+= t.fee
			}
		})

		var sendFeeAvg = sendFeeSum / sendFeesCount
		console.log("AVG ", sendFeeAvg)
		console.log("DONE")
	})
	
})