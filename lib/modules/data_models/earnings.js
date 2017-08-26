const mongoose = require("mongoose").set('debug', true);
const Schema = mongoose.Schema
const uuid = require("node-uuid")

module.exports = function (config, lib) {
	var self = this
	self.config = config
	self.lib = lib
	
	/*
	Each miner is 250 mhash and electricity is $49 /month 
	Each earnings distribution is charged 5% management fee and $0.00632 / mhash / day 
		to calculate electricity costs we need to first sum up how much they've paid for that day and only charge more if they are below the $0.00632 / mhash / day threshold
		once they've paid their share for the day their electricity costs go to 0 for the rest of the day

		if 1 CHRSM is $6.4 and electricity is $0.00632 / 6.4 per CHRSM
		if they have 1 CHRSM = $0.00632 / day
		0.00632/6.4 = .0009875 CHRSM for electricity
	*/

	//earnings is whenever CHRSM gets a deposit from a mining pool
	self.earnings = mongoose.Schema({
		currency: String,
		amountSatoshi: Number,
		meta: Schema.Types.Mixed,
		transactionID: { type: String, unique: true, required: true },
		created: { type: Date, default: Date.now },
		lastUpdated: { type: Date, default: Date.now },
		processed : Date,
		payoutTxID : String
	})

	//earningsDistribution is when we distribute earnings to users based on their mhash.  1 CHRSM == 1 mhash 
	self.earningsDistribution = mongoose.Schema({
		earningsDistributionID : { type: String, unique: true, default: uuid.v4() },
		dupeCheckKey : {type : String, unique : true },
		earningsID : Schema.Types.ObjectId,
		userID : Schema.Types.ObjectId,
		type : String,
		currency : String,
		walletAddress : String,
		amountSatoshi: Number,
		managementFeeSatoshi : Number,
		electricityFeeSatoshi : Number,
		transactionID : String,
		meta: Schema.Types.Mixed,
		created: { type: Date, default: Date.now },
		lastUpdated: { type: Date, default: Date.now },
		status : {type : String, default : "pending"}

	})

	self.earningsDistribution.pre("save", function(next){
		this.amountSatoshi = this.amountSatoshi.toFixed(8)
		this.managementFeeSatoshi = this.managementFeeSatoshi.toFixed(8)
		this.electricityFeeSatoshi = this.electricityFeeSatoshi.toFixed(8)
		this.dupeCheckKey = this.earningsID + "_" + this.userID + "_" + this.currency
		this.currency = this.currency.toString().toUpperCase()
		next()
	})
	self.earnings.pre("save", function(next){
		this.currency = this.currency.toString().toUpperCase()
		next()
	})

	self.earnings = mongoose.model("earnings", self.earnings)
	self.earningsDistribution = mongoose.model("earningsDistribution", self.earningsDistribution)
}