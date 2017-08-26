
<template>
	<div id="dashboard-home" >
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">Dashboard</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Dashboard</li>
				</ol>
			</div>
		</div>
		
		<div class="row col-md-12" v-if="state!=3">
			<div class="alert alert-success col-md-12">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
				<h3 class="text-success"><i class="fa fa-check-circle"></i> Your account has been created successfully, here are your login details:</h3>
				<div class="message-contents">
					<div class="card-block">
						<div class="row">
							<div class="col-md-6 col-xs-6">
								<strong>Email Address:</strong>
								</br>
								<p class="text-muted">{{ this.email }}</p>
							</div>
							<div class="col-md-6 col-xs-6" v-if="state==1">
								<strong>Password:</strong>
								</br>
								<p class="text-muted" style="width:100%;overflow:hidden;">{{ this.currentPassword }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4 col-xs-4">
								<strong>NLG Deposit Address:</strong>
								</br>
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
								<p class="text-muted" v-if="!isCreatingDeposits">
									{{ nlgDepositAddress }}
								</p>
							</div>
							<div class="col-md-4 col-xs-4">
								<strong>BTC Deposit Address:</strong>
								</br>
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
								<p class="text-muted" v-if="!isCreatingDeposits">{{ btcDepositAddress }}</p>
							</div>
							<div class="col-md-4 col-xs-4">
								<strong>ETH Deposit Address:</strong>
								</br>
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
								<p class="text-muted" v-if="!isCreatingDeposits">{{ ethDepositAddress }}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6 text-center">
								<router-link to="/dashboard/profile" replace>
									<button class="btn btn-rounded btn-info">Click Here to set NLG receiving address.</button>
								</router-link>
							</div>
							<div class="col-md-6 text-center">
								<router-link to="/dashboard/buy" replace>
									<button class="btn btn-rounded btn-info">Click Here to buy </button>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row estimated-earning">
			<div class="col-md-12 card-group">
				<!-- Column -->
				<div class="card">
					<div class="card-block">
						<div class="d-flex flex-row">
							<div class="round align-self-center round-info"><i class="mdi mdi-currency-ngn"></i></div>
							<div class="m-l-10 align-self-center">
								<h4 class="m-b-0 font-light">{{this.convertToCurrency(this.nlgDailyEarning, 'NLG')}}</h4>
								<h5 class="text-muted m-b-0">Estimated Daily Earning</h5></div>
						</div>
					</div>
				</div>
				<!-- Column -->
				<!-- Column -->
				<div class="card">
					<div class="card-block">
						<div class="d-flex flex-row">
							<div class="round align-self-center round-success"><i class="mdi mdi-bullseye"></i></div>
							<div class="m-l-10 align-self-center">
								<h4 class="m-b-0 font-lgiht" v-if="!isCalcEarning()">{{chrBalance}}</h4>
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
								<h5 class="text-muted m-b-0">CHR Balance</h5></div>
						</div>
					</div>
				</div>
				<!-- Column -->
				<!-- Column -->
				<div class="card">
					<div class="card-block">
						<div class="d-flex flex-row">
							<div class="round align-self-center round-danger"><i class="mdi mdi-currency-usd"></i></div>
							<div class="m-l-10 align-self-center">
								<h4 class="m-b-0 font-lgiht">{{this.convertToCurrencyWithFormat(this.usdDailyEarning, 'USD', 2)}}</h4>
								<h5 class="text-muted m-b-0">Estimated Daily Earning</h5></div>
						</div>
					</div>
				</div>
				<!-- Column -->
				<!-- Column -->
				<div class="card">
					<div class="card-block">
						<div class="d-flex flex-row">
							<div class="round align-self-center round-primary"><i class="mdi mdi-currency-btc"></i></div>
							<div class="m-l-10 align-self-center">
								<h4 class="m-b-0 font-lgiht">{{this.convertToCurrency(this.btcDailyEarning, 'BTC')}}</h4>
								<h5 class="text-muted m-b-0">Estimated Daily Earning</h5></div>
						</div>
					</div>
				</div>
				<!-- Column -->
			</div>
		</div>

		<div class="row">
			<div class="col-md-5">
				<div class="card today-earning">
					<div class="card-block">
						<h3 class="card-title">Today Earnings</h3>
						<h6 class="card-subtitle">Different Today Earnings</h6>
						<div class="row justify-content-center">
							<div class="col-md-8">
								<div id="graph-donut" style="height:250px;"></div>
							</div>
						</div>
					
						<div class=" text-center m-t-20">
							<ul class="list-inline m-b-0">
								<li>
									<h5 class="label label-light-info"><i class="fa fa-circle font-15 m-r-10"></i>NLG</h5> </li>
								<li>
									<h5 class="label label-light-success"><i class="fa fa-circle font-15 m-r-10"></i>CHR</h5> </li>
								<li>
									<h5 class="label label-light-danger"><i class="fa fa-circle font-15 m-r-10"></i>USD</h5> </li>
							</ul>
						</div>
					</div>
				</div>
				
				<div class="card">
					<div class="card-block p-b-20">
						<h3 class="card-title">Buy Now</h3>
						<h6 class="card-subtitle">CHR To Buy</h6>
						<div class="row">
							<div class="input-group">
								<span class="input-group-addon">CHR</span>
								<input type="number" v-model="chrAmount" min="1" max="50000" class="form-control">
								<span class="input-group-addon" style="width: 55%;"><input type="range" value="1" min="1" max="50000" v-model="chrAmount"></span>
							</div>
							<div class="m-t-10 m-b-10">
								( = {{ chrAmount }} NLG
								= {{ (chrAmount * nlgToBtc).toFixed(8) }} BTC
								= {{ (chrAmount * nlgToEth).toFixed(8) }} ETH )
							</div>
						</div>
						<h6 class="card-subtitle m-t-0">Estimated Daily Earning</h6>
						<div class="row justify-content-center">
							<div>
								<h6>{{this.convertToCurrency(this.nlgDailyEarning, 'NLG')}}</h6>
								<h6>{{this.convertToCurrency(this.usdDailyEarning, 'USD')}}</h6>
								<h6>{{this.convertToCurrency(this.btcDailyEarning, 'BTC')}}</h6>
							</div>
						</div>
						<h6 class="card-subtitle m-t-0">Coinbase referral link</h6>
						<div class="row justify-content-center">
							<a href="https://www.coinbase.com/join/58fa1c51ba244e604c148efa" target="_blank">
								<button class="btn btn-rounded btn-success">
									<i class="ti-link"></i> Coinbase referral link
								</button>
							</a>
						</div>	
					</div>
					<div>
						<hr class="m-t-0 m-b-0">
					</div>
					<div class="card-block text-center p-t-10 p-b-10">
						<button class="btn btn-lg btn-primary" data-toggle="modal" href="#dlg-buy-now" data-title="" data-url=""> 
							<i class="fa fa-shopping-cart" aria-hidden="true"></i>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div class="col-md-7">
				<div class="card">					
					<div class="card-block p-b-0">
						<h3 class="card-title">Real-time stats</h3>
						<div class="ribbon-wrapper">
							<div class="ribbon ribbon-bookmark ribbon-info">User Earnings</div>
							<div class="row real-time-card p-t-30">
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">Today Earnings</h4>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{todayNLGEarnings}}</h5>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{todayCHREarnings}}</h5>
										<h5 v-if="!isCalcEarning()">{{todayUSDEarnings}}</h5>
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
									</div>
								</div>
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">This Month Earnings</h4>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{monthNLGEarnings}}</h5>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{monthCHREarnings}}</h5>
										<h5 v-if="!isCalcEarning()">{{monthUSDEarnings}}</h5>
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
									</div>
								</div>
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">This Year Earnings</h4>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{yearNLGEarnings}}</h5>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{yearCHREarnings}}</h5>
										<h5 v-if="!isCalcEarning()">{{yearUSDEarnings}}</h5>
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
									</div>
								</div>
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">All Time Earnings</h4>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{totalNLGEarnings}}</h5>
										<h5 class="p-b-10" v-if="!isCalcEarning()">{{totalCHREarnings}}</h5>
										<h5 v-if="!isCalcEarning()">{{totalUSDEarnings}}</h5>
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-block p-t-10">
						<div class="ribbon-wrapper">
							<div class="ribbon ribbon-bookmark ribbon-info">System Earnings</div>
							<div class="row real-time-card p-t-30">
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">Today System Earning</h4>
										<h5 class="p-b-10">{{this.convertToCurrency(this.todaySystemEarning, 'NLG')}}</h5>
										<h5>{{this.convertToCurrency(this.todaySystemEarning * this.nlgToUsd, 'USD')}}</h5>
									</div>
								</div>
								<div class="col-md-6 m-b-10">
									<div class="card-block">
										<h4 class="card-subtitle text-center">Month System Earning</h4>
										<h5 class="p-b-10">{{this.convertToCurrency(this.monthSystemEarning, 'NLG')}}</h5>
										<h5>{{this.convertToCurrency(this.monthSystemEarning * this.nlgToUsd, 'USD')}}</h5>
									</div>
								</div>
								<div class="col-md-6">
									<div class="card-block">
										<h4 class="card-subtitle text-center">Year System Earning</h4>
										<h5 class="p-b-10">{{this.convertToCurrency(this.yearSystemEarning, 'NLG')}}</h5>
										<h5>{{this.convertToCurrency(this.yearSystemEarning * this.nlgToUsd, 'USD')}}</h5>
									</div>
								</div>
								<div class="col-md-6">
									<div class="card-block">
										<h4 class="card-subtitle text-center">All Time System Earning</h4>
										<h5 class="p-b-10">{{this.convertToCurrency(this.wholeSystemEarning, 'NLG')}}</h5>
										<h5 >{{this.convertToCurrency(this.wholeSystemEarning * this.nlgToUsd, 'USD')}}</h5>
									</div>
								</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		<!-- Row -->

		<!-- MODAL BUY NOW -->
		<div class="modal fade" id="dlg-buy-now" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="exampleModalLabel1">To purchase {{chrAmount}} CHR</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<p>
	                    	1. Send <span style="color: red">{{ chrAmount }} NLG</span> to 
	                    	<span style="color: red">{{nlgDepositAddress}}</span> or
	                    </p>
	                    <p>
	                    	2. Send <span style="color: red">{{ (chrAmount * nlgToBtc).toFixed(8) }} BTC</span> to 
	                    	<span style="color: red">{{btcDepositAddress}}</span> or
	                    </p>
	                    <p>
	                    	3. Send <span style="color: red">{{ (chrAmount * nlgToEth).toFixed(8) }} ETH</span> to 
	                    	<span style="color: red">{{ethDepositAddress}}</span>
	                    </p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info waves-effect" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	    <!-- end MODAL BUY NOW -->
	</div>	
</template>

<script>

import Raphael from 'raphael/raphael'
global.Raphael = Raphael

export default {
	name: 'dashboard-home',
	data: function() {
		return {
			//User info
			state: localStorage.getItem('state'),
			userGUID: localStorage.getItem('userGUID'),
			email: localStorage.getItem('email'),
			currentPassword: localStorage.getItem('password'),
			btcDepositAddress: localStorage.getItem('btcDepositAddress'),
			ethDepositAddress: localStorage.getItem('ethDepositAddress'),
			nlgDepositAddress: localStorage.getItem('nlgDepositAddress'),
			//Donut Chart Data
			morrisChart: null,
			nlgLabel: 'NLG -',
			chrLabel: 'CHR -',
			usdLabel: 'USD -',
			//Buy Now
			chrAmount: 1.0,

			// Exchange rate
			nlgToBtc: 0.00004578,
			nlgToEth: 0.00048587,
			nlgToUsd: 0.12107649,

			//NLG and CHR infos at top right of page
			todayNLGEarnings: 0,
			monthNLGEarnings: 0,
			yearNLGEarnings: 0,
			totalNLGEarnings: 0,

			todayCHREarnings: 0,
			monthCHREarnings: 0,
			yearCHREarnings: 0,
			totalCHREarnings: 0,

			todayUSDEarnings: 0,
			monthUSDEarnings: 0,
			yearUSDEarnings: 0,
			totalUSDEarnings: 0,
			
			chrBalance: 0,
			chrBalanceValue: 0,
			nlgBalanceValue: 0,

			calcEarningsState: 0,
			isCalcBalance: false,
			//Real time data
			btcProfitability: 0,
			usdProfitability: 0,
			totalHashPower: 0,
			todaySystemEarning: 0,
			monthSystemEarning: 0,
			yearSystemEarning: 0,
			wholeSystemEarning: 0,
			nlgDailyEarning: 0,
			usdDailyEarning: 0,
			btcDailyEarning: 0,
			//latestSystemEarnings: [],

			//Other states
			showPassword: false,
			isCreatingDeposits: false,
		}
	},
	created: function() {
		var self = this
		//Load reports data
		this.getTodayEarnings()
		this.getThisMonthEarnings()
		this.getThisYearEarnings()
		this.getAllTimeEarnings()
		this.getAllDepositBalances()
		//Load Real-time stats
		this.getTotalHashPower()
		//Load system earnings data
		this.getSystemEarnings()
		//Get Exchange rates

		$.get('https://api.cryptonator.com/api/ticker/nlg-btc', function(data) {
			self.nlgToBtc = data.ticker.price
		})
		$.get('https://api.cryptonator.com/api/ticker/nlg-eth', function(data) {
			self.nlgToEth = data.ticker.price
		})
		$.get('https://api.cryptonator.com/api/ticker/nlg-usd', function(data) {
			self.nlgToUsd = data.ticker.price
		})

		this.showPassword = (this.state == 1)
		
		if(this.state == 1 || this.state == 2) {
			if(!this.btcDepositAddress)
				this.createDeposits()
		}
	},
	mounted: function() {
		this.morrisChart = Morris.Donut({
			element: 'graph-donut',
			data: [
				{value: 1, label: 'NLG', formatter: '-' },
		        {value: 1, label: 'CHR', formatter: '-' },
		        {value: 1, label: 'USD', formatter: '-' }
			],
			backgroundColor: false,
			labelColor: '#444',
			resize: true,
			colors:['#009efb', '#26c6da', '#fc4b6c'],
			formatter: function (x, data) { return data.formatter; }
		});

	},
	methods: {
		isCalcEarning() {
			return this.calcEarningsState != 4
		},
		calculateUserEstimatedEarning() {
			var systemTodayEarning = this.todaySystemEarning
			var currentHour = new Date().getUTCHours()
			if(currentHour < 1)
				currentHour = 1
			var userTotalCHRAmount = this.nlgBalanceValue
			var systemTotalCHRAmount = this.wholeSystemEarning
			var userEstimatedEarning = 0
			userEstimatedEarning = systemTodayEarning / currentHour * 24 * userTotalCHRAmount / systemTotalCHRAmount
			this.nlgDailyEarning = userEstimatedEarning
			this.usdDailyEarning = userEstimatedEarning * this.nlgToUsd
			this.btcDailyEarning = userEstimatedEarning * this.nlgToBtc
			return userEstimatedEarning
		},
		createDeposits: function() {
			this.isCreatingDeposits = true
		},
		getTodayEarnings: function() {
			this.$socket.emit("earning/getTodayEarnings", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
		getThisMonthEarnings: function() {
			this.$socket.emit("earning/getThisMonthEarnings", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
		getThisYearEarnings: function() {
			this.$socket.emit("earning/getThisYearEarnings", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
		getAllTimeEarnings: function() {
			this.$socket.emit("earning/getAllTimeEarnings", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
		getAllDepositBalances: function() {
			this.isCalcBalance = true
			this.$socket.emit("deposit/getAllDepositBalances", { 
				method: "post", 
				userGUID: this.userGUID 
			})
		},
		getTotalHashPower: function() {
			this.$socket.emit("users/getTotalHashPower", {
				method: "post"
			})
		},
		getSystemEarnings: function() {
			this.$socket.emit("earning/updateSystemEarnings", {
				method: "post"
			})
		}
	},
	sockets: {
		"users/createDeposits": function(val) {
			this.btcDepositAddress = localStorage.getItem('btcDepositAddress')
			this.ethDepositAddress = localStorage.getItem('ethDepositAddress')
			this.nlgDepositAddress = localStorage.getItem('nlgDepositAddress')
			this.isCreatingDeposits = false
		},
		"earning/getTodayEarnings": function(val) {
			console.log(val)
			val = val.body.data
			this.todayNLGEarnings = this.convertToCurrency(val.nlgEarning, 'NLG')
			this.todayCHREarnings = this.convertToCurrency(val.chrEarning, 'CHR')
			this.todayUSDEarnings = this.convertToCurrency((val.nlgEarning + val.chrEarning) * this.nlgToUsd, 'USD')

			var nlgEarning = val.nlgEarning
			var chrEarning = val.chrEarning
			var usdEarning = (val.nlgEarning + val.chrEarning) * this.nlgToUsd
			this.nlgLabel = 'NLG ' + this.convertToCurrency(nlgEarning, '')
			this.chrLabel = 'CHR ' + this.convertToCurrency(chrEarning, '')
			this.usdLabel = 'USD ' + this.convertToCurrencyWithFormat(usdEarning, '', 2) 
			var nlgAmount = nlgEarning
			var chrAmount = chrEarning
			var usdAmount = usdEarning
			if((nlgEarning + chrEarning + usdEarning) == 0) {
				nlgAmount = 1
				chrAmount = 1
				usdAmount = 1
			}
			nlgEarning = this.convertToCurrency(nlgEarning, '')
			chrEarning = this.convertToCurrency(chrEarning, '')
			usdEarning = this.convertToCurrencyWithFormat(usdEarning, '', 2)
			this.morrisChart.setData([
				{value: nlgAmount, label: 'NLG', formatter: nlgEarning}, 
				{value: chrAmount, label: 'CHR', formatter: chrEarning}, 
				{value: usdAmount, label: 'USD', formatter: usdEarning}, 
			])

			this.calcEarningsState ++
		},
		"earning/getThisMonthEarnings": function(val) {
			val = val.body.data
			this.monthNLGEarnings = this.convertToCurrency(val.nlgEarning, 'NLG')
			this.monthCHREarnings = this.convertToCurrency(val.chrEarning, 'CHR')
			this.monthUSDEarnings = this.convertToCurrency((val.nlgEarning + val.chrEarning) * this.nlgToUsd, 'USD')
			this.calcEarningsState ++
		},
		"earning/getThisYearEarnings": function(val) {
			val = val.body.data
			this.yearNLGEarnings = this.convertToCurrency(val.nlgEarning, 'NLG')
			this.yearCHREarnings = this.convertToCurrency(val.chrEarning, 'CHR')
			this.yearUSDEarnings = this.convertToCurrency((val.nlgEarning + val.chrEarning) * this.nlgToUsd, 'USD')
			this.calcEarningsState ++
		},
		"earning/getAllTimeEarnings": function(val) {
			val = val.body.data
			this.totalNLGEarnings = this.convertToCurrency(val.nlgEarning, 'NLG')
			this.totalCHREarnings = this.convertToCurrency(val.chrEarning, 'CHR')
			this.totalUSDEarnings = this.convertToCurrency((val.nlgEarning + val.chrEarning) * this.nlgToUsd, 'USD')
			this.calcEarningsState ++
		},
		"deposit/getAllDepositBalances": function(val) {
			var balances = val.body.data
			this.chrBalance = balances['CHR'] ? balances['CHR'] : 0
			this.nlgBalanceValue = balances['NLG'] ? balances['NLG'] : 0
			this.chrBalanceValue = this.chrBalance
			this.chrBalance = this.convertToCurrency(this.chrBalance, 'CHR')
			this.isCalcBalance = false
			this.calculateUserEstimatedEarning()
		},
		"users/getTotalHashPower": function(val) {
			this.totalHashPower = val.body.data.toFixed(4);
		},
		"deposit": function(val) {
			this.getAllDepositBalances()
		},
		"distribution": function(val) {
			this.calcEarningsState = 0
			//Load reports data
			this.getTodayEarnings()
			this.getThisMonthEarnings()
			this.getThisYearEarnings()
			this.getAllTimeEarnings()
		},
		"total_hash_power": function(val) {
			this.totalHashPower = val.totalHashPower
		},
		"profitability": function(val) {
			this.btcProfitability = val.btc * this.totalHashPower
			this.usdProfitability = val.usd * this.totalHashPower
			this.btcProfitability = this.btcProfitability.toFixed(8)
			this.usdProfitability = this.usdProfitability.toFixed(2)
		},
		"earningsUpdate": function(val) {
			var earnings = JSON.parse(val.earnings)
			console.log(earnings);
			var message = earnings.message
			earnings = earnings.earnings
			this.todaySystemEarning = earnings[0]
			this.monthSystemEarning = earnings[1]
			this.yearSystemEarning = earnings[2]
			this.wholeSystemEarning = earnings[3]
			// this.latestSystemEarnings = earnings[4]
			// for(var i = 0;i < this.latestSystemEarnings.length;i ++) {
			// 	var item = this.latestSystemEarnings[i]
			// 	item.created = this.dateToString(item.created)
			// 	item.amount = this.convertToCurrency(item.amountSatoshi, item.currency)
			// }
			if(message) {
				toastr.options = {
				  "closeButton": true,
				  "debug": false,
				  "newestOnTop": true,
				  "progressBar": true,
				  "positionClass": "toast-top-right",
				  "preventDuplicates": false,
				  "onclick": null,
				  "showDuration": "300",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "1000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
				}
				toastr.success(`System Earnings Received! <br />${message.amount} NLG`)
			}
			this.calculateUserEstimatedEarning()
		}
	},
	watch: {
		'chrAmount': function() {
			if(this.chrAmount < 1)
				this.chrAmount = 1
			if(this.chrAmount > 50000)
				this.chrAmount = 50000
			this.calculateUserEstimatedEarning()
		}
	}
} 
</script>

<style scoped>
	#dashboard-home .row { margin:0px; }
	.close{ color: black; }

	.modal-content form { padding: 0; }
	.modal-content .modal-header{
		border-bottom: 1px solid #eceeef;
	}
	.modal-content .modal-body{
		border-bottom: 1px solid #eceeef;
	}

	@media only screen and (max-width: 500px) {
		.page-wrapper { padding-top: 60px; }
	}

	.estimated-earning .card-block { padding: 1.5rem 0.8rem; }
	.real-time-card .card-block { padding: 1rem; }

</style>
