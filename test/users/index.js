const config = require("../../config");
const moduleLoader = require("../../lib");

new moduleLoader().init(config,(err, lib)=>{
	lib.users.getByDepositAddress("1PBR9AZn2KTgzZZg5XFYC7NGE3XDdyzDb4", (err, data)=>{
		if(err) console.log(err);
		console.log(data);
	})
})
