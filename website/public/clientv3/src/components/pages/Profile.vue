
<template>
	<!-- PROFILE section -->
	<div id="profile">
		<!-- PROFILE HEADER section-->
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">My Profile</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Profile</li>
				</ol>
			</div>
		</div>
		<!-- end PROFILE HEADER section -->

		<!-- Row -->
		<div class="row">
			<!-- Column -->
			<div class="col-lg-4 col-xlg-3 col-md-5">
				<div class="card">
					<div class="card-block p-b-10">
						<center class="m-t-10"> <i class="ti-user user-photo"></i>
							<h4 class="card-title m-t-10">{{firstName}} {{lastName}}</h4>
						</center>
					</div>
					<div>
						<hr> </div>
					<div class="card-block p-t-10">
						<small class="text-muted">Email address </small>
						<h6>{{email}}</h6>
						<small class="text-muted p-t-10 db">Nickname</small>
						<h6>{{nickName}}</h6>
						<small class="text-muted p-t-10 db">Receiving Address</small>
						<h6>{{ nlgReceivingAddress }}</h6>
					</div>
				</div>
			</div>
			<!-- Column -->
			<!-- Column -->
			<div class="col-lg-8 col-xlg-9 col-md-7">
				<div class="card">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs profile-tab" role="tablist">
						<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#home" role="tab">Refer Your Friends</a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#deposit" role="tab">Deposit Addresses</a> </li>
						<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#settings" role="tab">Profile Edit</a> </li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content">
						<div class="tab-pane active" id="home" role="tabpanel">
							<div class="card-block p-b-0">
								<div class="ribbon-wrapper">							
									<div class="ribbon ribbon-bookmark ribbon-info">Your referral link</div>
									<div class="row">
										<h6>{{ referralLink }}</h6>
									</div>
								</div>
							</div>

						</div>
						<div class="tab-pane" id="deposit" role="tabpanel">
							<div class="card-block p-b-0">
								<div class="ribbon-wrapper">							
									<div class="ribbon ribbon-bookmark ribbon-info">BTC Deposit Address</div>
									<div class="row">
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
										<h6 v-if="!isCreatingDeposits">{{ btcDepositAddress }}</h6>
									</div>
								</div>
							</div>
							<div class="card-block p-t-0 p-b-0">
								<div class="ribbon-wrapper">							
									<div class="ribbon ribbon-bookmark ribbon-info">ETH Deposit Address</div>
									<div class="row">
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
										<h6 v-if="!isCreatingDeposits">{{ ethDepositAddress }}</h6>
									</div>
								</div>
							</div>
							<div class="card-block p-t-0 p-b-0">
								<div class="ribbon-wrapper">							
									<div class="ribbon ribbon-bookmark ribbon-info">NLG Deposit Address</div>
									<div class="row">
										<i class="fa fa-btn fa-spinner fa-spin" v-if="isCreatingDeposits"></i>
										<h6 v-if="!isCreatingDeposits">{{ nlgDepositAddress }}</h6>
									</div>
								</div>
							</div>
						</div>
						<!--second tab-->
						<div class="tab-pane" id="settings" role="tabpanel">
							<div class="card-block">
								<div class="alert alert-error" v-if="updateErrorMsg !== ''">
									{{ updateErrorMsg }}
								</div>
								<form @submit.prevent="onUpdateProfile('profile-form')" class="form-horizontal form-material" data-vv-scope="profile-form">
									<div class="row form-group">
										<div class="col-md-6 nopadding ">
											<label class="col-md-12 ">First Name</label>
											<div class="col-md-12 p-b-20">
												<input type="text" v-model="firstName" class="form-control form-control-line" placeholder="First name" >
											</div>
										</div>
										<div class="col-md-6 nopadding">
											<label class="col-md-12">Last Name</label>
											<div class="col-md-12 p-b-20">
												<input type="text" v-model="lastName" class="form-control form-control-line" placeholder="Last name" >
											</div>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-12">Nickname</label>
										<div class="col-md-12">
											<input type="text" v-model="nickName" class="form-control form-control-line" placeholder="Nickname" >
										</div>
									</div>

									<div class="form-group">
										<label for="newEmail" class="col-md-12">Email Address</label>
										<div class="col-md-12">
											<input type="email" placeholder="New Email Address" class="form-control form-control-line" name="newEmail" id="newEmail" v-model="newEmail" v-validate="'required|email'">
											<p class="vv-invalid" v-if="errors.has('profile-form.newEmail')"> 
												{{ errors.first('profile-form.newEmail') }} 
											</p>
										</div>										
									</div>

									<div class="form-group">
										<label class="col-md-12">New Receiving Address</label>
										<div class="col-md-12">
											<input type="text" name="newNlgReceivingAddress" v-model="newNlgReceivingAddress" class="form-control form-control-line" v-validate="'required'" data-vv-as="NLG receiving address" placeholder="New NLG receiving address">
											<p class="vv-invalid" v-if="errors.has('profile-form.newNlgReceivingAddress')"> 
												{{ errors.first('profile-form.newNlgReceivingAddress') }} 
											</p>
										</div>
									</div>

									<div class="form-group">
										<label class="col-md-12">Current Password</label>
										<div class="col-md-12">
											<input type="password" name="password" v-model="password" class="form-control form-control-line" v-validate="'required'" data-vv-as="current password" placeholder="Current Password">
											<p class="vv-invalid" v-if="errors.has('profile-form.password')"> 
												{{ errors.first('profile-form.password') }} 
											</p>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-12">New password</label>
										<div class="col-md-12">
											<input type="password" name="newPassword" v-model="newPassword" v-validate="'min:6'" data-vv-as="new password" class="form-control form-control-line" placeholder="New Password">
											<p class="vv-invalid" v-if="errors.has('profile-form.newPassword')"> 
												{{ errors.first('profile-form.newPassword') }} 
											</p>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-12">Confirm Password</label>
										<div class="col-md-12">
											<input type="password" name="confirmPassword" v-model="confirmPassword" v-validate="'min:6|confirmed:newPassword'" data-vv-as="confirm password" class="form-control form-control-line" placeholder="Confirm Password">
											<p class="vv-invalid" v-if="errors.has('profile-form.confirmPassword')"> 
												{{ errors.first('profile-form.confirmPassword') }} 
											</p>
										</div>
									</div>

									<div class="form-group">
										<div class="col-md-12 text-center">
											<button type="submit" class="btn btn-lg btn-success" v-bind:disabled="isUpdatingProfile">
												<i class="fa fa-floppy-o" ></i>
												Update Profile
												<i class="fa fa-btn fa-spinner fa-spin" v-if="isUpdatingProfile"></i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Column -->
		</div>
		<!-- Row -->

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
			newNlgReceivingAddress: localStorage.getItem('nlgReceivingAddress'),
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
	.row { margin: 0px; }
	.user-photo { font-size: 8em; }
	.nopadding { padding: 0 !important; margin: 0 !important; }
	.vv-invalid {
		margin-top: 0px;
		margin-bottom: 3px;
		padding-top: 0px;
		padding-bottom: 0px;
		text-align: left;
		letter-spacing: 0px;
		color: #dd0000;
		font-size: 0.8em;
	}
</style>
