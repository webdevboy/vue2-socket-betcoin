const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.workQueue.retryOne("earnings", (err, res)=>{
		if(err) console.log(err);
		console.log(res);
	})
})