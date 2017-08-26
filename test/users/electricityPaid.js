const config = require("../../config");
const moduleLoader = require("../../lib");
const uuid = require("node-uuid")

new moduleLoader().init(config, (err, lib) => {

	lib.earning.getElectricityCostsPaidTodayByUser("58f7bdb3b519bd5c3ee9853c", (err, paid) => {
		console.log(err);
		console.log(paid);
	})

	

})