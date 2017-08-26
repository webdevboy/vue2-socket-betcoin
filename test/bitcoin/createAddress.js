const config = require("../../config");
const moduleLoader = require("../../lib");

new moduleLoader().init(config, function (err, lib) {
	// lib.bitcoin.listAccounts((err, res)=>{
	// 	if (err) console.log(err);	
	// 	console.log(res);
	// })

	lib.bitcoin.createAddress((err, data) => {
		if (err) console.log(err);
		console.log(data);
	})
})