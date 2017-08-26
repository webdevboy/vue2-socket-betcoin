const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")

new moduleLoader().init(config, function (err, lib) {
	lib.messenger.start()
	lib.messenger.on("earnings", (message) => {
		if (message.amount > 0) {
			lib.earning.updateSystemEarnings(message)
		}
	})
})