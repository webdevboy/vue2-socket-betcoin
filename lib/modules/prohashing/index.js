const prohashing = require("prohashing")
const events = require('events')
const util = require('util')

const mod = function (config) {
	var self = this;
	self.config = config;

	self.init = function (allDone) {
		self.dataCache = self.lib.data_redis
		self.connection = new prohashing(config.prohashing)
		self.hashValues = {}

		self.connection.on("minerStatus", (update) => {
			self.emit("minerStatus", update)
		})

		self.connection.on("profitability", (update) => {
			self.emit("profitability", update)
		})

		self.connection.on("connected", (details, session) => {
			self.emit("connected", details, session)
		})

		self.connection.on("block", (block) => {
			self.emit("block", block)
		})

		self.connection.on("systemStatus", (status) => {
			self.emit("systemStatus", status)
		})

		allDone()
	}
}
util.inherits(mod, events.EventEmitter)
module.exports = mod