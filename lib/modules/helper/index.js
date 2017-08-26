const crypto = require("crypto")
module.exports = function (config) {
	var self = this;
	self.config = config;

	self.init = (allDone) => {
		self.db = self.lib.data_mongodb
		self.models = self.lib.data_models.models
		self.cache = self.lib.data_redis

		allDone()
	}
	self.encryptPassword = (password) => {
		var cipher = crypto.createCipher("aes-256-ctr", self.config.security.cryptoPassword)
		var crypted = cipher.update(password, 'utf8', 'hex')
		crypted += cipher.final('hex')
		var hashed = crypto.createHash("sha256").update(crypted).digest("hex")

		return hashed
	}

	self.toSatoshi = (val) => {
		return val * 100000000
	}

	self.fromSatoshi = (val) => {
		return val / 100000000
	}
}