
<template>
	<div id="user-profile">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-user"></i>
	        			User Profile
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingUserProfile"></i>
	        		</div>
	        		
	        		<div class="card-block">
	        			<form action="#" method="post" class="subscribe-form" data-vv-scope="profile-form">
		        			<div v-if="isLoadingFinished()">

			        			<div class="row">
				        			<div class="form-group col-md-6">
				        				<label for="firstName"> First Name </label>
				        				<input type="text" id="firstName" class="form-control" v-model="userProfile.firstName" />
				        			</div>
				        			<div class="form-group col-md-6">
				        				<label for="lastName"> Last Name </label>
				        				<input type="text" id="lastName" class="form-control" v-model="userProfile.lastName" />
				        			</div>
				        		</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="email"> Email </label>
				        				<input type="text" id="email" name="email" class="form-control" v-model="userProfile.email" v-validate="'required|email'" data-vv-as="email" />
			                            <p class="vv-invalid" v-if="errors.has('profile-form.email')"> 
			                                {{ errors.first('profile-form.email') }} 
			                            </p>
				        			</div>
				        		</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="password"> Password </label>
				        				<input type="password" id="password" name="password" class="form-control" v-model="password" v-validate="'min:6'" data-vv-as="password" />
			                            <p class="vv-invalid" v-if="errors.has('profile-form.password')" > 
			                                {{ errors.first('profile-form.password') }} 
			                            </p>
				        			</div>
				        		</div>
				        		<div class="row">
				        			<div class="form-group col-md-4">
				        				<label for="btcDepositAddress"> BTC Deposit Address </label>
				        				<input type="text" id="btcDepositAddress" class="form-control" v-model="userProfile.btcDepositAddress" />
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="ethDepositAddress"> ETH Deposit Address </label>
				        				<input type="text" id="ethDepositAddress" class="form-control" v-model="userProfile.ethDepositAddress" />
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="nlgDepositAddress"> NLG Deposit Address </label>
				        				<input type="text" id="nlgDepositAddress" class="form-control" v-model="userProfile.nlgDepositAddress" />
				        			</div>
				        		</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="nlgWithdrawAddress"> NLG Payout Address </label>
				        				<input type="text" id="nlgWithdrawAddress" name="nlgWithdrawAddress" class="form-control" v-model="userProfile.nlgWithdrawAddress" v-validate="'required'" data-vv-as="Nlg withdraw address" />
			                            <p class="vv-invalid" v-if="errors.has('profile-form.nlgWithdrawAddress')" > 
			                                {{ errors.first('profile-form.nlgWithdrawAddress') }} 
			                            </p>
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="referrer"> Referrer </label>
				        				<input type="text" id="referrer" name="referrer" class="form-control" v-model="userProfile.referrer" v-validate="'required'" data-vv-as="referrer" />
			                            <p class="vv-invalid" v-if="errors.has('profile-form.referrer')" > 
			                                {{ errors.first('profile-form.referrer') }} 
			                            </p>
				        			</div>
				        		</div>
			        			<div class="row">
				        			<div class="form-group col-md-4">
				        				<label for="created"> Created At </label>
				        				<input type="text" id="created" class="form-control" v-model="userProfile.created" readonly />
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="lastUpdated"> Updated At </label>
				        				<input type="text" id="lastUpdated" class="form-control" v-model="userProfile.lastUpdated" readonly />
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="lastLogin"> Last Login At </label>
				        				<input type="text" id="lastLogin" class="form-control" v-model="userProfile.lastLogin" readonly />
				        			</div>
				        		</div>

			        			<div class="row">
				        			<div class="form-group col-md-4">
			                            <input type="checkbox" id="active" v-model="userProfile.active" /> 
			                            <label for="active">Account Activated?</label>
				        			</div>
				        			<div class="form-group col-md-4">
			                            <input type="checkbox" id="emailValidated" v-model="userProfile.emailValidated" /> 
			                            <label for="emailValidated">Email Validated?</label>
				        			</div>
				        			<div class="form-group col-md-4">
			                            <input type="checkbox" id="need2FA" v-model="userProfile.need2FA" /> 
			                            <label for="need2FA">Use 2FA?</label>
				        			</div>
				        		</div>

			        		</div>
			        	</form>
		        	</div>

		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onUpdateProfile">
		        			Update Profile
		        			<i class="fa fa-btn fa-spinner fa-spin" v-if="isSavingUserProfile"></i>
		        		</button>
		        		<button class="btn btn-danger" v-on:click="onBackToUsers">Back to Users</button>
		        	</div>

	        	</div>
	        </div>
		</div>
		<modal title="Save changes" v-model="askSaveDlg" @ok="onSave()" effect="fade/zoom">
			<div slot="modal-header" class="modal-header">
				<h4 class="modal-title">Confirmation</h4>
			</div>
			Are you sure to save changes?
		</modal>
	</div>
</template>

<script>
import Modal from 'vue-strap/src/modal'
import DataTable from "../datatables/DataTable.vue"
import router from "../../router"

export default {
	name: 'user-profile',
	components: {
		modal: Modal,
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedUser: localStorage.getItem('selectedUser', null),
			password: '',
			userProfile: null,
			isLoadingUserProfile: false,
			isSavingUserProfile: false,
			askSaveDlg: false,
		}
	},
	created: function() {
		this.getUserByID()
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		isLoadingFinished() {
			return this.userProfile ? true : false
		},
		getUserByID: function() {
			if( !this.isUserSelected() )
				return
			this.isLoadingUserProfile = true
			this.$socket.emit("users/getUserByID", {
				method: "post", 
				_id: this.selectedUser
			})
		},
		onUpdateProfile: function() {
            if (event) event.preventDefault()
            this.$validator.validateAll('profile-form').then(()=>{
            	this.askSaveDlg = true
            }).catch(()=>{

            });
		},
		onSave: function() {
			this.askSaveDlg = false
            this.isSavingUserProfile = true
            if(this.password != '')
            	this.userProfile.password = this.password
            this.userProfile.method = "post"
            this.$socket.emit("users/updateUserProfile", this.userProfile);
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"users/getUserByID": function(val) {
			this.userProfile = val.body.user
			this.userProfile.created = this.dateToString(this.userProfile.created)
			this.userProfile.lastUpdated = this.dateToString(this.userProfile.lastUpdated)
			this.userProfile.lastLogin = this.dateToString(this.userProfile.lastLogin)
			this.isLoadingUserProfile = false
		},
		"users/updateUserProfile": function(val) {
			var updatedUser = val.body.user
			this.password = ''
			this.userProfile.lastUpdated = this.dateToString(updatedUser.lastUpdated)
			this.isSavingUserProfile = false
		}
	}
} 
</script>

<style scoped>
	.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
	.vv-invalid { margin-top: 3px; margin-bottom: 3px; padding-top: 0px; padding-bottom: 0px; text-align: left; letter-spacing: 0px; color: #dd0000; }
</style>
