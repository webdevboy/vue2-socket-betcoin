const config = require("../../config");
const moduleLoader = require("../../lib/modules");
config.prohashing.debug = true
new moduleLoader().init(config, function (err, lib) {
	console.log("Start request");
	lib.prohashing.on("connected", ()=>{
		console.log("prohashing connected")
	})
	lib.prohashing.on("profitability", (status)=>{
		console.log("profitability")
		console.log(status)
	})
})