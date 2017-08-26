
<template>
	<div id="dashboard-home" class="dashboard-home">

		<!-- DASHBOARD HOME HEADER section-->
		<div class="row bckffc-hero">
			<!-- INTRO section-->
			<div class="row intro-section">
				<div class="container">
					<h1>Dashboard</h1>
					<!-- <h3>Nullam et risus non leo venenatis scelerisque a viverra orci. <br/> Praesent a laoreet magna, vitae imperdiet ex.</h3> -->
				</div>
			</div>
			<!-- end INTRO section-->
		</div> 
		<!-- end DASHBOARD HOME HEADER section -->

		<div class="row padding-60-15">
			<div class="alert-container" v-if="state!=3">
				<!-- MESSAGE section-->
				<div class="alert alert-info alert-dismissable">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					<strong> Your account has been created successfully, here are your login details: </strong> <br/><br/>
					 <i class="fa fa-envelope" aria-hidden="true"></i> Email Address:  {{ this.email }}<br/>
					 <span v-if="state==1"><i class="fa fa-key" aria-hidden="true"></i> Password : {{ this.currentPassword }}<br/></span>

					NLG Deposit Address: <i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
					<span v-if="!isCreatingDeposits">{{ nlgDepositAddress }}</span>
					<br/>	
					BTC Deposit Address: <i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
					<span v-if="!isCreatingDeposits">{{ btcDepositAddress }}</span>
					<br/>	
					ETH Deposit Address: <i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
					<span v-if="!isCreatingDeposits">{{ ethDepositAddress }}</span>
					<br/>
					<br/>
					<router-link to="/dashboard/profile" replace>
						<h5>Click Here to set NLG receiving address.</h5>
	       			</router-link>
					<router-link to="/dashboard/buy" replace>
						<h5>Click Here to buy </h5>
	       			</router-link>
				</div>
				<!-- end MESSAGE section -->
			</div>

			<div class="col-xs-12 nopadding">
		        <div class="col-md-6">
					<div class="col-md-12 nopadding">
						<div class="card">
							<div class="card-header">
								<i class="fa fa-file-o"></i>
								Today Earnings
							</div>
							<div class="card-block panel deep-purple-box">
								<!--TODAY EARNINGS DONUT CHART section-->
		                        <div class="panel-body">
		                            <div class="row">
		                                <div class="col-md-7 col-sm-7 col-xs-7">
		                                	<div id="graph-donut" class="revenue-graph" style="height: 225px;"></div>
		                                </div>
		                                <div class="col-md-5 col-sm-5 col-xs-5">
		                                    <ul class="bar-legend">
		                                        <li><span class="NLG"></span> {{nlgLabel}} </li>
		                                        <li><span class="CHR"></span> {{chrLabel}} </li>
		                                        <li><span class="USD"></span> {{usdLabel}} </li>
		                                    </ul>
		                                </div>
		                            </div>
		                        </div>
			                    <!--end TODAY EARNINGS DONUT CHART-->
							</div>
						</div>
		        	</div>

					<div class="col-md-12 margin-top-30 nopadding">
						<div class="card">
							<div class="card-header">
								<i class="fa fa-shopping-cart" aria-hidden="true"></i>
								Buy Now
							</div>
							<div class="card-block">
								<h5 class="margin-bottom-20"> - CHR To Buy </h5>
								<div class="col-xs-12 margin-bottom-30">
									<input type="number" v-model="chrAmount" min="1" max="50000" style="width:85px;">
									<span style="display: inline; margin-left:5px;">CHR</span> <br />
									<br/>
									<input type="range" value="1" min="1" max="50000" v-model="chrAmount">
								</div>
								<hr class="full-width" />
								<h5 class="margin-bottom-20"> - Coinbase referral link </h5>
								<div class="col-xs-12" style="margin-bottom: 30px;">
									<a href="https://www.coinbase.com/join/58fa1c51ba244e604c148efa" target="_blank">
										https://www.coinbase.com/join/58fa1c51ba244e604c148efa
									</a>
								</div>			
								<hr class="full-width" />				
								<button class="btn btn-primary button-edit" data-toggle="modal" href="#dlg-buy-now" data-title="" data-url=""> 
									<i class="fa fa-shopping-cart detail-edit" aria-hidden="true"></i>
									Buy Now
								</button>
							</div>
						</div>
		        	</div>
		        </div>
		        <div class="col-md-6">
					<div class="col-md-12 nopadding">
						<div class="card">
							<div class="card-header">
								<i class="fa fa-file-o"></i>
								Real-time stats
							</div>
							<div class="card-block">
					        	
					        	<h5>Estimated Daily Earnings &amp; CHR Balance</h5>
				        		<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>Estimated Daily Earning</span>
					        				<h3>{{this.convertToCurrency(this.nlgDailyEarning, 'NLG')}}</h3>
					        				<h3>{{this.convertToCurrency(this.usdDailyEarning, 'USD')}}</h3>
					        				<h3>{{this.convertToCurrency(this.btcDailyEarning, 'BTC')}}</h3>
				        				</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>CHR Balance</span>
											<h3 v-if="!isCalcEarning()">{{chrBalance}}</h3>
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
				        				</div>
				        			</div>
				        			<!-- <div class="col-md-6">
				        				<div class="earnings-panel" v-if="latestSystemEarnings.length > 0">
				        					<p>- Latest 5 System Earnings:</p>
					        				<span class="font-light" v-for="item in latestSystemEarnings">
					        					{{item.created}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					        					{{item.amount}}
					        				</span>
					        				<br />
					        			</div>
				        			</div> -->
				        		</div>
					        	<hr class="full-width" />

								<h5>User Earnings</h5>
								<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>Today Earnings</span>
											<h3 v-if="!isCalcEarning()">{{todayNLGEarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{todayCHREarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{todayUSDEarnings}}</h3>
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
					        			</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>This Month Earnings</span>
											<h3 v-if="!isCalcEarning()">{{monthNLGEarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{monthCHREarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{monthUSDEarnings}}</h3>
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
					        			</div>
				        			</div>
				        		</div>
								<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>This Year Earnings</span>
											<h3 v-if="!isCalcEarning()">{{yearNLGEarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{yearCHREarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{yearUSDEarnings}}</h3>
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
					        			</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>All Time Earnings</span>
											<h3 v-if="!isCalcEarning()">{{totalNLGEarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{totalCHREarnings}}</h3>
											<h3 v-if="!isCalcEarning()">{{totalUSDEarnings}}</h3>
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isCalcEarning()"></i>
					        			</div>
				        			</div>
				        		</div>
					        	<hr class="full-width" />

							<!--<h5>Estimated Earnings</h5>
				        		<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>BTC Estimated Earnings</span>
					        				<h3>{{this.btcProfitability}}</h3>
					        			</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>USD Estimated Earnings</span>
					        				<h3>{{this.usdProfitability}}</h3>
					        			</div>
				        			</div>
				        		</div>
					        	<hr class="full-width" /> -->

					        	<h5>System Earnings</h5>
				        		<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>Today System Earning</span>
					        				<h3>{{this.convertToCurrency(this.todaySystemEarning, 'NLG')}}</h3>
					        				<h3>{{this.convertToCurrency(this.todaySystemEarning * this.nlgToUsd, 'USD')}}</h3>
					        			</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>Month System Earning</span>
					        				<h3>{{this.convertToCurrency(this.monthSystemEarning, 'NLG')}}</h3>
					        				<h3>{{this.convertToCurrency(this.monthSystemEarning * this.nlgToUsd, 'USD')}}</h3>
				        				</div>
				        			</div>
				        		</div>
				        		<div class="col-xs-12">
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>Year System Earning</span>
					        				<h3>{{this.convertToCurrency(this.yearSystemEarning, 'NLG')}}</h3>
					        				<h3>{{this.convertToCurrency(this.yearSystemEarning * this.nlgToUsd, 'USD')}}</h3>
				        				</div>
				        			</div>
				        			<div class="col-md-6">
				        				<div class="earnings-panel">
					        				<span>All Time System Earning</span>
					        				<h3>{{this.convertToCurrency(this.wholeSystemEarning, 'NLG')}}</h3>
					        				<h3>{{this.convertToCurrency(this.wholeSystemEarning * this.nlgToUsd, 'USD')}}</h3>
				        				</div>
				        			</div>
				        		</div>

							</div>
						</div>
			        </div>
		        </div>
		    </div>

		</div>

		<!-- MODAL BUY NOW -->
	    <div class="modal fade wbr-login" id="dlg-buy-now" tabindex="-1" role="basic" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <div class="modal-header text-left">
	                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
	                    <h4 class="modal-title">To purchase {{chrAmount}} CHR </h4>
	                    <p></p>

	                    <p>
	                    	1. Send <span style="color: yellow">{{ chrAmount }} NLG</span> to 
	                    	<span style="color: yellow">{{nlgDepositAddress}}</span> or
	                    </p>
	                    <p>
	                    	2. Send <span style="color: yellow">{{ (chrAmount * nlgToBtc).toFixed(8) }} BTC</span> to 
	                    	<span style="color: yellow">{{btcDepositAddress}}</span> or
	                    </p>
	                    <p>
	                    	3. Send <span style="color: yellow">{{ (chrAmount * nlgToEth).toFixed(8) }} ETH</span> to 
	                    	<span style="color: yellow">{{ethDepositAddress}}</span>
	                    </p>
	                    
	                    <hr/>

						<a class="open-Dialog btn btn-primary button-edit" data-dismiss="modal"> 
							Close
						</a>
	                </div>
	                <div class="modal-footer">
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
		        {value: 1, label: 'USD', formatter: '-' },
		    ],
		    backgroundColor: false,
		    labelColor: '#000',
		    colors: [
		        'rgb(255, 90, 90)','rgba(90,255,90,1)','rgba(90,90,255,1)'
		    ],
		    formatter: function (x, data) { return data.formatter; }
		})
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
	.nopadding { padding: 0px; }
	.padding-60-15 { margin: 0; padding: 60px 15px; background: #fff; }

	.page-body { margin-left: 0px; margin-right: 0px; padding-bottom: 30px; background-color: #FFF; }

	.earnings-panel { margin-left: 15px; margin-bottom: 15px; padding: 15px; background-color: #f0f2f7; border-radius: 5px; box-shadow: 1px 1px 1px #E0E0E0;  }
	.earnings-panel span { color: #49586e; font-size: 13px; font-weight: normal; text-transform: uppercase; }
	.earnings-panel h3 { color: #65cea7; font-family: 'Open Sans', sans-serif; font-size: 20px; font-weight: bold; line-height: 20px; margin: 0; }

	.panel.deep-purple-box { margin-bottom: 0px; background: #FFF; /*box-shadow: 0 5px 0 #424f63;*/ font-size: 15px; color: #000; }
	ul.bar-legend { list-style-type: none; margin-top: 75px; padding-left: 0px; }
	ul.bar-legend li { display: block; margin-bottom: 10px; }
	ul.bar-legend li span { float: left; margin-right: 10px; width: 20px; height: 20px; border-radius: 3px; -webkit-border-radius: 3px; }
	ul.bar-legend li span.NLG { background: rgba(255, 90, 90,1); }
	ul.bar-legend li span.CHR { background: rgba(90,255,90,1); }
	ul.bar-legend li span.USD { background: rgba(90,90,255,1); }
</style>
