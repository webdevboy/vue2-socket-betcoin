const config = require("../../config");
config.modules = ["data_models", "data_mongodb", 'deposit','helper']
const moduleLoader = require("../../lib/modules");
const async = require("async")
new moduleLoader().init(config, (err, lib) => {
	// lib.deposit.getDepositSumsAllUsersGT0("CHR", (err, data) => {
	// 	if (err) console.log(err);
	// 	console.log(data);

	// 	data.forEach(function(element) {
	// 		console.log(lib.helper.fromSatoshi(element.balance))
	// 	});


		
	// })
	 lib.data_models.models.users.deposit.find({currency : "CHRSM", amountSatoshi : {"$lt" : 0}, "meta.note" : "Removing converted CHRSM so everyone\'s balance goes to 0" },(err, res)=>{
	 	if(err) console.log(err)
	 	console.log(res)
	 })
})


// CHR
// 
// 
// 
// 
// 

//CHRSM
// 5000 - 500011.7340282988
// 98.25304688779634 - 9825.535269586157
// 9500 - 950022.2946537678
// 80758.98772976082 - 8076088.298625561
// 4832.137505378183 - 483225.0906254645












