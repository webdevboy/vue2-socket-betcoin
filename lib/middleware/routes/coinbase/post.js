const async = require("async")
module.exports = function (config) {
	var self = this
	self.config = config

	self.init = function (app, allDone) {
		allDone()
	}

	self.event = (req, res, allDone) => {
		var event = req.body
		const deposit = {
			recAddress: event.data.address,
			userGUID: event.data.name,
			currency: event.additional_data.amount.currency,
			amount: event.additional_data.amount.amount,
			transactionID: event.additional_data.transaction.id,
			meta: event
		}
		console.log(deposit);
		req.lib.users.receivePayment(deposit, (err, results) => {
			console.log(err);
			console.log(results);
			if (err && err != "nouser") return res.sendStatus(500)
			if (err && err == "nouser") {
				//wer have a deposit for someone that we don't have a user record for - log it 
				deposit.noUser = true
				deposit.rawBody = event
				return req.lib.messenger.publish("deposit", deposit)
			}

			req.lib.messenger.publish("alert", JSON.stringify({
				userGUID: deposit.userGUID,
				message: `Deposit received for ${req.lib.helper.fromSatoshi(results.userDeposit.netAmountSatoshi).toFixed(8)} ${results.userDeposit.currency} `
			}), (err, pub) => {
				console.log("PUB", pub);
				res.json({ "processed": true })
			})

			req.lib.messenger.publish("alert", JSON.stringify({
				userGUID: deposit.userGUID,
				message: `CHR Purchase of ${req.lib.helper.fromSatoshi(results.chrDeposit.netAmountSatoshi).toFixed(8)} CHR is complete. `
			}), (err, pub) => {})

			if (!!results.refUser.userGUID) {
				req.lib.messenger.publish("alert", JSON.stringify({
					userGUID: results.refUser.userGUID,
					message: `Referral Bonus received for ${req.lib.helper.fromSatoshi(results.refDeposit.netAmountSatoshi).toFixed(8)} ${results.refDeposit.currency} `
				}), (err, pub) => {})
			}

		})
	}
}