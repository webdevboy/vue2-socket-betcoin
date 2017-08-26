const request = require("request")
const async = require("async")
module.exports = function (config) {
	var self = this;
	self.config = config;
	self.init = function (allDone) {
		self.dataCache = self.lib.data_redis
		allDone()
	}

	self.nlgToUsd = function (allDone) {
		var nlgUSDPrice = 0
		self.dataCache.get("nlgUsdRate", (err, rate) => {
			if (rate) {
				nlgUSDPrice = rate
				allDone(err, nlgUSDPrice)
			} else {
				request("https://api.cryptonator.com/api/ticker/nlg-usd", (err, response, body) => {
					if (err) console.log(err)
					if (err) return allDone(err)

					body = JSON.parse(body)
					console.log(body);
					nlgUSDPrice = body.ticker.price

					self.dataCache.set("nlgUsdRate", body.ticker.price, (err, set) => {
						self.dataCache.expire("nlgUsdRate", 30000, (err, cached)=>{
							allDone(err, nlgUSDPrice)
						})
					})
					
					//1 NLG = 0.04179861
					//1 CHR = 0.064 / 0.04179861
					//1 CHR = 1.53115 NLG
					//if i have 20000 NLG / 1.53115 i get 13062 CHR

				})
			}
		})
	}

	self.btcToUsd = function (allDone) {
		var btcUSDPrice = 0
		self.dataCache.get("btcUsdRate", (err, rate) => {
			if (rate) {
				btcUSDPrice = rate
				allDone(err, btcUSDPrice)
			} else {
				request("https://api.cryptonator.com/api/ticker/btc-usd", (err, response, body) => {
					if (err) console.log(err)
					if (err) return done(err)

					body = JSON.parse(body)
					console.log(body);
					btcUSDPrice = body.ticker.price

					self.dataCache.set("btcUsdRate", body.ticker.price, (err, set) => {
						self.dataCache.expire("btcUsdRate", 30000, (err, cached)=>{
							allDone(err, btcUSDPrice)
						})
					})
					
				})
			}
		})
	}
	self.btcToNlg= function (allDone) {
		var btcUSDPrice = 0
		self.dataCache.get("btcNlgRate", (err, rate) => {
			if (rate) {
				btcUSDPrice = rate
				allDone(err, btcUSDPrice)
			} else {
				request("https://api.cryptonator.com/api/ticker/btc-nlg", (err, response, body) => {
					if (err) console.log(err)
					if (err) return done(err)

					body = JSON.parse(body)
					console.log(body);
					btcUSDPrice = body.ticker.price

					self.dataCache.set("btcNlgRate", body.ticker.price, (err, set) => {
						self.dataCache.expire("btcNlgRate", 30000, (err, cached)=>{
							allDone(err, btcUSDPrice)
						})
					})
					
				})
			}
		})
	}

	self.ethToUsd = function (allDone) {
		var ethUSDPrice = 0
		self.dataCache.get("ethUsdRate", (err, rate) => {
			if (rate) {
				btcUSDPrice = rate
				allDone(err, ethUSDPrice)
			} else {
				request("https://api.cryptonator.com/api/ticker/eth-usd", (err, response, body) => {
					if (err) console.log(err)
					if (err) return done(err)

					body = JSON.parse(body)
					console.log(body);
					ethUSDPrice = body.ticker.price

					self.dataCache.set("ethUsdRate", body.ticker.price, (err, set) => {
						self.dataCache.expire("ethUsdRate", 30000, (err, cached)=>{
							allDone(err, ethUSDPrice)
						})
					})
					
				})
			}
		})
	}
	self.ethToNlg = function (allDone) {
		var ethUSDPrice = 0
		self.dataCache.get("ethNlgRate", (err, rate) => {
			if (rate) {
				btcUSDPrice = rate
				allDone(err, ethUSDPrice)
			} else {
				request("https://api.cryptonator.com/api/ticker/eth-nlg", (err, response, body) => {
					if (err) console.log(err)
					if (err) return done(err)

					body = JSON.parse(body)
					console.log(body);
					ethUSDPrice = body.ticker.price

					self.dataCache.set("ethNlgRate", body.ticker.price, (err, set) => {
						self.dataCache.expire("ethNlgRate", 30000, (err, cached)=>{
							allDone(err, ethUSDPrice)
						})
					})
					
				})
			}
		})
	}
}