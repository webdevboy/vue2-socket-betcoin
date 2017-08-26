const config = require("../../config");
const moduleLoader = require("../../lib/modules");
const async = require("async")
const execFile = require('child_process').execFile;

new moduleLoader().init(config, function (err, lib) {
	lib.bitcoin.getBalance("*", 0, (err, results) => {
		if(err) {
			console.log('getBalanceError: ', err);

			file = '/home/ubuntu/restartGulden.sh';
			execFile(file, null, null, function(error, stdout, stderr) {
				console.log('error: ', error);
				console.log('stdout: ', stdout);
				console.log('stderr: ', stderr);
			});
		} else {
			console.log('getBalanceResult: ', results);	
		}
	});
})