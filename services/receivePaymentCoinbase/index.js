const async = require("async");
const express = require("express");
const app = express();
const config = require("../../config");
const fs = require("fs");
const uuid = require("node-uuid")
const moduleLoader = require("../../lib/modules");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const routers = require("../../lib/middleware/router")();
const http = require('http').Server(app);

new moduleLoader().init(config,function(err, lib){
	app.use(function(req,res,next){
        req.lib = lib;
        next();
    })
    app.use(bodyParser.json());
	app.locals.config = config;
	app.use(function (err, req, res, next) {
		console.log(err)
		console.error(err.stack);
		res.status(503).send("Service Temporarily Unavailable")
	});

	app.config = config;
	app.config.useSecurity = false;

    app.get('/sysmon', function(req, res){
		res.send('OK '+ new Date());
	});
    app.post(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, routers.route);

    routers.init(app, (err, res) => {
		if (err) {
			console.log("Error Loading Routers.")
			console.log(err);
			process.exit();
		} else {
			http.listen(8020, function(){
				console.log('listening on *:',8020);
			});
		}
    })    
})

