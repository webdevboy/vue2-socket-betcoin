<template>
	<!-- REGISTER section -->
	<div id="main-wrapper">
		<!-- HEADER section -->
		<guests-header></guests-header>
		<!-- end HEADER section -->
		<div class="row register-section">
			<div class="col-md-12 register-header">
				<div class="row fix-width">
					<div class="col-md-2 register-icon">
						<i class="ti-user"></i>
					</div>
					<div class="col-md-10">
						<h1>Please register here</h1>
						<h3>Chratos is a legendary project that is helping people worldwide to have "enough".</h3>
					</div>
				</div>
			</div>

			<!-- Validation wizard -->
			<div class="row col-md-12 register-content">
				<div class="col-12 fix-width">
					<div class="card">
						<div class="card-block">

							<div class="alert alert-danger" v-if="registerErrorMsg != ''">
								<i class="ti-user"></i> {{ registerErrorMsg }}
							</div>
							<div>
								<form-wizard @on-complete="onComplete"
										title=""
										subtitle=""
										back-button-text="back"
										next-button-text="next"
										finish-button-text="Finish"
										:start-index="stepIndex"
										color="#0694d8">

									<tab-content title="Personal details" icon="ti-user" :before-change="validatePersonalTab">
										<div class="container">
												<form action="#" method="post" data-vv-scope="register-first-form">
													<div class="row">
														<div class="col-md-6">
															<div class="form-group">
																<label for="regFirstName"> First Name : </label>
																<input type="text" name="regFirstName" v-model="regFirstName" class="form-control" placeholder="First Name" > </div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label for="regLastName"> Last Name : </label>
																<input type="text" name="regLastName" v-model="regLastName" class="form-control" placeholder="Last name" > </div>
														</div>
													</div>
													<div class="row">
														<div class="col-md-6">
															<div class="form-group">
																<label for="regNickName">Nick Name :</label>
																<input type="text" name="regNickName" v-model="regNickName" class="form-control" placeholder="Nick Name" > </div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label for="regEmail"> Email Address : <span class="danger">*</span> </label>
																<input type="email" name="regEmail" v-model="regEmail" class="form-control" v-validate="'required|email'" data-vv-as="email" placeholder="Email address">
																<p class="vv-invalid" v-if="errors.has('register-first-form.regEmail')"> 
																	{{ errors.first('register-first-form.regEmail') }} 
																</p>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-md-6">
															<div class="form-group">
																<label for="regPassword"> Password : <span class="danger">*</span> </label>
																<input type="password" name="regPassword" v-model="regPassword" class="form-control" v-validate="'required|min:6'" data-vv-as="password" placeholder="Password">
																<p class="vv-invalid" v-if="errors.has('register-first-form.regPassword')"> 
																	{{ errors.first('register-first-form.regPassword') }} 
																</p>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label for="regConfirmPassword"> Confirm Password : <span class="danger">*</span> </label>
																<input type="password" name="regConfirmPassword" v-model="regConfirmPassword" v-validate="'required|min:6|confirmed:regPassword'" data-vv-as="confirm password" class="form-control"  placeholder="Confirm Password">
																<p class="vv-invalid" v-if="errors.has('register-first-form.regConfirmPassword')"> 
																	{{ errors.first('register-first-form.regConfirmPassword') }} 
																</p>
															</div>
														</div>
													</div>

												</form>
										</div>
									</tab-content>

									<tab-content title="Payout" icon="fa fa-money" :before-change="validatePayoutTab">
										<div class="container row">
											<div class="col-md-6">
												<form action="#" method="post" data-vv-scope="register-second-form">
													
													<div class="form-group">
														<label for="regNlgReceivingAddress">Gulden (NLG) Payout Address : </label>
														<input type="text" name="regNlgReceivingAddress" v-model="regNlgReceivingAddress" v-validate="'required'" data-vv-as="Nlg receiving address" class="form-control" placeholder="NLG receiving address">
														<p class="vv-invalid" v-if="errors.has('register-second-form.regNlgReceivingAddress')"> 
															{{ errors.first('register-second-form.regNlgReceivingAddress') }} 
														</p>
													</div>

												</form>
											</div>
											<div class="col-md-6">
												<div class="content-right">Chratos pays out 10% of your earnings as <a href="https://gulden.com">Gulden (NLG)</a>.  This means that you will need a Gulden wallet to receive your earnings every day.  If you haven't done so already, please go to <a href="https://gulden.com">https://gulden.com/</a> and download the Gulden Wallet.  Once you have the wallet installed, open it up to get your receiving address and enter it into the form field on the left.</p></div>
											</div>
										</div>
									</tab-content>

									<tab-content title="Fund" icon="ti-shopping-cart" :before-change="validateFundTab">
										<div class="row fund-cards">
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
														<hr class="m-t-5 m-b-0">
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
														<div class="ribbon-wrapper m-t-30">
															<div class="ribbon ribbon-bookmark ribbon-info">Deposit BTC address</div>
															<div class="row p-t-20">
																<div class="col-md-12">
																	<i class="fa fa-link blue-icon" aria-hidden="true"></i>
																	<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
																	<span v-if="!isCreatingAddresses">{{ btcDepositAddress }}</span>
																</div>
															</div>
														</div>
														<div class="ribbon-wrapper m-t-30">
															<div class="ribbon ribbon-bookmark ribbon-info">Deposit ETH address</div>
															<div class="row p-t-20">
																<div class="col-md-12">
																	<i class="fa fa-link blue-icon" aria-hidden="true"></i>
																	<i class="fa fa-btn fa-spinner fa-spin blue-icon" v-if="isCreatingAddresses"></i>
																	<span v-if="!isCreatingAddresses">{{ ethDepositAddress }}</span>
																</div>
															</div>
														</div>
														<div class="ribbon-wrapper m-t-30">
															<div class="ribbon ribbon-bookmark ribbon-info">Deposit Gulden address</div>
															<div class="row p-t-20">
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
									</tab-content>

									<tab-content title="Share" icon="ti-share-alt" :before-change="validateSocialTab">
										<div class="card share-card">
											<div class="card-block">		
												<h3 class="card-title">Share with friends</h3>										
												<div class="justify-content-center p-l-10 p-r-10">
													<h5 >Referral Link</h5>
													<h4>{{ userReferralUrl }}</h4>
													<div class="social-buttons">
														<social-sharing :url="userReferralUrl" inline-template>
															<div>
																<network network="facebook">
																	<div class="btn btn-facebook">
																		<i class="fa fa-facebook"></i> Facebook
																	</div>
																</network>
																</network>
																<network network="twitter">
																	<div class="btn btn-twitter">
																		<i class="fa fa-twitter"></i> Twitter
																	</div>
																</network>
															</div>
														</social-sharing>												
															
													</div>
												</div>
											</div>
										</div>
									</tab-content>

								</form-wizard>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- vertical wizard -->

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
		<!-- FOOTER section -->
		<general-footer></general-footer>
		<!-- end FOOTER section -->
	</div>
	<!-- end REGISTER section -->
</template>

<script>
import GuestsHeader from "../headers/GuestsHeader"
import Footer from "../footers/Footer.vue"
import router from '../../router'
//local registration
import {FormWizard, TabContent} from 'vue-form-wizard'

export default {
	name: 'register',
	components: {
		guestsHeader: GuestsHeader,
		generalFooter: Footer,
		FormWizard,
  		TabContent
	},
	data: function () {
		return {
            //variables for Register form
            regFirstName: '',
            regLastName: '',
            regNickName: '',
            regNlgReceivingAddress: '',
            regEmail: '',
            regPassword: '',
			regConfirmPassword: '',
			need2FA: false,

            isRegistering: false,
            registerErrorMsg: '',
			stepIndex: localStorage.getItem('regStepIndex') ? parseInt(localStorage.getItem('regStepIndex')) : 0,

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
			userReferralUrl : window.location.origin + '/#/index/ref/' + localStorage.getItem('userGUID')
			
		}
	},
	methods: {
		onRegister: function(event) {
            if (event) event.preventDefault()

			this.isRegistering = true
			var referrer = this.$route.params.ref
			if(!referrer)
				referrer = 'admin'

			this.$socket.emit("users/registerUser", {
				method: "post", 
				firstName: this.regFirstName, 
				lastName: this.regLastName, 
				nickName: this.regNickName,
				nlgWithdrawAddress: this.regNlgReceivingAddress, 
				email: this.regEmail, 
				password: this.regPassword, 
				referrer:referrer, 
				need2FA: this.need2FA
			});
        },
		onComplete: function(){
			// this.onRegister();
			router.replace( { path: "/dashboard" } );
		},
		validatePersonalTab: function() {
			return this.$validator.validateAll('register-first-form').then(v=>{
				if( v ) {
					this.stepIndex = 1;
					localStorage.setItem('regFirstName', this.regFirstName ? this.regFirstName : '')
					localStorage.setItem('regLastName', this.regLastName ? this.regLastName : '')
					localStorage.setItem('regNickName', this.regNickName ? this.regNickName : '')
					localStorage.setItem('regStepIndex', this.stepIndex ? this.stepIndex : 0)
					localStorage.setItem('regEmail', this.regEmail ? this.regEmail : '')
					localStorage.setItem('regPassword', this.regPassword ? this.regPassword : '')
					localStorage.setItem('regConfirmPassword', this.regConfirmPassword ? this.regConfirmPassword : '')
				}				
				return v;
            });
        },
		validatePayoutTab: function() {
            return this.$validator.validateAll('register-second-form').then(v=>{
				if( v ) {
					this.stepIndex = 2;
					localStorage.setItem('regNlgReceivingAddress', this.regNlgReceivingAddress ? this.regNlgReceivingAddress : '')
					localStorage.setItem('regStepIndex', this.stepIndex ? this.stepIndex : 0)

					if ( !this.isAuthenticated() ) {
						this.onRegister();
					}
				}
				return v;
            });
        },
		validateFundTab: function() {
			this.stepIndex = 3;
			localStorage.setItem('regStepIndex', this.stepIndex ? this.stepIndex : 3)
			return true;
        },
		validateSocialTab: function() {
			this.stepIndex = 0;
			return true;
        },
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
        "users/registerUser": function(val) {
            console.log('registerUser', val);
            if (!val.body.err) {
				if ( val.body.user !== undefined ) {
					this.saveSession(val.body.user.user, 2);
					
					this.registerErrorMsg = ''
					this.userReferralUrl = window.location.origin + '/#/index/ref/' + val.body.user.user.userGUID;
					this.$socket.emit("users/createDeposits", {
						method: "post", 
						userGUID: val.body.user.user.userGUID
					})
				}

                // router.replace( { path: "/dashboard" } );
			} else {
                this.registerErrorMsg = val.body.err
            }
            this.isRegistering = false
        },
		"earningsUpdate": function(val) {
			var earnings = JSON.parse(val.earnings)
			earnings = earnings.earnings
			this.todaySystemEarning = earnings[0]
			this.wholeSystemEarning = earnings[3]
			this.calculateUserEstimatedEarning()
		},
		"users/createDeposits": function(val) {
			console.log('created deposits', val)
			if(val.body.err == null) {
				var user = val.body.user
				localStorage.setItem('btcDepositAddress', user.btcDepositAddress)
				localStorage.setItem('ethDepositAddress', user.ethDepositAddress)
				localStorage.setItem('nlgDepositAddress', user.nlgDepositAddress)
				this.isCreatingAddresses = false
			} else {
				swal("Server Connection Error!")
			}
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
	},
	mounted: function() {
	},
	created: function() {
		this.regFirstName = localStorage.getItem('regFirstName') ? localStorage.getItem('regFirstName') : '';
		this.regLastName = localStorage.getItem('regLastName') ? localStorage.getItem('regLastName') : '';
		this.regNickName = localStorage.getItem('regNickName') ? localStorage.getItem('regNickName') : '';
		this.regNlgReceivingAddress = localStorage.getItem('regNlgReceivingAddress') ? localStorage.getItem('regNlgReceivingAddress') : '';
		this.regEmail =  localStorage.getItem('regEmail') ? localStorage.getItem('regEmail') : '';
		this.regPassword = localStorage.getItem('regPassword') ? localStorage.getItem('regPassword') : '';
		this.regConfirmPassword = localStorage.getItem('regConfirmPassword') ? localStorage.getItem('regConfirmPassword') : '';

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
	}
}
</script>

<style scoped>
	.row { margin: 0px auto; }
	.register-section .register-header { color: #fff; padding: 50px 0px 10px 0px; min-height: 200px; background-color: rgba(6, 148, 216, 0.8); }
	.register-section .register-header h1 { color: #fff; padding-top: 10px; }
	.register-section .register-header h3 { color: #fff }
	.register-section .card { width: 100%; background-color: #fafafa; }
	.fund-cards .card { background-color: white; }
	.register-section .card .card-block{ padding: 1rem; }
	.register-icon{ font-size: 5em; text-align: center; font-weight: normal; color: #fff; text-shadow: 1px 1px 1px rgba(0, 0, 0, 1); }
	.register-content { background-color: #fff; padding: 20px 0px 60px 0px; }
	.register-content .fix-width { padding: 0px; }
	@media only screen and (max-width: 500px) {
		.register-section .register-header { text-align: center; }
	}
	.share-card .card-block{ background-color: white; }
	.social-buttons { display: flex; height: 100%; align-items: center; justify-content: center; }
</style>