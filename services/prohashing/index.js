const config = require("../../config");
config.modules = ["data_redis", "prohashing", "messenger"]
const moduleLoader = require("../../lib/modules");
const async = require("async")
const request = require('request');

var hashValues = {}
var totalHashPower = 0
var externalHashPower = 0
new moduleLoader().init(config, function (err, lib) {
	//lib.messenger.start()
	lib.prohashing.on("profitability", (update)=>{
		var profitability = Array.isArray(update) ? update[0]['1'] : update['1']
		console.log('profitability', profitability)
		lib.messenger.publish('profitability', {channel: 'profitability', totalHashPower : totalHashPower.toFixed(4), btc : profitability.btc, usd : profitability.usd, userGUID : "*"}, (err, pub) => {
		})
	})

	lib.prohashing.on("minerStatus", (update) => {
		totalHashPower = 0
		update.forEach((element, index, array) => {
			if(!isNaN(element.adjusted_hashrate)) hashValues[element.miner_name] = (element.adjusted_hashrate ? parseFloat(element.adjusted_hashrate) : 0)
		})

		for (var k in hashValues) {
			if(!isNaN(hashValues[k])) totalHashPower += parseFloat(hashValues[k])
		}

		console.log("TOTAL", totalHashPower)

		totalHashPower = (totalHashPower / 1000000)
		lib.data_redis.set('totalHashPower', totalHashPower, (err, set) => {})
	})

	setInterval(() => {
		request("http://www.coinpool.nl/gulden/stats/worker/GaGuSia69k8ncv9QXWg9Di3LaKyf7rTaJo/json", (err, response, body) => {
			body.replace('\/', ' ')
			body = JSON.parse(body)
			externalHashPower = 0
			for(var i = 0;i < body.length;i ++) {
				externalHashPower += body[i].hashrate
			}
			externalHashPower = externalHashPower / 1000000
			console.log('externalHashPower: ', externalHashPower);
		});
	}, 10000)

	setInterval(() => {
		console.log("Emit hash power", totalHashPower + externalHashPower)
		lib.messenger.publish('total_hash_power', {channel : "total_hash_power", userGUID : "*", totalHashPower : (totalHashPower + externalHashPower).toFixed(4)}, (err, pub) => {
			if(err) console.log(err)
			console.log(pub)
		})
	}, 1000)
})