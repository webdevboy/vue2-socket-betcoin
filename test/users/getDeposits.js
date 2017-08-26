const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, (err, lib) => {

	lib.deposit.getDepositsByUser({ userGUID: "1b65b9e8-fe33-4f9c-8179-f3a26f91fb94" }, (err, data) => {
		if (err) console.log(err);
		console.log("Deposits")
		console.log(data[1]);
	})
})