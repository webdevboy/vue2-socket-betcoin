const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")

const txid = process.env.TXNID || false
new moduleLoader().init(config, function (err, lib) {
	const workQueue = lib.workQueue
	const gulden = lib.bitcoin

	function go() {
		var transaction, transactionID, nlgSendTxn = false
		var earningTotal = 0
		var investTotal = 0
		var devTotal = 0
		async.series({
			getEarnings: (done) => {
				lib.earning.getPendingEarnings((err, data) => {
					//console.log(data)
					transactions = data
					earningTotal = data.reduce((sum, curr) => {
						return sum += curr.amountSatoshi
					}, 0)
					earningTotal = lib.helper.fromSatoshi(earningTotal)
					if (earningTotal == 0) return done("noEarnings")
					investTotal = earningTotal * 0.90
					devTotal = investTotal * 0.0833
					investTotal = investTotal - devTotal
					done()
				})
			},
			checkBalance: (done) => {
				gulden.getBalance("*", 0, (err, balance) => {
					console.log("Wallet balance", balance)
					console.log("payout balance", investTotal)
					if (balance < investTotal) return done("insufficientFunds")
					done()
				})
			},
			payout: (done) => {
				var nlgPayments = {}

				var miningReinvestTotal = investTotal * 0.5002
				var ethInvestTotal = investTotal * 0.0833
				var coinExchangeInvestTotal = investTotal * 0.0833
				var chratosNLGInvestTotal = investTotal * 0.1666
				var charityTotal = investTotal * 0.0833

				nlgPayments[config.system.developmentDepositAccount] = devTotal.toFixed(8)

				nlgPayments[config.system.miningInvestmentDepositAccount] = miningReinvestTotal.toFixed(8)
				nlgPayments[config.system.ethInvestmentDepositAccount] = ethInvestTotal.toFixed(8)
				nlgPayments[config.system.coinExchangeInvestmentDepositAccount] = coinExchangeInvestTotal.toFixed(8)
				nlgPayments[config.system.nlgInvestmentDepositAccount] = chratosNLGInvestTotal.toFixed(8)
				nlgPayments[config.system.charityDepositAccount] = charityTotal.toFixed(8)

				console.log("SEND PAYMENTS" , nlgPayments)
				gulden.sendMany(nlgPayments, "" , (err, paid) => {
					if (err) return done(err)
					console.log("PAID", paid);
					nlgSendTxn = paid
					done()
				})
			},
			updatePayments: (done) => {
				async.each(transactions, (trans, next) => {
					console.log("update transaction");
					trans.processed = new Date()
					trans.payoutTxID = nlgSendTxn
					trans.save(next)
				}, done)
			}
		}, (err) => {
			if (err && err == "noEarnings") {
				console.log("No work to do, trying again in 60 seconds");
				setTimeout(go, 60000)
			} else if (err) {
				console.log("ERROR");
				console.log(err);
				setTimeout(go, 60000 * 5)
			} else {
				console.log("Earnings processed, check again in 5 mins ")
				setTimeout(go, 60000 * 5)
			}
		})
	}

	go()

})