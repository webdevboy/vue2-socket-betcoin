const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.coinbase.getAccounts((err, data)=>{
		console.log(data);
	})
})