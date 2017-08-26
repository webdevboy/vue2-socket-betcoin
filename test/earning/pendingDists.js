const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.earningDistribution.getPendingDistributions((err, data) => {
		if (err) console.log(err);
		console.log(data);
		if(data.length){
			console.log("send user ", lib.helper.fromSatoshi(data[0].total));
		}
		console.log("DONE!")
		//console.log(data[0].dists);
	})
	
})
