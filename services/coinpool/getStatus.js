const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.coinpool.getCurrentHashRate((err, hashRate) => {
		
		console.log("total hashrate : ", hashRate)
	})
})