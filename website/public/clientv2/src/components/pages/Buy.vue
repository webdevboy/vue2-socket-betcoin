
<template>
	<!-- BUY NOW section -->
	<div id="buy">
		<!-- BUY NOW HEADER section-->
		<div class="row bckffc-hero">
			<!-- INTRO section-->
			<div class="row intro-section">
				<div class="container">
					<h1>Buy Now</h1>
					<!-- <h3>Nullam et risus non leo venenatis scelerisque a viverra orci. <br/> Praesent a laoreet magna, vitae imperdiet ex.</h3> -->
				</div>
			</div>
			<!-- end INTRO section-->
		</div> 
		<!-- end BUY NOW HEADER section -->

		<!-- BUY NOW BODY section-->
		<div class="row profile-section">
			<div class="container">

				<!-- LEFT section -->
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">
							<i class="fa fa-shopping-cart" aria-hidden="true"></i>
							Step 1: Buy Now
						</div>
						<div class="card-block">
							<h5 class="margin-bottom-20">- CHR to buy</h5>
							<div class="col-xs-12 margin-bottom-30">
								<input type="number" v-model="chrAmount" min="1" max="50000" style="width:85px;">
								<span style="display: inline; margin-left:5px;">CHR</span> <br />
								<div style="display: block; margin-top: 10px; margin-bottom: 10px;">
									( = {{ chrAmount }} NLG
									= {{ (chrAmount * nlgToBtc).toFixed(8) }} BTC
									= {{ (chrAmount * nlgToEth).toFixed(8) }} ETH )
								</div>
								<input type="range" value="1" min="1" max="50000" v-model="chrAmount">
							</div>
							<hr class="full-width" />

							<h5 class="margin-bottom-20">- Estimated Daily Earning</h5>
							<div class="col-xs-12 margin-bottom-30">
		        				<div class="earnings-panel">
			        				<span>Estimated Daily Earning</span>
									<h3>{{this.nlgDailyEarning}}</h3>
									<h3>{{this.usdDailyEarning}}</h3>
									<h3>{{this.btcDailyEarning}}</h3>
			        			</div>
							</div>
							<hr class="full-width" />

							<h5 class="margin-bottom-20">- Coinbase referral link</h5>
							<div class="col-xs-12 margin-bottom-30">
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
				<!-- end LEFT section -->

				<!-- RIGHT section -->
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">
							<i class="fa fa-drivers-license" aria-hidden="true"></i>
							Step 2: Deposit Bitcoin Addresses Here
						</div>
						<div class="card-block">
							<!-- BTC section -->
							<h5 class="margin-bottom-20">- Deposit BTC address</h5>
							<div class="col-xs-12 margin-bottom-30">
								<i class="fa fa-link blue-icon" aria-hidden="true"></i>
								<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
								<span v-if="!isCreatingAddresses">{{ btcDepositAddress }}</span>
							</div>
							<!-- end BTC section -->
							<!-- ETH section -->
							<h5 class="margin-bottom-20">- Deposit ETH address</h5>
							<div class="col-xs-12 margin-bottom-30">
								<i class="fa fa-link blue-icon" aria-hidden="true"></i>
								<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
								<span v-if="!isCreatingAddresses">{{ ethDepositAddress }}</span>
							</div>
							<!-- end ETH section -->
							<!-- GULDEN section -->
							<h5 class="margin-bottom-20">- Deposit Gulden address</h5>
							<div class="col-xs-12 margin-bottom-30">
								<i class="fa fa-link blue-icon" aria-hidden="true"></i>
								<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
								<span v-if="!isCreatingAddresses">{{ nlgDepositAddress }}</span>
							</div>
							<!-- end GULDEN section -->
						</div>
					</div>
				</div>
				<!-- end RIGHT section -->
			</div>
		</div>
		<!-- end BUY NOW BODY section-->

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
	<!-- end BUY NOW section -->
</template>

<script>
export default {
	name: 'buy',
	data: function() {
		return {
			//User Data
			userGUID: localStorage.getItem('userGUID'),
			btcDepositAddress: localStorage.getItem('btcDepositAddress'),
			ethDepositAddress: localStorage.getItem('ethDepositAddress'),
			nlgDepositAddress: localStorage.getItem('nlgDepositAddress'),
			//Currency Data
			chrAmount: 1.0,
			//Exchange Rates
			nlgToBtc: 0.00004578,
			nlgToEth: 0.00048587,
			nlgToUsd: 0.12107649,
			//CHR Balances
			todaySystemEarning: 0,
			wholeSystemEarning: 0,
			nlgDailyEarning: 'Calculating...',
			usdDailyEarning: '',
			btcDailyEarning: '',
			//States
			isCreatingAddresses: true,
		}
	},
	created: function() {
		var self = this
		this.isCreatingAddresses = (!this.btcDepositAddress)

		$.get('https://api.cryptonator.com/api/ticker/nlg-btc', function(data) {
			self.nlgToBtc = data.ticker.price
		})
		$.get('https://api.cryptonator.com/api/ticker/nlg-eth', function(data) {
			self.nlgToEth = data.ticker.price
		})
		$.get('https://api.cryptonator.com/api/ticker/nlg-usd', function(data) {
			self.nlgToUsd = data.ticker.price
		})

		this.getSystemEarnings()
	},
	methods: {
		calculateUserEstimatedEarning() {
			var currentHour = new Date().getUTCHours()
			if(currentHour < 1)
				currentHour = 1
			var additionalCHRAmount = this.toSatoshi(this.chrAmount)
			var todaySystemEarning = this.todaySystemEarning
			var systemTotalCHRAmount = this.wholeSystemEarning
			if(systemTotalCHRAmount == 0)
				return 0
			var userEstimatedEarning = 0
			userEstimatedEarning = todaySystemEarning / currentHour * 24 * additionalCHRAmount / systemTotalCHRAmount

			this.nlgDailyEarning = userEstimatedEarning
			this.nlgDailyEarning = this.convertToCurrency(this.nlgDailyEarning, 'NLG')
			this.usdDailyEarning = userEstimatedEarning * this.nlgToUsd
			this.usdDailyEarning = this.convertToCurrency(this.usdDailyEarning, 'USD')
			this.btcDailyEarning = userEstimatedEarning * this.nlgToBtc
			this.btcDailyEarning = this.convertToCurrency(this.btcDailyEarning, 'BTC')
			return userEstimatedEarning
		},
		getSystemEarnings: function() {
			this.$socket.emit("earning/updateSystemEarnings", {
				method: "post"
			})
		},
	},
	sockets: {
		"users/createDeposits": function(val) {
			this.btcDepositAddress = localStorage.getItem('btcDepositAddress')
			this.ethDepositAddress = localStorage.getItem('ethDepositAddress')
			this.nlgDepositAddress = localStorage.getItem('nlgDepositAddress')
			this.isCreatingAddresses = false
		},
		"earningsUpdate": function(val) {
			var earnings = JSON.parse(val.earnings)
			earnings = earnings.earnings
			this.todaySystemEarning = earnings[0]
			this.wholeSystemEarning = earnings[3]
			this.calculateUserEstimatedEarning()
		},
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
	.blue-icon { color: #164c7e; }
	.earnings-panel { padding: 15px 30px; display: inline-block; background-color: #f0f2f7; border-radius: 5px; box-shadow: 1px 1px 1px #E0E0E0;  }
	.earnings-panel span { color: #49586e; font-size: 13px; font-weight: normal; text-transform: uppercase; }
	.earnings-panel h3 { margin: 0; color: #65cea7; font-family: 'Open Sans', sans-serif; font-size: 20px; font-weight: bold; line-height: 20px; letter-spacing: 0px; }
</style>
