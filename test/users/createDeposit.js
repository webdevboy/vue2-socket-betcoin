const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const uuid = require("node-uuid")

new moduleLoader().init(config, (err, lib) => {
	const deposit = {
		recAddress: "acbd8935-b87d-4947-a4fe-e76292c3b695",
		userGUID: "acbd8935-b87d-4947-a4fe-e76292c3b695",
		currency: "NLG",
		amount: 867132,
		transactionID: uuid.v4(),
		meta: { note : "credit for a BTC deposit that didn't get calculated properly" }
	}

	lib.users.receivePayment(deposit, (err, results) => {
		if (err) return console.log(err);
		console.log("RES", results);
	})

})