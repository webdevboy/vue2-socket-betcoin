
<template>
	<!-- REGISTER section -->
	<div id="register">
	  <div class="row bckffc-hero">
			<!-- HEADER section -->
			<guests-header></guests-header>
			<!-- end HEADER section -->
			
			<!-- REGISTER wizard section -->
			<div class="row register-form-container">
				<div class="register-form">
					<form-wizard @on-complete="onComplete"
							title="Please register here"
							subtitle="Chratos is the world's most popular way to buy and sell bitcoin and ethereum"
							shape="tab"
							back-button-text="back"
							next-button-text="next"
							finish-button-text="We're there"
							color="#125488">

						<tab-content title="Personal details" icon="fa fa-user-o" :before-change="validateFirstTab">
							<div class="container">
								<div class="col-md-6">
									<form action="#" method="post" data-vv-scope="register-first-form">
										<div class="text-left">
											<input type="text" name="regFirstName" v-model="regFirstName" class="submit-inlog half-width" placeholder="First Name" >
											<input type="text" name="regLastName" v-model="regLastName" class="submit-inlog half-width" placeholder="Last name" >
										</div>
										
										<input type="text" v-model="regNickName" class="submit-inlog" placeholder="Nick Name" >

										<input type="email" name="regEmail" v-model="regEmail" v-validate="'required|email'" data-vv-as="email" class="submit-inlog" placeholder="Email address" >
										<p class="vv-invalid" v-if="errors.has('register-first-form.regEmail')"> 
											{{ errors.first('register-first-form.regEmail') }} 
										</p>

										<input type="password" name="regPassword" v-model="regPassword" v-validate="'required|min:6'" data-vv-as="password" class="submit-inlog" placeholder="Password" >
										<p class="vv-invalid" v-if="errors.has('register-first-form.regPassword')"> 
											{{ errors.first('register-first-form.regPassword') }} 
										</p>

										<input type="password" name="regConfirmPassword" v-validate="'required|min:6|confirmed:regPassword'" data-vv-as="confirm password" class="submit-inlog" placeholder="Confirm Password" >
										<p class="vv-invalid" v-if="errors.has('register-first-form.regConfirmPassword')"> 
											{{ errors.first('register-first-form.regConfirmPassword') }} 
										</p>
									</form>
								</div>
								<div class="col-md-6">
									<div class="content-right">This is a content of right side.</div>
								</div>
							</div>
						</tab-content>

						<tab-content title="Payout" icon="fa fa-money" :before-change="validateSecondTab">
							<div class="container">
								<div class="col-md-6">
									<form action="#" method="post" data-vv-scope="register-second-form">
										
										<input type="text" name="regNlgReceivingAddress" v-model="regNlgReceivingAddress" v-validate="'required'" data-vv-as="Nlg receiving address " class="submit-inlog" placeholder="NLG receiving address" >
										<p class="vv-invalid" v-if="errors.has('register-second-form.regNlgReceivingAddress')"> 
											{{ errors.first('register-second-form.regNlgReceivingAddress') }} 
										</p>

									</form>
								</div>
								<div class="col-md-6">
									<div class="content-right">This is a content of right side.</div>
								</div>
							</div>
						</tab-content>

						<tab-content title="Fund" icon="fa fa-address-book">
							next step is to fund your account
						</tab-content>

						<tab-content title="Social" icon="fa fa-car">
							the last step after they fund their account is some links to share to social media
						</tab-content>

						<br /><br /><br /><br /><br />

					</form-wizard>
				</div>
			</div>
			<!-- end REGISTER wizard section -->

			<!-- FOOTER section -->
			<general-footer></general-footer>
			<!-- end FOOTER section -->
		</div>
	</div>
	<!-- end REGISTER section -->
</template>

<script>
import GuestsHeader from "../headers/GuestsHeader"
import Footer from "../footers/Footer.vue"
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

            isRegistering: false,
            registerErrorMsg: ''
		}
	},
	methods: {
		onComplete: function(){
			alert('Yes. Done!');
		},
		validateFirstTab: function() {
			var isValid = false;
			this.$validator.attach('regPassword', 'required|min:6');
			return this.$validator.validateAll('register-first-form').then(x=>{
				if(x) {
					isValid = true;
				}
				return isValid;
			});
        },
		validateSecondTab: function(event) {
            if (event) event.preventDefault();
			var isValid = false;
            return this.$validator.validateAll('register-second-form').then(x=>{
				if(x) {
					isValid = true;
				}
				return isValid;
            });
        }
	}
}
</script>

<style scoped>
	.vv-invalid {
		margin-top: 3px;
		margin-bottom: 3px;
		padding-top: 0px;
		padding-bottom: 0px;
		text-align: left;
		letter-spacing: 0px;
		color: #dd0000;
	}
	.register-form-container {
		background-color: white;
		margin: 0px;
		padding: 0px;
		min-height: 760px;
	}
	.register-form-container .register-form {
		width: 90%;
		margin: 0px auto;
		margin-top: 40px;
	}
	.half-width { width: calc(50% - 2px); }
	.register-form input {
		border: 1px solid #d6d6d6;
	}
	.content-right { 
		padding: 20px 0px;
	}
</style>
