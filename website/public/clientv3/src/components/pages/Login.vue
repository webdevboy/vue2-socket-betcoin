<template>
	<!-- Login section -->
	<div id="main-wrapper">
		<section id="wrapper" class="login-register">
			<div class="login-box card">
				<div class="card-block">
				<form class="form" id="loginform" action="#" method="post" data-vv-scope="login-form">
					<router-link class="text-center p-b-20 db" to="/index" replace><img src="/static/img/site-logo-white.png" width="80%" alt="Home" /></router-link>
					
					<div class="alert alert-danger" v-if="loginErrorMsg != ''"> <i class="ti-user"></i> {{ loginErrorMsg }}
					</div>					

					<div v-bind:class="{ 'form-group' : true, 'has-danger': errors.has('login-form.loginEmail') }">
						<label class="control-label">Email</label>
						<div class="input-group">
							<div class="input-group-addon"><i class="ti-email"></i></div>
							<input type="email" name="loginEmail" v-model="loginEmail" v-validate="'required|email'" data-vv-as="email" placeholder="Email address" class="form-control">
						</div>
						<small class="form-control-feedback" v-if="errors.has('login-form.loginEmail')">
							{{ errors.first('login-form.loginEmail') }}
						</small>
					</div>

					<div v-bind:class="{ 'form-group' : true, 'has-danger': errors.has('login-form.loginPassword') }">
						<label class="control-label">Password</label>
						<div class="input-group">
							<div class="input-group-addon"><i class="ti-lock"></i></div>
							<input type="password" name="loginPassword" v-model="loginPassword" v-validate="'required'" data-vv-as="password" placeholder="Password" class="form-control">
						</div>
						<small class="form-control-feedback" v-if="errors.has('login-form.loginPassword')">
							{{ errors.first('login-form.loginPassword') }}
						</small>
					</div>

					<div class="form-group">
						<div class="col-md-12">
							<a href="#" v-on:click="modalForgotPassword" class="text-dark pull-right"><i class="fa fa-lock m-r-5"></i> Forgot password?</a>
						</div>
					</div>

					<div class="form-group text-center m-t-20">
						<div class="col-xs-12">
							<button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit" v-on:click="onLogin" v-bind:disabled="isWaitingState()">
								LOGIN NOW
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoggingIn"></i>
							</button>
						</div>
					</div>

					<div class="form-group m-b-0">
					<div class="col-m-12 text-center">
						<p>Don't have an account? <router-link class="text-warning m-l-5" to="/register" replace><i class="mdi mdi-account-plus"></i> <b>Register</b></router-link></p>
					</div>
					</div>
				</form>
				</div>
				<!--
                    <div class="modal-footer" style="padding:0 100px">
                        <div class="row">
                            <div class="col-md-5">
                                <p style="line-height: 35px;">OR LOGIN WITH</p>
                            </div>
                            <div class="col-md-7">
                                <g-signin-button
                                    :params="googleSignInParams"
                                    v-on:success="onGoogleSignInSuccess"
                                    v-on:error="onGoogleSignInError"
                                    class="button-go"
                                    v-bind:disabled="isWaitingState()">
                                    Google +
                                    <i class="fa fa-btn fa-spinner fa-spin" v-if="isGoogleLogin"></i>
                                </g-signin-button>
                            </div>
                        </div>
                    </div> 
                -->
			</div>
		</section>

		<!-- VERIFICATION CODE DIALOG MODAL -->
		<div class="modal fade" id="dlg-verificationcode" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="exampleModalLabel1">Please enter the verification code</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<div class="alert alert-warning" v-if="verifyCodeErrorMsg != ''">
							<h3 class="text-success"><i class="fa fa-check-circle"></i> Success</h3>
							<div class="message-contents">
								{{ verifyCodeErrorMsg }}
							</div>
						</div>
						<form action="#" method="post" class="inlog-form" data-vv-scope="verificationcode-form">
							<div class="form-group">
								<input type="text" name="verificationCode" v-model="verificationCode" v-validate="'required|digits:6'" data-vv-as="verification code" class="submit-inlog" placeholder="Verification code">
								<p class="vv-invalid" v-if="errors.has('verificationcode-form.verificationCode')"> 
									{{ errors.first('verificationcode-form.verificationCode') }} 
								</p>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" v-on:click="onVerifyCode" v-bind:disabled="isVerifyingCode" class="btn btn-primary">
							Verify Code
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isVerifyingCode"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
        <!-- end VERIFICATION CODE -->

		<!-- FORGOT PASSWORD DIALOG MODAL -->
		<div class="modal fade" id="dlg-forgotpwd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="exampleModalLabel1">Please enter your email address</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<div class="alert alert-warning" v-if="verifyEmailErrorMsg != ''">
							<h3 class="text-warning"><i class="fa fa-exclamation-triangle"></i> Warning</h3>
							<div class="message-contents">
								{{ verifyEmailErrorMsg }}
							</div>
						</div>
						<form action="#" method="post" data-vv-scope="forgotpwd-form">
							<div v-bind:class="{ 'form-group' : true, 'has-danger': errors.has('forgotpwd-form.forgotpwdEmail') }">
								<label class="control-label">Email</label>
								<div class="input-group">
									<div class="input-group-addon"><i class="ti-email"></i></div>
									<input type="email" name="forgotpwdEmail" v-model="forgotpwdEmail" v-validate="'required|email'" data-vv-as="email" placeholder="Email address" class="form-control">
								</div>
								<small class="form-control-feedback" v-if="errors.has('forgotpwd-form.forgotpwdEmail')">
									{{ errors.first('forgotpwd-form.forgotpwdEmail') }}
								</small>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="submit" v-on:click="onForgotPassword" v-bind:disabled="isVerifyingEmail" class="btn btn-info">
							Send
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isVerifyingEmail"></i>
						</button>
					</div>
				</div>
			</div>
		</div>      
        <!-- end FORGOT PASSWORD -->
	</div>
	<!-- end Login section -->
</template>

<script>
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
import router from '../../router'

export default {
	name: 'login',
	components: {
	},
	data: function () {
		return {
			//variables for Login form
            loginEmail: '',
            loginPassword: '',
            isLoggingIn: false,
            loginErrorMsg: '',

			//variables for Verification code form
            verificationCode: '',
            isVerifyingCode: false,
            verifyCodeErrorMsg: '',

			//variables for Forgot Password form
            forgotpwdEmail: '',
            isVerifyingEmail: false,
            verifyEmailErrorMsg: '',

			//variables for google login
            isGoogleLogin: false
		}
	},
	methods: {
		//Check if it is "busy" state.
        isWaitingState() {
            return (this.isLoggingIn || this.isGoogleLogin)
        },
		initLogin: function() {
            if (event) event.preventDefault()
            this.loginEmail = ''
            this.loginPassword = ''
            this.loginErrorMsg = ''
            this.errors.clear('login-form')
            if(this.isAuthenticated())
                router.replace( { path: "/dashboard" } )
        },
		onLogin: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('login-form').then(()=>{
                this.isLoggingIn = true
                this.$socket.emit("security/login", {
                    method : "post", 
                    email: this.loginEmail, 
                    password: this.loginPassword
                });
            }).catch(()=>{

            });
        },
        onVerifyCode: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('verificationcode-form').then(()=>{
                this.isVerifyingCode = true
                this.$socket.emit("security/verifyCode", {
                    method : "post", 
                    email: this.loginEmail, 
                    verificationCode: this.verificationCode
                });
            }).catch(()=>{

            });
        },
        modalForgotPassword: function(event) {
            if (event) event.preventDefault()
            this.forgotpwdEmail = ''
            this.verifyEmailErrorMsg = ''
			this.errors.clear('forgotpwd-form')
            setTimeout(function() {
                $('#dlg-forgotpwd').modal('show')  
            }, 500)
        },
        onForgotPassword: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('forgotpwd-form').then(v=>{
				if (v) {
					this.isVerifyingEmail = true
					this.$socket.emit("users/forgotPassword", {
						method : "post", 
						email: this.forgotpwdEmail
					});
				}
            }).catch(()=>{

            });
        }
	},
	sockets: {
        "security/login": function(val) {
            console.log(val)
            if (val.body.user) {
                if(val.body.user.need2FA) {
                    setTimeout(function() {
                        this.isVerifyingCode = false
                        this.verifyCodeErrorMsg = ''
                        this.verificationCode = ''
                        $('#dlg-verificationcode').modal('show')
					}, 500) 
                }
                else {
                    this.saveSession(val.body.user, 3);
                    router.replace( { path: "/dashboard" } );
                }
			} else {
                this.loginErrorMsg = 'Email address or password is not correct!'
            }
            this.isLoggingIn = false
        },
        "users/forgotPassword": function(val) {
            console.log("forgotPassword", val)
            if (val.body.err) {
                this.verifyEmailErrorMsg = val.body.err
            } else {
                this.verifyEmailErrorMsg = "Verification email has been sent to your email address."
                setTimeout(function() {
                    $('#dlg-forgotpwd').modal('hide')
                }, 2000)
            }
            this.isVerifyingEmail = false
        },
		"security/verifyCode": function(val) {
            if(val.body.user) {
                this.saveSession(val.body.user, 3);
                $('#dlg-verificationcode').modal('hide');
                router.replace( { path: "/dashboard" } );
            } else {
                this.verifyCodeErrorMsg = val.body.err
            }
            this.isVerifyingCode = false
        }
    },
	created: function() {
		this.initLogin();
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
	#main-wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
	}
	.login-register{
		display: flex;
		align-items: center;
		background-color: rgba(6, 148, 216, 0.8);
	}
	.login-box {
		 background-color: #027cbb;
		 border: 1px solid #0d72a7;;
		 color: white;
	}
	.login-box .input-group-addon { border: 1px solid #cfd2d2; }
	.login-box input{ border: 1px solid #cfd2d2; }
	.close{ color: black; }
	.modal-content form { padding: 0; }
	.modal-content .modal-header{
		border-bottom: 1px solid #eceeef;
	}
	.modal-content .modal-body{
		border-bottom: 1px solid #eceeef;
	}
</style>
