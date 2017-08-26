const fs = require("fs")
const path = __dirname;
module.exports = function(config){
	var self = this;
	self.config = config;
	self.models = {}
	
	self.init = (allDone)=>{
		var models = fs.readdirSync(path).filter((file)=>{
			return file != ".DS_Store" && file != "index.js"
		});

		models.forEach(function(model){
			model = model.split(".")[0]
			var tmp = require("./"+model)
			self.models[model] = new tmp(self.config, self.lib)
		})

		allDone()
	}
}