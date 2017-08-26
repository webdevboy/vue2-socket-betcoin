
<template>
    <!-- HOME HEADER section -->
    <div id="home-header">

        <!-- HOME HEADER BODY section-->
        <div class="row main-hero">
            <!-- HOME HEADER LOGO section  -->
            <div class="row header-area">
                <div class="container">
                    <div class="col-md-4 logo-area">
                        <img src="static/img/site-logo.png" alt="" />
                    </div>
                    <div class="col-md-8 menu-area">
                        <ul>
                            <li><a class="open-Dialog" data-toggle="modal" href="#dlg-login" data-title="" data-url="" v-on:click="modalLogin"> Login </a></li>
                            <!---<li> <a class="open-Dialog" data-toggle="modal" href="#dlg-register" data-title="" data-url="" v-on:click="modalRegister"> Register </a></li>-->
                            <li><router-link to="/register" replace>Register</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- end HOME HEADER LOGO section -->

            <!-- HOME HEADER SIGN UP section  -->
            <div class="container">
                <h1>PASSIVE INCOME FOR EVERYONE</h1>
                <h3>Chratos is a legendary project that is helping people worldwide to have "enough". </h3>

                <div class="signup-form">
                    <form action="#" method="post" class="subscribe-form" data-vv-scope="signup-form">
                        <input type="email" name="suEmail" v-model="suEmail" v-validate="'required|email'" data-vv-as="email" data-vv-validate-on="none" v-on:keydown="signUpErrorMsg = '';errors.clear('signup-form');" class="subscribe-input" placeholder="Enter your email" >
                        <p class="vv-invalid" v-if="errors.has('signup-form.suEmail')"> 
                            {{ errors.first('signup-form.suEmail') }} 
                        </p>
                        <p class="vv-invalid" v-if="signUpErrorMsg != ''">
                            {{ signUpErrorMsg }}
                        </p>
                        <button type="submit" class="subscribe-submit" v-on:click="onSignUpWithEmail" v-bind:disabled="isWaitingState()">
                            Sign up
                            <i class="fa fa-btn fa-spinner fa-spin" v-if="isSigningUpEmail"></i>
                        </button>
                    </form>
                </div>
            </div>
            <!-- end HOME HEADER SIGN UP section  -->
        </div>
        <!-- end HOME HEADER BODY section -->

        <!-- MODAL LOGIN -->
        <div class="modal fade wbr-login" id="dlg-login" tabindex="-1" role="basic" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>

                        
                        <h4 class="modal-title">Please login here</h4>
                        <p>Chratos is a legendary project that is helping people<br/> worldwide have "enough".</p>
                        
                        <div class="alert-error" v-if="loginErrorMsg != ''">
                            {{ loginErrorMsg }}
                        </div>

                        <form action="#" method="post" class="inlog-form" data-vv-scope="login-form">
                            <input type="email" name="loginEmail" v-model="loginEmail" v-validate="'required|email'" data-vv-as="email" class="submit-inlog" placeholder="Email address">
                            <p class="vv-invalid" v-if="errors.has('login-form.loginEmail')"> 
                                {{ errors.first('login-form.loginEmail') }} 
                            </p>
                            <input type="password" name="loginPassword" v-model="loginPassword" v-validate="'required'" data-vv-as="password" class="submit-inlog" placeholder="Password">
                            <p class="vv-invalid" v-if="errors.has('login-form.loginPassword')"> 
                                {{ errors.first('login-form.loginPassword') }} 
                            </p>
                            <button type="submit" v-on:click="onLogin" v-bind:disabled="isWaitingState()" class="button-inlog">
                                Login Now
                                <i class="fa fa-btn fa-spinner fa-spin" v-if="isLoggingIn"></i>
                            </button>
                            <div class="div-forgotpwd text-right">
                                <a href="#" v-on:click="modalForgotPassword" class="btn-forgotpwd"> Forgot password? </a>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
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
                </div>
            </div>
        </div>
        <!-- end MODAL LOGIN -->

        <!-- VERIFICATION CODE DIALOG MODAL -->
        <div class="modal fade wbr-login" id="dlg-verificationcode" tabindex="-1" role="basic" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>

                        
                        <h4 class="modal-title">Please enter the verification code</h4>
                        
                        <div class="alert-error" v-if="verifyCodeErrorMsg != ''">
                            {{ verifyCodeErrorMsg }}
                        </div>

                        <form action="#" method="post" class="inlog-form" data-vv-scope="verificationcode-form">
                            <input type="text" name="verificationCode" v-model="verificationCode" v-validate="'required|digits:6'" data-vv-as="verification code" class="submit-inlog" placeholder="Verification code">
                            <p class="vv-invalid" v-if="errors.has('verificationcode-form.verificationCode')"> 
                                {{ errors.first('verificationcode-form.verificationCode') }} 
                            </p>
                            <button type="submit" v-on:click="onVerifyCode" v-bind:disabled="isVerifyingCode" class="button-inlog">
                                Verify Code
                                <i class="fa fa-btn fa-spinner fa-spin" v-if="isVerifyingCode"></i>
                            </button>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>        
        <!-- end VERIFICATION CODE -->

        <!-- FORGOT PASSWORD DIALOG MODAL -->
        <div class="modal fade wbr-login" id="dlg-forgotpwd" tabindex="-1" role="basic" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>

                        
                        <h4 class="modal-title">Please enter your email address</h4>
                        
                        <div class="alert-error" v-if="verifyEmailErrorMsg != ''">
                            {{ verifyEmailErrorMsg }}
                        </div>

                        <form action="#" method="post" class="inlog-form" data-vv-scope="forgotpwd-form">
                            <input type="email" name="forgotpwdEmail" v-model="forgotpwdEmail" v-validate="'required|email'" data-vv-as="email" class="submit-inlog" placeholder="E-mail">
                            <p class="vv-invalid" v-if="errors.has('forgotpwd-form.forgotpwdEmail')"> 
                                {{ errors.first('forgotpwd-form.forgotpwdEmail') }} 
                            </p>
                            <button type="submit" v-on:click="onForgotPassword" v-bind:disabled="isVerifyingEmail" class="button-inlog">
                                Send
                                <i class="fa fa-btn fa-spinner fa-spin" v-if="isVerifyingEmail"></i>
                            </button>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>        
        <!-- end FORGOT PASSWORD -->

        <!-- MODAL REGISTER -->
        <div class="modal fade wbr-login" id="dlg-register" tabindex="-1" role="basic" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
                        <h4 class="modal-title">Please register here</h4>
                        <p>Chratos is the world's most popular way to <br/>buy and sell bitcoin and ethereum</p>

                        <div class="alert-error" v-if="registerErrorMsg != ''">
                            {{ registerErrorMsg }}
                        </div>

                        <form action="#" method="post" class="inlog-form" data-vv-scope="register-form">
                            <div class="text-left">
                                <input type="text" name="regFirstName" v-model="regFirstName" class="submit-inlog half-width" placeholder="First Name" >
                                <input type="text" name="regLastName" v-model="regLastName" class="submit-inlog half-width" placeholder="Last name" >
                            </div>
                            
                            <input type="text" v-model="regNickName" class="submit-inlog" placeholder="Nick Name" >

                            <input type="email" name="regEmail" v-model="regEmail" v-validate="'required|email'" data-vv-as="email" class="submit-inlog" placeholder="Email address" >
                            <p class="vv-invalid" v-if="errors.has('register-form.regEmail')"> 
                                {{ errors.first('register-form.regEmail') }} 
                            </p>

                            <input type="text" name="regNlgReceivingAddress" v-model="regNlgReceivingAddress" v-validate="'required'" data-vv-as="Nlg receiving address " class="submit-inlog" placeholder="NLG receiving address" >
                            <p class="vv-invalid" v-if="errors.has('register-form.regNlgReceivingAddress')"> 
                                {{ errors.first('register-form.regNlgReceivingAddress') }} 
                            </p>

                            <input type="password" name="regPassword" v-model="regPassword" v-validate="'required|min:6'" data-vv-as="password" class="submit-inlog" placeholder="Password" >
                            <p class="vv-invalid" v-if="errors.has('register-form.regPassword')"> 
                                {{ errors.first('register-form.regPassword') }} 
                            </p>
                            <input type="password" name="regConfirmPassword" v-validate="'required|min:6|confirmed:regPassword'" data-vv-as="confirm password" class="submit-inlog" placeholder="Confirm Password" >
                            <p class="vv-invalid" v-if="errors.has('register-form.regConfirmPassword')"> 
                                {{ errors.first('register-form.regConfirmPassword') }} 
                            </p>

                            <!-- <div style="text-align: left; margin-top: 15px;">
                                <input type="checkbox" id="need-2fa" v-model="need2FA"/> 
                                <label for="need-2fa" style="font-weight: 400;">Enable 2FA</label>
                            </div> -->

                            <button type="submit" v-on:click="onRegister" v-bind:disabled="isWaitingState()" class="button-inlog">
                                Register Now
                                <i class="fa fa-btn fa-spinner fa-spin" v-if="isRegistering"></i>
                            </button>
                        </form>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        <!-- end MODAL REGISTER -->

    </div>
    <!-- end HOME HEADER section -->
</template>

<script>
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
import router from '../../router'

export default {
    name: 'home-header',
    // components: {
    //     gSigninButton: GSignInButton
    //     //'g-signin-button': GSignInButton
    // },
    data: function() {
        return {
            //variables for SignUp with email form
            suEmail: '',

            isSigningUpEmail: false,
            signUpErrorMsg: '',
            //variables for Register form
            regFirstName: '',
            regLastName: '',
            regNickName: '',
            regNlgReceivingAddress: '',
            regEmail: '',
            regPassword: '',
            need2FA: false,

            isRegistering: false,
            registerErrorMsg: '',
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
            isGoogleLogin: false,
        }
    },
    methods: {
        //Check if it is "busy" state.
        isWaitingState() {
            return (this.isSigningUpEmail || this.isRegistering || this.isLoggingIn || this.isGoogleLogin)
        },
        //event handlers called before modal dialogs pop up.
        modalRegister: function() {
            if (event) event.preventDefault()
            this.regFirstName = ''
            this.regLastName = ''
            this.regEmail = ''
            this.regPassword = ''
            this.need2FA = false
            this.registerErrorMsg = ''
            this.errors.clear('register-form')
        },
        modalLogin: function() {
            if (event) event.preventDefault()
            this.loginEmail = ''
            this.loginPassword = ''
            this.loginErrorMsg = ''
            this.errors.clear('login-form')
            if(this.isAuthenticated())
                router.replace( { path: "/dashboard" } )
        },
        modalForgotPassword: function(event) {
            if (event) event.preventDefault()
            this.forgotpwdEmail = ''
            this.verifyEmailErrorMsg = ''
            $('#dlg-login').modal('hide')
            setTimeout(function() {
                $('#dlg-forgotpwd').modal('show')  
            }, 500)
        },
        //event handlers of clicking buttons
        onSignUpWithEmail: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('signup-form').then(()=>{
                this.isSigningUpEmail = true
                var referrer = this.$route.params.ref
                if(!referrer)
                    referrer = 'admin'
                this.$socket.emit("users/signUpWithEmail", {
                    method : "post", 
                    email: this.suEmail, 
                    referrer: referrer
                });
            }).catch(()=>{

            });
        },
        onRegister: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('register-form').then(()=>{
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
            }).catch(()=>{

            });
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
        onForgotPassword: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('forgotpwd-form').then(()=>{
                this.isVerifyingEmail = true
                this.$socket.emit("users/forgotPassword", {
                    method : "post", 
                    email: this.forgotpwdEmail
                });
            }).catch(()=>{

            });
        },
        onGoogleSignInSuccess: function(event) {
            this.isGoogleLogin = true
            var firstName = event.w3.ofa
            var lastName = event.w3.wea
            var email = event.w3.U3
            var referrer = this.$route.params.ref
            if(!referrer)
                referrer = 'admin'
            this.$socket.emit("security/loginWithGoogleAccount", {
                method : "post", 
                email: email, 
                firstName: firstName, 
                lastName: lastName, 
                referrer: referrer
            });
        },
        onGoogleSignInError: function(event) {
            this.loginErrorMsg = 'Invalid google account!'
            this.isGoogleLogin = false
        }
    },
    sockets: {
        "users/signUpWithEmail": function(val) {
            console.log('signUpWithEmail', val);
            if(!val.body.err) {
                this.saveSession(val.body.user.user, 1);
                router.replace( { path: "/dashboard" } );
            } else {
                this.signUpErrorMsg = "This email address is already used by another user!"
            }
            this.isSigningUpEmail = false
        },
        "users/registerUser": function(val) {
            console.log('registerUser', val);
            if (!val.body.err) {
                this.saveSession(val.body.user.user, 2);
                $('#dlg-register').modal('hide');
                router.replace( { path: "/dashboard" } );
            } else {
                this.registerErrorMsg = val.body.err
            }
            this.isRegistering = false
        },
        "security/login": function(val) {
            console.log(val)
            if (val.body.user) {
                $('#dlg-login').modal('hide');
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
            console.log(val)
            if(val.body.user) {
                this.saveSession(val.body.user, 3);
                $('#dlg-verificationcode').modal('hide');
                router.replace( { path: "/dashboard" } );
            } else {
                this.verifyCodeErrorMsg = val.body.err
            }
            this.isVerifyingCode = false
        },
        "security/loginWithGoogleAccount": function(val) {
            if(val.body.user.isLogin)
                this.saveSession(val.body.user.user, 3)
            else
                this.saveSession(val.body.user.user, 2)
            $('#dlg-login').modal('hide');
            router.replace( { path: "/dashboard" } )
        }
    }
}
</script>

<style scoped>
    .half-width { width: calc(50% - 2px); }
    .div-forgotpwd { margin-top: 15px; }
    .btn-forgotpwd { color: white; }
</style>
