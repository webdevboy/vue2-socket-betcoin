const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")
const uuid = require("node-uuid")
const request = require("request")

new moduleLoader().init(config, function (err, lib) {
	const workQueue = lib.workQueue
	const users = lib.users
	const earnings = lib.earning
	const deposits = lib.deposit
	const earningsDistribution = lib.earningDistribution
	const gulden = lib.bitcoin
	const dataCache = lib.data_redis
	const toSatoshi = lib.helper.toSatoshi
	const fromSatoshi = lib.helper.fromSatoshi

	function go() {
		var transactionID, transaction, userBalances = false
		var nlgPayments = {}
		var nlgUSDPrice = 0
		//var chrsmNLGPrice = 0
		var distributions = []
		var nlgSendTxn = false
		var alerts = []
		async.series({
			getPendingDists: (done) => {
				lib.earningDistribution.getPendingDistributions((err, data) => {
					console.log(data)
					if (!data.length) return done("noPayments")
					data.forEach((p) => {
						if (p.user.nlgWithdrawAddress != "" && p.user.nlgWithdrawAddress != "#") {
							nlgPayments[p.user.nlgWithdrawAddress] = lib.helper.fromSatoshi(p.total).toFixed(8)
							distributions = distributions.concat(p.dists)
							alerts.push({ userGUID: p.user.userGUID, total: lib.helper.fromSatoshi(p.total), nlgWithdrawAddress: p.user.nlgWithdrawAddress })
						}
					})

					done(err)
				})
			},
			processNLG: (done) => {
				console.log("PAY");
				console.log(nlgPayments);
				gulden.sendMany(nlgPayments, "", (err, paid) => {
					if (err) return done(err)
					console.log("PAID", paid);
					nlgSendTxn = paid
					done()
				})
				//console.log(distributions)
				//nlgSendTxn = uuid.v4()
				//done()
			},
			updateDistributions: (done) => {
				async.each(distributions, (dist, next) => {
					if (!dist) return next()
					dist.transactionID = nlgSendTxn
					dist.status = "sent"
					dist.save((err, saved) => {
						console.log("DIST UPDATED!", saved);
						next()
					})
				}, done)
			},
			sendAlerts: (done) => {
				async.each(alerts, (alert, next) => {
					var sendAlert = {
						userGUID: alert.userGUID,
						message: `NLG Payment Sent ${alert.total.toFixed(8)} NLG to ${alert.nlgWithdrawAddress}`
					}
					console.log("send alert", sendAlert);
					lib.messenger.publish("alert", JSON.stringify(sendAlert), next)
				}, done)

			}
		}, (err) => {
			if (err && err == "noPayments") return setTimeout(go, 5000)
			if (err) console.log(err)
			console.log("Everyone is paid, check again in 5 minutes");
			setTimeout(go, 60000 * 5)
		})
	}
	go()
})