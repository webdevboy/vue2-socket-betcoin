const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, (err, lib) => {
	lib.deposit.getEarningsDepositsTotal({userGUID : "1b65b9e8-fe33-4f9c-8179-f3a26f91fb94"}, (err, res)=>{
		console.log(res)
		console.log("TOTAL EARNINGS", lib.helper.fromSatoshi(res[0].sum.toFixed(8)))
	})	
	
	lib.deposit.getNonEarningsDepositsTotal({userGUID : "1b65b9e8-fe33-4f9c-8179-f3a26f91fb94"}, (err, res)=>{
		console.log(res)
		console.log("TOTAL DEPOSITED ", lib.helper.fromSatoshi(res[2].sum.toFixed(8)))
	})	
})

