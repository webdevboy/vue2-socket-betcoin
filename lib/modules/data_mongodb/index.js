const mongoose = require("mongoose")
module.exports = function(config){
	var self = this
	self.config = config

	self.init = function(allDone){
		mongoose.connect(self.config.mongodb.url)
		self.db = mongoose.connection
		self.db.on('error', console.error.bind(console, 'connection error:'));
		self.db.once('open', function() {
			allDone()
		});	
	}

}