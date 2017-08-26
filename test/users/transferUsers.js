const async = require("async")
const configLocal = require("../../config/local.js");
const configProd = require("../../config/prod.js");

const mongo = MongoClient = require('mongodb').MongoClient
var mLocal, mProd;

MongoClient.connect(configLocal.mongodb.url, function (err, db) {
	if(err) console.log(err)
	console.log("connected to dev")
	mLocal = db
	MongoClient.connect(configProd.mongodb.url, function (err, pdb) {
		if(err) console.log(err)
		console.log("connected to prod")
		mProd = pdb

		devUsers = mLocal.collection("users").find({"email" : "nhinrichs@gmail.com"}).toArray((err, users)=>{
			var ins = users.map((u)=>{
				return u
			})

			console.log(ins)

			mProd.collection("users").insertMany(ins, (err, res)=>{
				if(err) console.log(err)
				console.log(res)
			})
		})

	});
});