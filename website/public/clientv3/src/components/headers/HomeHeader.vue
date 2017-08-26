
<template>
    <!-- HOME HEADER section -->
    <div id="home-header">
    <!-- HOME HEADER BODY section-->
        <div class="row main-hero">
            <header class="topheader full-width" id="top">
                <div class="fix-width">
                    <nav class="navbar navbar-toggleable-md navbar-light p-l-0">
                        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
                        <!-- Logo will be here -->
                        <a class="navbar-brand" href="#">
                            <img class="navbar-logo" src="/static/img/site-logo-blue.png" width="90px" alt="" />
                        </a>
                        <!-- This is the navigation menu -->
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav ml-auto stylish-nav">
                                <li class="nav-item"><router-link class="nav-link" to="/about" replace><i class="mdi mdi-earth"></i> About</router-link></li>
                                <li class="nav-item"><router-link class="nav-link" to="/faq" replace><i class="mdi mdi-account-alert"></i> Support</router-link></li>
                                <li class="nav-item"><router-link class="nav-link" to="/login" replace><i class="mdi mdi-account"></i> Login</router-link> </li>
                                <li class="nav-item"><router-link class="nav-link" to="/register" replace><i class="mdi mdi-account-plus"></i> Register</router-link> </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        
            <!-- HOME HEADER SIGN UP section  -->
            <div class="container">
                <h1>PASSIVE INCOME FOR EVERYONE</h1>
                <h3>Chratos is a legendary project that is helping people worldwide to have "enough". </h3>

                <!--
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
                -->
            </div>
            <!-- end HOME HEADER SIGN UP section  -->
        </div>
        <!-- end HOME HEADER BODY section -->

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
            //variables for google login
            isGoogleLogin: false,
        }
    },
    methods: {
        //Check if it is "busy" state.
        isWaitingState() {
            return (this.isSigningUpEmail || this.isRegistering || this.isGoogleLogin)
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
        //event handlers of clicking buttons
        onSignUpWithEmail: function(event) {
            if (event) event.preventDefault()
            this.$validator.validateAll('signup-form').then(v=>{
                if ( v ) { 
                    this.isSigningUpEmail = true
                    var referrer = this.$route.params.ref
                    if(!referrer)
                        referrer = 'admin'
                    this.$socket.emit("users/signUpWithEmail", {
                        method : "post", 
                        email: this.suEmail, 
                        referrer: referrer
                    });
                }
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
    #home-header{
        background-image:url('/static/img/bg-dots.jpg'); background-size:cover; background-repeat:no-repeat;background-position:center; margin:0;
    }
    .main-hero{
        background-color: rgba(6, 148, 216, 0.8); min-height: 550px; margin: 0px;
    }
    .main-hero h1 {text-transform:uppercase; text-align:center;color:#fff; font-weight:700;letter-spacing:3px; font-size:32px;text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);}
    .main-hero h3 {text-align:center;color:#fff;font-weight:400;letter-spacing:1px; font-size:20px;line-height:28px;text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);}

    .topheader {
        background: white;
        height: 4rem;
        box-shadow: 0px 0px 20px 0px rgba(0,23,92,0.8);
    }
    .navbar {
        padding: 0px;
    }
    .navbar-toggler {
        margin-top: 0.7rem;
    }
    .navbar-collapse { z-index: 9;  }
    .navbar-brand {
        font-size: 2em;
        color: rgb(6, 148, 216);
        text-shadow: 1px 1px 0px rgba(180, 148, 216, 1);
        font-weight: 700;
        height: 4rem;
        line-height: 3.2rem;
    }
    .navbar-brand:hover { color: rgb(6, 148, 216); }
    .nav-item > a.nav-link {
        color: rgb(17, 77, 130); 
        font-weight: 400;
        text-shadow: 1px 0px 0px rgba(121, 121, 121, 1);
        padding: 1rem;
    }
    .nav-item > a.nav-link:hover { color: rgba(6, 148, 216, 1); }
</style>
