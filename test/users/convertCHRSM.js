const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const uuid = require("node-uuid")
const async = require("async")

new moduleLoader().init(config, (err, lib) => {
	lib.deposit.getDepositSumsAllUsersGT0("CHRSM", (err, rows) => {
		console.log("USERS", rows);
		userBalances = rows

		async.each(rows, (row, next) => {
			async.waterfall([
				(wDone) => {
					//get the user
					lib.users.getByID(row._id, (err, user) => {
						if (!user) return wDone("nouser")
						user.balance = row.balance
						wDone(err, user)
					})
				},
				(user, wDone) => {

					var userGUID = user.userGUID
					var deposit = {
						recAddress: userGUID,
						userGUID: userGUID,
						currency: "CHRSM",
						amount: `-${lib.helper.fromSatoshi(user.balance)}`,
						transactionID: uuid.v4(),
						meta: { note: "Removing converted CHRSM so everyone's balance goes to 0" }
					}

					lib.deposit.create(deposit, (err, results) => {
						if (err) return console.log(err)
						console.log("RES", results)
						wDone()
					})
				}
			], next)
		})
	})
})