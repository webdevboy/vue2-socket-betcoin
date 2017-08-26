const config = require("../../config");
const moduleLoader = require("../../lib/modules");

new moduleLoader().init(config, function (err, lib) {
	lib.messenger.publish('earnings', { channel: "earnings", userGUID: "*", amount: 125 }, (err, pub) => {
		if (err) console.log(err)
		console.log(pub)
	})
})