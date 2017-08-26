const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.deposit.getAllDepositsByCurrency('CHRSM', (err, data) => {
		if (err) console.log(err);
		console.log(lib.helper.fromSatoshi(data[0].sum));
	})

})