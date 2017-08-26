
<template>
	<div id="reset-password">
	  	<div class="row bckffc-hero">
			<!-- GUESTS HEADER section -->
			<guests-header></guests-header>
			<!-- end HOME HEADER section -->
		</div>

		<div class="form-gap"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-md-offset-4">
		            <div class="panel panel-default">
		              	<div class="panel-body">
		                	<div class="text-center">
								<h3><i class="fa fa-lock fa-4x"></i></h3>
								<h2 class="text-center">Forgot Password?</h2>
								<p>You can reset your password here.</p>
								<div class="panel-body">
				                    <form id="register-form" role="form" autocomplete="off" class="form" method="post" data-vv-scope="resetpwd-form">
										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-key color-blue"></i></span>
												<input type="password" name="newPassword" placeholder="New password" class="form-control" v-model="newPassword" v-validate="'required|min:6'" data-vv-as="new password" >
											</div>
										</div>
										<p class="vv-invalid" v-if="errors.has('resetpwd-form.newPassword')"> 
				                            {{ errors.first('resetpwd-form.newPassword') }} 
				                        </p>

										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon"><i class="fa fa-key color-blue"></i></span>
												<input type="password" name="confirmPassword" placeholder="Confirm password" class="form-control" v-model="confirmPassword" v-validate="'min:6|confirmed:newPassword'" data-vv-as="confirm password" >
											</div>
										</div>
										<p class="vv-invalid" v-if="errors.has('resetpwd-form.confirmPassword')"> 
				                            {{ errors.first('resetpwd-form.confirmPassword') }} 
				                        </p>

										<div class="form-group">
											<input type="submit" class="btn btn-lg btn-primary btn-block" value="Reset Password" v-bind:disabled="isReseting" v-on:click="resetPassword">
											<i class="fa fa-btn fa-spinner fa-spin" v-if="isReseting"></i>
										</div>
										
										<div class="form-group text-red" v-if="resetPwdErrorMsg != ''">
											{{ resetPwdErrorMsg }}
										</div>
				                    </form>
				    			</div>
				    		</div>
				    	</div>
		            </div>
		        </div>
			</div>
		</div>

		<!-- FOOTER section -->
		<div class="footer-area">
			<home-footer></home-footer>
		</div>
		<!-- end FOOTER section -->
	</div>
</template>

<script>
import GuestsHeader from "../headers/GuestsHeader"
import Footer from "../footers/Footer.vue";
import router from '../../router'

export default {
	name: 'reset-password',
	components: {
		guestsHeader: GuestsHeader,
		homeFooter: Footer
	},
	data: function() {
		return {
			GUID: this.$route.params.guid,
			newPassword: '',
			confirmPassword: '',
			isReseting: false,
			resetPwdErrorMsg: ''
		}
	},
	methods: {
		resetPassword: function (event) {
			if(event) event.preventDefault()
            this.$validator.validateAll('resetpwd-form').then(()=>{
            	this.isReseting = true
            	this.resetPwdErrorMsg = ''
                this.$socket.emit("users/resetPassword", {
                	method: "post", 
                	GUID: this.GUID, 
                	password: this.newPassword
                });
            }).catch(()=>{

            });
		}
	},
	sockets: {
		"users/resetPassword": function(val) {
			if(val.body.err == null) {
				this.resetPwdErrorMsg = "Password has been changed successfully."
				setTimeout(function() {
					router.replace({path: '/index'})
				}, 2000)
			} else {
				this.resetPwdErrorMsg = val.body.err
			}
			this.isReseting = false
		}
	}
}
</script>

<style scoped>
	.form-gap { height: 150px; }
	.form .form-group { margin-bottom: 10px; }
	.form p { margin-bottom: 20px; }
	.text-red { color: #f00; }
	.footer-area { position: fixed; left: 0px; bottom: 0px; width: 100%; }
</style>
