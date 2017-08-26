const mongoose = require("mongoose").set('debug', false);
const Schema = mongoose.Schema
const uuid = require("node-uuid")

module.exports = function (config, lib) {
	var self = this
	self.config = config
	self.lib = lib
	self.models = self.lib.data_models.models
	
	// deposits can be ETH / BTC / NLG.  Everything is converted th CHR based on current exchange rates so that each CHR is $0.064 USD
	// deposits are converted to USD based on current exchange rates and a sum used when the user wants to buy CHR with it.  we can then exchange to NLG in batches
	// add a 5% surcharge for ETH and BTC deposits
	self.depositSchema = mongoose.Schema({
		userID : Schema.Types.ObjectId,
		currency: String,
		amountSatoshi: Number,
		netAmountSatoshi: Number,
		convertedAmount: Number,
		convertedCurrency: String,
		conversionFee : {type : Number, default : 0},
		convertedOn: { type: Date, default: Date.now },
		meta: Schema.Types.Mixed,
		transactionID: { type: String, unique: true, required: true },
		created: { type: Date, default: Date.now },
		lastUpdated: { type: Date, default: Date.now },
		type : String
	})

	self.userSchema = mongoose.Schema({
		userGUID: { type: String, unique: true, default: uuid.v4() },
		password: String,
		email: { type: String, unique: true },
		firstName: String,
		lastName: String,
		nickName: { type: String, unique: true, default: uuid.v4() },
		btcDepositAddress: String,
		ethDepositAddress: String,
		nlgDepositAddress: String,
		nlgWithdrawAddress : { type: String, default: '' },
		referrer: { type: String, index: true },
		active: {type : Boolean, default : true},
		lastLogin: Date,
		created: Date,
		lastUpdated: Date,
		isGoogleAccount: { type: Boolean, default: false },
		need2FA: {type: Boolean, default: false},
		secretKey: String,
		emailValidated: {type: Boolean, default: false}
	})

	self.depositSchema.pre("save", function(next){
		this.amountSatoshi = this.amountSatoshi.toFixed(8)
		this.currency = this.currency.toString().toUpperCase() 
		this.lastUpdated = new Date()
		//this.netAmountSatoshi = this.netAmountSatoshi.toFixed(8)
		next()
	})

	self.passwordResetSchema = mongoose.Schema({
		GUID: { type: String, unique: true, default: uuid.v4() },
		userGUID: { type: String, unique: true, default: uuid.v4() }
	})

	self.loginAsUserSchema = mongoose.Schema({
		GUID: { type: String, unique: true, default: uuid.v4() },
		userGUID: { type: String, unique: true, default: uuid.v4() }
	})

	self.user = mongoose.model("user", self.userSchema)
	self.deposit = mongoose.model("transaction", self.depositSchema)
	self.passwordReset = mongoose.model("passwordReset", self.passwordResetSchema)
	self.loginAsUser = mongoose.model("loginAsUser", self.loginAsUserSchema)
}