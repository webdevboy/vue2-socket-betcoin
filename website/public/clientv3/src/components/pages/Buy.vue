
<template>
	<!-- BUY NOW section -->
	<div id="buy">
		<!-- BUY NOW HEADER section-->
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">Buy Now</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Buy</li>
				</ol>
			</div>
		</div>
		<!-- end BUY NOW HEADER section -->

		<!-- BUY NOW BODY section-->
		<div class="row">
			<div class="col-md-6">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Step 1: Buy Now</h3>
						<h6 class="card-subtitle">CHR To Buy</h6>
						<div class="row">
							<div class="input-group">
								<span class="input-group-addon">CHR</span>
								<input type="number" v-model="chrAmount" min="1" max="50000" class="form-control">
								<span class="input-group-addon" style="width: 55%;"><input type="range" value="1" min="1" max="50000" v-model="chrAmount"></span>
							</div>
							<div style="display: block; margin-top: 10px; margin-bottom: 10px;">
								( = {{ chrAmount }} NLG
								= {{ (chrAmount * nlgToBtc).toFixed(8) }} BTC
								= {{ (chrAmount * nlgToEth).toFixed(8) }} ETH )
							</div>
						</div>
						<h6 class="card-subtitle m-t-20">Estimated Daily Earning</h6>
						<div class="row justify-content-center">
							<div>
								<h6>{{this.nlgDailyEarning}}</h6>
								<h6>{{this.usdDailyEarning}}</h6>
								<h6>{{this.btcDailyEarning}}</h6>
							</div>
						</div>
						<h6 class="card-subtitle m-t-20">Coinbase referral link</h6>
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
					<div class="card-block text-center">
						<button class="btn btn-lg btn-primary" data-toggle="modal" href="#dlg-buy-now" data-title="" data-url=""> 
							<i class="fa fa-shopping-cart" aria-hidden="true"></i>
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title"><i class="fa fa-drivers-license" aria-hidden="true"></i> Step 2: Deposit Bitcoin Addresses Here</h3>
						<div class="ribbon-wrapper">
							<div class="ribbon ribbon-bookmark ribbon-info">Deposit BTC address</div>
							<div class="row">
								<div class="col-md-12">
									<i class="fa fa-link blue-icon" aria-hidden="true"></i>
									<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
									<span v-if="!isCreatingAddresses">{{ btcDepositAddress }}</span>
								</div>
							</div>
						</div>
						<div class="ribbon-wrapper">
							<div class="ribbon ribbon-bookmark ribbon-info">Deposit ETH address</div>
							<div class="row">
								<div class="col-md-12">
									<i class="fa fa-link blue-icon" aria-hidden="true"></i>
									<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
									<span v-if="!isCreatingAddresses">{{ ethDepositAddress }}</span>
								</div>
							</div>
						</div>
						<div class="ribbon-wrapper">
							<div class="ribbon ribbon-bookmark ribbon-info">Deposit Gulden address</div>
							<div class="row">
								<div class="col-md-12">
									<i class="fa fa-link blue-icon" aria-hidden="true"></i>
									<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
									<span v-if="!isCreatingAddresses">{{ nlgDepositAddress }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end BUY NOW BODY section-->


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
	.row { margin:0px; }
</style>
