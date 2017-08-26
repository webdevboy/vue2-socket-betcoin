const config = require("../../config");
const moduleLoader = require("../../lib");

new moduleLoader().init(config, function (err, lib) {
	lib.bittrex.getBalance("NLG", (err, data)=>{
		console.log(data);
	})
})