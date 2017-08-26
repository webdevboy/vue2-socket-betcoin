const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.messenger.publish('deposit', { channel: "deposit", userGUID: "*", amount: 125 }, (err, pub) => {
		if (err) console.log(err)
		console.log(pub)
	})
})