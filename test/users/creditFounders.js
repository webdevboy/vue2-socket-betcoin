const config = require("../../config");
const pConfig = require("../../config/prod.js")
config.mongodb = pConfig.mongodb
const moduleLoader = require("../../lib/modules");
const uuid = require("node-uuid")

//58f7bdb3b519bd5c3ee9853c -- admin
//590f3a1bb75be65467a87cd2 -- arvid
//590f3a69eafec654b42209d8 -- robert
//590f3b12319460550d6b6733 -- noah


new moduleLoader().init(config, (err, lib) => {
	var robert = 100000 * .85
	var arvid = 100000 * .10
	var noah = 100000 * .05

	console.log("create deposit for Robert", robert)
	var chrDeposit = {
		recAddress: 'acbd8935-b87d-4947-a4fe-e76292c3b695',
		userGUID: 'acbd8935-b87d-4947-a4fe-e76292c3b695',
		currency: "CHR",
		amount: robert,
		transactionID: uuid.v4(),
		meta: {
			initialDeposit : true
		},
	}

	lib.deposit.create(chrDeposit, (err, results) => {
		if (err) return console.log(err);
		console.log("RES", results);
	})

	console.log("create deposit for Arvid", arvid)
	var chrDeposit = {
		recAddress: '0dfb9a08-f8a2-4fc7-8be6-ec691354fc25',
		userGUID: '0dfb9a08-f8a2-4fc7-8be6-ec691354fc25',
		currency: "CHR",
		amount: arvid,
		transactionID: uuid.v4(),
		meta: {
			initialDeposit : true
		},
	}

	lib.deposit.create(chrDeposit, (err, results) => {
		if (err) return console.log(err);
		console.log("RES", results);
	})

	console.log("create deposit for Noah", noah)
	var chrDeposit = {
		recAddress: '1b65b9e8-fe33-4f9c-8179-f3a26f91fb94',
		userGUID: '1b65b9e8-fe33-4f9c-8179-f3a26f91fb94',
		currency: "CHR",
		amount: noah,
		transactionID: uuid.v4(),
		meta: {
			initialDeposit : true
		},
	}

	lib.deposit.create(chrDeposit, (err, results) => {
		if (err) return console.log(err);
		console.log("RES", results);
	})

})