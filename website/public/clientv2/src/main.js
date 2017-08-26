// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import VeeValidate from 'vee-validate'
import GSignInButton from 'vue-google-signin-button'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import App from './App'
import router from './router'

const eventHub = new Vue()

//Redirect if protocol is http
if(window.location.protocol == 'http:' && window.location.host == 'chratos.io') {
	window.location.href = "https://chratos.io"
}
Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(GSignInButton);
Vue.use(VueFormWizard);

//Init Socket url and ports
//Vue.use(VueSocketio, window.location.origin)
Vue.use(VueSocketio, "http://localhost:8010")

Vue.mixin({
	data: function() {
		return {
			eventHub: eventHub,
			// googleSignInParams: {
			// 	client_id: '249833386799-o0s6sgohvjv4mgnbuedojeob2ols28p9.apps.googleusercontent.com'
			// }
		}
	},
	methods: {
		isNotificationEnabled() {
			if(!("Notification" in window)) 
				return false
			if(Notification.permission != "granted")
				return false
			return true
		},
		showNotification(title, message) {
			if(this.isNotificationEnabled()) {
				var options = {
					body: message,
					icon: '/static/img/site-logo.png',
				}
				var notification = new Notification(title, options)
			}
		},
		isAuthenticated() {
			if(localStorage.getItem('state'))
				return true
			return false
		},
		checkPermission: function() {
			var needAuthenticate = true
			var path = this.$route.path
			var allowedPaths = ['/about', '/faq', '/register']
			// '/index/:ref'
			if(this.$route.params.ref)
				needAuthenticate = false
			// '/forgotpwd/:guid' , resetpassword, login
			if(this.$route.params.guid) {
				needAuthenticate = false
			}
			//Check if the uri is in allowedPaths.
			if(allowedPaths.indexOf(path) >= 0)
				needAuthenticate = false
			if(!needAuthenticate)
				return true
			if(! this.isAuthenticated()) {
				router.replace({path: "/index"})
				return false
			}
			return true
		},
		saveSession(user, state) {
			localStorage.setItem('state', state)
			localStorage.setItem('userGUID', user.userGUID ? user.userGUID : '')
			localStorage.setItem('_id', user._id ? user._id : '')
			localStorage.setItem('firstName', user.firstName ? user.firstName : '')
			localStorage.setItem('lastName', user.lastName ? user.lastName : '')
			localStorage.setItem('nickName', user.nickName ? user.nickName : '')
			localStorage.setItem('email', user.email ? user.email : '')
			localStorage.setItem('password', user.password ? user.password : '')
			localStorage.setItem('referrer', user.referrer ? user.referrer : '')
			localStorage.setItem('isGoogleAccount', user.isGoogleAccount?'true':'false')
			localStorage.setItem('need2FA', user.need2FA?'true':'false')
			localStorage.setItem('btcDepositAddress', user.btcDepositAddress ? user.btcDepositAddress : '')
			localStorage.setItem('ethDepositAddress', user.ethDepositAddress ? user.ethDepositAddress : '')
			localStorage.setItem('nlgDepositAddress', user.nlgDepositAddress ? user.nlgDepositAddress : '')
			localStorage.setItem('nlgReceivingAddress', user.nlgWithdrawAddress ? user.nlgWithdrawAddress : '')
		},
		clearSession() {
			localStorage.clear()
		},
        logout: function(event) {
            if (event) event.preventDefault()
            this.$socket.emit("security/logout", {
            	method : "post"
            })
        },
        toSatoshi(number) {
        	return parseInt(number * 100000000.0)
        },
		toNonSatoshi(number) {
			return number / 100000000.0
		},
		convertToCurrency(number, currency) {
			if(typeof number == 'undefined' || number == '' || isNaN(number))
				number = 0
			if(typeof currency == 'undefined')
				currency = ''
			return this.toNonSatoshi(number).toFixed(8).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency
		},
		convertToCurrencyWithFormat(number, currency, fixed) {
			if(typeof number == 'undefined' || number == '' || isNaN(number))
				number = 0
			if(typeof currency == 'undefined')
				currency = ''
			return this.toNonSatoshi(number).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency
		},
		dateToString(date) {
			date = '' + date
			return date.substring(0, date.length - 5).replace("T", " ")
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
