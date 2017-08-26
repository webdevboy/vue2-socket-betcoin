const request = require("request")
const async = require("async")
module.exports = function (config) {
	var self = this;
	self.config = config;
	self.init = function (allDone) {
		allDone()
	}

	self.getBalance = function (allDone) {
		allDone(null, 0)
	}

	self.getStatus = function (allDone) {
		var useCached = false
		var statusData = false
		console.log("GET STATUS")
		async.series({
			getCachedData: (done) => {
				console.log("GET CACHEC")
				self.lib.data_redis.get("chratos:coinpool:status:useme", (err, found) => {
					console.log("HAVE CACHE?" , found)
					if (found) useCached = true
					done(err)
				})
			},
			getCachedData: (done) => {
				if (!useCached) return done()
				self.lib.data_redis.hgetall("chratos:coinpool:status", (err, detail) => {
					if (!detail) return done(err)
					console.log("CACHED")
					statusData = detail.map((row)=>{
						return JSON.parse(row)
					})
					done(err)
				})
			},
			setCachedKey: (done) => {
				if (!useCached) return done()
				self.lib.data_redis.set("chratos:coinpool:status:useme", new Date(), (err, setit) => {
					lib.data_redis.expire("chratos:coinpool:status:useme", 60, done)
				})
			},
			getFreshData: (done) => {
				if (useCached) return done()
				request("http://www.coinpool.nl/gulden/stats/worker/GaGuSia69k8ncv9QXWg9Di3LaKyf7rTaJo/json", (err, response, body) => {
					console.log("FRESH")
					statusData = JSON.parse(body)					
					done(err)
				})
			},
			cacheData: (done) => {
				//console.log(statusData)
				if (useCached) return done()
				var cacheMe = statusData.map((r)=>{
					return r
				})
				self.lib.data_redis.hmset("chratos:coinpool:status", cacheMe, (err, cached)=>{
					done(err)
				})
			}
		}, (err) => {
			//console.log(statusData)
			allDone(err, statusData)
		})
	}

	self.getCurrentHashRate = function (allDone) {
		self.getStatus((err, body) => {
			var statusData = body	
			var totalHashRate = 0
			totalHashRate = statusData.reduce((hash, current) => {
				return hash += current.hashrate
			}, 0)
			allDone(err, totalHashRate)
		})
	}

	self.getMinerCount = function (allDone) {
		self.getStatus((err, response, body) => {
			var statusData = JSON.parse(body)
			allDone(err, statusData.length)
		})
	}
}