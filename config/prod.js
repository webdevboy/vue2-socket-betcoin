var config = {
	system: {
		totalMhash: 100000,
		//electricityCostPerMhashPerDay: 0.0009875, // CHRSM
		electricityCostPerMhashPerDay: 0.000009875,
		minerDepositAddress: "GaGuSia69k8ncv9QXWg9Di3LaKyf7rTaJo",
		developmentDepositAccount: "GTqYN9Jy8S44WCWfVpYsmaiFutaRtctmXB",
		investmentDepositAccount: "GP2p3maU38j1Q6oVfwyUnn9Usr4PhP4y3y",
		userDepositAccount : "GYxpAimjPnuWRqFKRXPhedKuwR2EEBfau1",
		miningInvestmentDepositAccount : "GP2p3maU38j1Q6oVfwyUnn9Usr4PhP4y3y",
		ethInvestmentDepositAccount : "GLDWwC3Vi7LzfJnNfhnWiF8BRJTQm6VP9c",
		coinExchangeInvestmentDepositAccount : "GPXGhJAyx4y8ih3iHgn3ke8saH8sXydwvr",
		nlgInvestmentDepositAccount : "GRvG5z1XYRbTEgTRdmijViy59rQn3X15T3",
		charityDepositAccount : "GfXEMKqwXxBcmM9BRk65ENutiNiUB426JM",

		workQueue: {
			earnings: "chratos:scryptMining:earningsReceived",
			userDeposit: "chratos:scryptMining:userDepositReceived",
			minerEarnings : "chratos:scryptMining:earningsReceived",
			guldenTransactions : "chratos:scryptMining:guldenTransactions"
		},
		nlgSendFromAccount: "77a5f778-59d6-4804-8129-a7e8fa92688a"
	},
	aws: {
		accessKeyId: "AKIAINPRBV622PVHUN6A",
		secretAccessKey: "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"
	},
	redis: {
		url: "chratos.j9dnvk.0001.usw2.cache.amazonaws.com",
		//url: "localhost",
		port: 6379
	},
	messenger: {
		url: "chratos.j9dnvk.0001.usw2.cache.amazonaws.com",
		//url: "localhost",
		port: 6379,
		events: ["message", "alert", "minerEarnings", "earnings", "deposit", "distribution", "bonus", "profitability", "total_hash_power", "earningsUpdate"]
	},
	http: {
		baseUrl: "https://chratos.io",
		port: 8010
	},
	mongodb: {
		url : "mongodb://chratos_master:UocoTZbmJChO7KI7jDIck6hXD@ds127711-a0.mlab.com:27711,ds127711-a1.mlab.com:27711/chratos-prod?replicaSet=rs-ds127711"
		//url: "mongodb://chratos_master:eexd=rQAB(9Cb9c7Ln79@ds135800.mlab.com:35800/chratos"
	},
	security: {
		cryptoPassword: "tenlittleMonkeysJumpingOnTheBed.MommaCalledTheDoctorAndthedocTorSaid..."
	},
	coinbase: {
		apiKey: "UcvTokBrUSLaYITi",
		apiSecret: "h7EqVOSMgpSwyAS4jrL14uN3hBBdInNy",
		btcWalletID: "e23b9be2-4879-56a0-83ae-3faed6a0ec18",
		ethWalletID: "873b2666-067a-5dad-8d46-894d8167cb35"
		// apiKey: "lxK5culwpR27z0Zw",
		// apiSecret: "anqO2nnQJyplXHWFsTiv6XxQ8UACbJh6",
		// btcWalletID: "509ef4bf-6f74-5659-af75-c40fea90eac8",
		// ethWalletID : "a058bc40-eba9-5801-8d24-5196c7af4764"
	},
	bittrex: {
		apikey: "4e865473e661443c9a7a15a63ec82fd2",
		apisecret: "764254c021ce46dc806a1dfc078e5a1e",
		stream: false,
		verbose: true,
		cleartext: false
	},
	bitcoin: {
		host: '172.31.5.60',
		port: 9332,
		user: 'chratosnlg',
		pass: 'BhT6oncekFNoBhzoxz)nHHMv(WJCzQQ[viRPN;tQgXBdGTkMvXQnZxbnHytrrGKd',
		timeout: 30000
	},
	prohashing: {
		apiKey: "f8d8936654219e0a54f83b11f07c1756a8af8fea824e70589ff6681d95de40b5",
		debug: false,
		subscribe: ['miners', 'profitability', 'systemStatus', 'blocks', 'minerStatus']
	},
	slack: {
		team: 'chratos',
		token: 'xoxp-134251566167-175974089809-177348668838-501a37ff0d6a21bafa281d1fc8a2197c'
	},
}

if (process.env.bittrex_apikey) config.bittrex.apikey = process.env.bittrex_apikey
if (process.env.bittrex_apisecret) config.bittrex.apisecret = process.env.bittrex_apisecret
if (process.env.coinbase_apiKey) config.coinbase.apiKey = process.env.coinbase_apiKey
if (process.env.coinbase_apiSecret) config.coinbase.apiSecret = process.env.coinbase_apiSecret
if (process.env.coinbase_walletID) config.coinbase.walletID = process.env.coinbase_walletID

module.exports = config