
<template>
	<!-- PROFILE section -->
	<div id="profile">
		<!-- PROFILE HEADER section-->
		<div class="row bckffc-hero">
			<!-- INTRO section-->
			<div class="row intro-section">
				<div class="container">
					<h1>My Profile</h1>
					<h3>Nullam et risus non leo venenatis scelerisque a viverra orci. <br/> Praesent a laoreet magna, vitae imperdiet ex.</h3>
				</div>
			</div>
			<!-- end INTRO section-->
		</div> 
		<!-- end PROFILE HEADER section -->

		<!-- PROFILE BODY section-->
		<div class="row profile-section">
			<div class="container">
				<!-- LEFT section -->
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">
							<i class="fa fa-id-card-o" aria-hidden="true"></i> 
							{{ !isProfileEdit ? 'My Details' : 'Edit Details' }}
						</div>
						<div class="card-block" v-if="!isProfileEdit">
							<div class="col-xs-12 margin-bottom-30">
								<span class="col-xs-4 nopadding" v-bind:style="passwordStyle">
									<i class="fa fa-user" aria-hidden="true"></i>
									Full Name
								</span>
								<span class="col-xs-8 blue-icon" v-bind:style="passwordStyle">
									{{ firstName }} {{ lastName }}
								</span>
							</div>
							
							<div class="col-xs-12 margin-bottom-30">
								<span class="col-xs-4 nopadding" v-bind:style="passwordStyle">
									<i class="fa fa-user" aria-hidden="true"></i>
									Nickname
								</span>
								<span class="col-xs-8 blue-icon" v-bind:style="passwordStyle"> 
									{{ nickName }}
								</span>
							</div>

							<div class="col-xs-12 margin-bottom-30">
								<span class="col-xs-4 nopadding" v-bind:style="passwordStyle">
									<i class="fa fa-envelope" aria-hidden="true"></i>
									Email Address
								</span>
								<span class="col-xs-8 blue-icon" v-bind:style="passwordStyle">
									{{ email || 'No Email Address' }}
								</span>
							</div>

							<div class="col-xs-12 margin-bottom-30">
								<span class="col-xs-4 nopadding" v-bind:style="passwordStyle">
									<i class="fa fa-link" aria-hidden="true"></i>
									Receiving Address
								</span>
								<span class="col-xs-8 blue-icon" v-bind:style="passwordStyle">
									{{ newNlgReceivingAddress }}
								</span>
							</div>

							<div class="col-xs-12 margin-bottom-30" v-if="showPassword">
								<span class="col-xs-4 nopadding" v-bind:style="passwordStyle">
									<i class="fa fa-key" aria-hidden="true"></i>
									Password
								</span>
								<span class="col-xs-8 blue-icon" v-bind:style="passwordStyle">
									{{ currentPassword }}
								</span>
							</div>

							<hr class="full-width" />

							<div class="text-center">
								<button type="button" class="btn btn-primary" v-on:click="modalProfile" v-bind:disabled="isGoogleAccount">
									<i class="fa fa-edit detail-edit" aria-hidden="true"></i>Edit
								</button>
							</div>
						</div>
						<div class="card-block" v-if="isProfileEdit">
							<div class="alert-error" v-if="updateErrorMsg !== ''">
								{{ updateErrorMsg }}
							</div>
							<form @submit.prevent="onUpdateProfile('profile-form')" class="inlog-form" data-vv-scope="profile-form">
								<div class="text-left" style="overflow: hidden;">
									<div class="half-width">
										<span class="field-label">First Name:</span>
										<input type="text" v-model="firstName" class="submit-inlog margin-input" placeholder="First name" >
									</div>
									<div class="half-width">
										<span class="field-label">Last Name:</span>
										<input type="text" v-model="lastName" class="submit-inlog margin-input" placeholder="Last name" >
									</div>
								</div>

								<div class="text-left">
									<span class="field-label">Nickname:</span>
									<input type="text" v-model="nickName" class="submit-inlog margin-input" placeholder="Nickname" >
								</div>

								<div class="text-left">
									<span :class="{'field-label': true, 'is-danger': errors.has('profile-form.newEmail') }">Email Address:</span>
									<input type="text" name="newEmail" v-model="newEmail" v-validate="'required|email'" class="submit-inlog margin-input" placeholder="New Email Address">
								</div>
								<p class="vv-invalid" v-if="errors.has('profile-form.newEmail')"> 
									{{ errors.first('profile-form.newEmail') }} 
								</p>

								<div class="text-left">
	                        		<span :class="{'field-label': true, 'is-danger': errors.has('profile-form.newNlgReceivingAddress') }">Receiving Address:</span>
									<input type="text" name="newNlgReceivingAddress" v-model="newNlgReceivingAddress" class="submit-inlog margin-input" v-validate="'required'" data-vv-as="NLG receiving address" placeholder="NLG receiving address">
								</div>
								<p class="vv-invalid" v-if="errors.has('profile-form.newNlgReceivingAddress')"> 
									{{ errors.first('profile-form.newNlgReceivingAddress') }} 
								</p>

								<div class="text-left">
									<span :class="{'field-label': true, 'is-danger': errors.has('profile-form.password') }">Current Password:</span>
									<input type="password" name="password" v-model="password" class="submit-inlog margin-input" v-validate="'required'" data-vv-as="current password" placeholder="Current Password">
								</div>
								<p class="vv-invalid" v-if="errors.has('profile-form.password')"> 
									{{ errors.first('profile-form.password') }} 
								</p>

								<div class="text-left">
									<span :class="{'field-label': true, 'is-danger': errors.has('profile-form.newPassword') }">New password:</span>
									<input type="password" name="newPassword" v-model="newPassword" v-validate="'min:6'" data-vv-as="new password" class="submit-inlog margin-input" placeholder="New Password">
								</div>
								<p class="vv-invalid" v-if="errors.has('profile-form.newPassword')"> 
									{{ errors.first('profile-form.newPassword') }} 
								</p>

								<div class="text-left">
									<span :class="{'field-label': true, 'is-danger': errors.has('profile-form.confirmPassword') }">Confirm Password:</span>
									<input type="password" name="confirmPassword" v-model="confirmPassword" v-validate="'min:6|confirmed:newPassword'" data-vv-as="confirm password" class="submit-inlog margin-input" placeholder="Confirm Password">
								</div>
								<p class="vv-invalid" v-if="errors.has('profile-form.confirmPassword')"> 
									{{ errors.first('profile-form.confirmPassword') }} 
								</p>

								<div class="edit-control text-center">
									<button type="button" class="btn btn-basic" v-on:click="onCancelEdit">
										<i class="fa fa-close" ></i>
										Cancel
									</button>
									
									<button type="submit" class="btn btn-primary" v-bind:disabled="isUpdatingProfile">
										<i class="fa fa-floppy-o" ></i>
										Save
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isUpdatingProfile"></i>
									</button>
								</div>
							</form>
						</div>
					</div>

				</div>
				<!-- end LEFT section -->

				<!-- RIGHT section -->
				<div class="col-md-6">

					<!-- REFER section-->
					<div class="card">
						<div class="card-header">
							<i class="fa fa-link" aria-hidden="true"></i> 
							Refer your friends
						</div>
						<div class="card-block">
							<h5 class="margin-bottom-10">- Your referral link</h5>
							<div class="col-xs-12 margin-bottom-30">
								<span>
									<i class="fa fa-external-link-square blue-icon" aria-hidden="true"></i>
									{{ referralLink }}
								</span>
							</div>

							<h5 class="margin-bottom-10">- BTC Deposit Address</h5>
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
							<div class="col-xs-12 margin-bottom-10">
								<span v-if="!isCreatingDeposits"> 
									<i class="fa fa-link blue-icon" aria-hidden="true"></i> 
									{{ btcDepositAddress }} 
								</span>
							</div>

							<h5 class="margin-bottom-10">- ETH Deposit Address</h5>
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
							<div class="col-xs-12 margin-bottom-10">
								<span v-if="!isCreatingDeposits"> 
									<i class="fa fa-link blue-icon" aria-hidden="true"></i> 
									{{ ethDepositAddress }} 
								</span>
							</div>

							<h5 class="margin-bottom-10">- NLG Deposit Address</h5>
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
							<div class="col-xs-12 margin-bottom-10">
								<span v-if="!isCreatingDeposits"> 
									<i class="fa fa-link blue-icon" aria-hidden="true"></i> 
									{{ nlgDepositAddress }}
								</span>
							</div>

							<h5 class="margin-bottom-10">- NLG Receiving Address</h5>
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
							<div class="col-xs-12 margin-bottom-30">
								<span v-if="nlgReceivingAddress != '#' "> 
									<i class="fa fa-link blue-icon" aria-hidden="true"></i> 
									{{ nlgReceivingAddress }} 
								</span>
								<span v-if="nlgReceivingAddress == '#'"> Please add your NLG receiving address. </span>
							</div>
						</div>
					</div>
					<!-- end REFER section-->

					
				</div>
				<!-- end RIGHT section -->
			</div>
		</div>
		<!-- end PROFILE BODY section-->

	</div>
	<!-- end PROFILE section -->
</template>

<script>
//import VQrcode from "v-qrcode"

export default {
	name: 'profile',
	components: {
		//vQrcode: VQrcode
	},
	data: function() {
		return {
			//User info
			state: localStorage.getItem('state'),
			userGUID: localStorage.getItem('userGUID'),
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            nickName: localStorage.getItem('nickName'),
			email: localStorage.getItem('email'),
			currentPassword: localStorage.getItem('password'),
			btcDepositAddress: localStorage.getItem('btcDepositAddress'),
			ethDepositAddress: localStorage.getItem('ethDepositAddress'),
			nlgDepositAddress: localStorage.getItem('nlgDepositAddress'),
			nlgReceivingAddress: localStorage.getItem('nlgReceivingAddress'),
			referralLink: window.location.origin + '/#/index/ref/' + localStorage.getItem('userGUID'),
			need2FA: localStorage.getItem('need2FA') == 'true' ? true : false, 
			isGoogleAccount: localStorage.getItem('isGoogleAccount') == 'true' ? true : false,
			//variables for edit profile form
			newEmail: '',
			newNlgReceivingAddress: '',
			password: '',
			newPassword: '',
			confirmPassword: '',
			updateErrorMsg: '',
			isUpdatingProfile: false,
			isProfileEdit: false,
			
			//Others
			showPassword: false,
			passwordStyle: '',

			isCreatingDeposits: false,
		}
	},
	created: function() {
		this.isCreatingDeposits = (!this.btcDepositAddress)
		//Log in state or ...?
		this.showPassword = (this.state == 1)
		this.passwordStyle = this.showPassword ? 'color: red' : ''
		//Fill Balance Area
		//this.getAllDepositBalances()
	},
	methods: {
		modalProfile: function(event) {
			if (event) event.preventDefault()
			if(this.isGoogleAccount) {
				return
			}
			this.updateErrorMsg = ''
			this.newEmail = localStorage.getItem('email')
			this.newNlgReceivingAddress = this.nlgReceivingAddress
			this.password = ''
			this.newPassword = ''
			this.confirmPassword = ''
			this.errors.clear('profile-form')
			this.isProfileEdit = true
			//$('#dlg-profile').modal('show')
		},
		onCancelEdit: function(event) {
			this.isProfileEdit = false
		},
		onUpdateProfile(scope) {
			this.$validator.validateAll(scope).then(result => {
				if (result) {
					this.isUpdatingProfile = true
					this.$socket.emit("users/updateProfile", {
						method: "post", 
						userGUID: this.userGUID, 
						firstName: this.firstName, 
						lastName: this.lastName, 
						nickName: this.nickName,
						email: this.newEmail, 
						nlgWithdrawAddress: this.newNlgReceivingAddress, 
						password: this.password, 
						newPassword: this.newPassword, 
						need2FA: this.need2FA
					});
				}
			});
		}
	},
	sockets: {
		"users/updateProfile": function(val) {
			if(val.body.err === null) {
				console.log('reasdasdfasdf');
				localStorage.setItem('state', 3)
				localStorage.setItem('firstName', this.firstName)
				localStorage.setItem('lastName', this.lastName)
				localStorage.setItem('nickName', this.nickName)
				localStorage.setItem('email', this.newEmail)
				this.email = this.newEmail
				localStorage.setItem('newNlgReceivingAddress', this.newNlgReceivingAddress)
				this.nlgReceivingAddress = this.newNlgReceivingAddress
				if(this.newPassword != '')
					localStorage.setItem('password', this.password)
				localStorage.setItem('need2FA', this.need2FA)
				this.showPassword = false
				this.isProfileEdit = false
				//$('#dlg-profile').modal('hide')
				this.eventHub.$emit('fullNameChanged', null)
			} else {
				this.updateErrorMsg = val.body.err
			}
			this.isUpdatingProfile = false
			
		},
		"users/createDeposits": function(val) {
			this.btcDepositAddress = localStorage.getItem('btcDepositAddress')
			this.ethDepositAddress = localStorage.getItem('ethDepositAddress')
			this.nlgDepositAddress = localStorage.getItem('nlgDepositAddress')
			this.isCreatingDeposits = false
		}
	}
} 
</script>

<style scoped>
	.detail-edit { margin-right: 5px; font-size: 15px; color: #FFF; }
	.blue-icon { color: #164c7e; }
	.half-width { float: left; width: 50%; padding-right: 2px; }
	.margin-input { margin-top: 5px; margin-bottom: 5px; }
	.field-label { margin-top: 5px; margin-bottom: 5px; color: #aaa; }
	.inlog-form { padding: 0px; }
	.inlog-form .submit-inlog { border: 1px solid #cecdcd; }
	.is-danger { color: #dd0000; }
	.edit-control { padding: 10px 0px; }
	.edit-control .btn{ margin: 0px 10px; }
	.nopadding { padding: 0 !important; margin: 0 !important; }
	.vv-invalid {
		margin-top: 0px;
		margin-bottom: 3px;
		padding-top: 0px;
		padding-bottom: 0px;
		text-align: left;
		letter-spacing: 0px;
		color: #dd0000;
		font-size: 1em;
	}
</style>
