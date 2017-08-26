const config = require("../../config");
config.modules = ["bitcoin"]
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.bitcoin.getBalance("*", 0, (err, data)=>{
		if(err) console.log(err);
		console.log(data);
	})
})