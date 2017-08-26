const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const uuid = require("node-uuid")

new moduleLoader().init(config, (err, lib) => {
	lib.users.createDeposits({userGUID : "be44918b-8683-44a0-afb2-974b026c0096"}, (err, res)=>{
		if(err) console.log("ERR", err)
		console.log(res)
	})

})