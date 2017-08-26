// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import VeeValidate from 'vee-validate'

import App from './App'
import router from './router'

const eventHub = new Vue()

Vue.config.productionTip = false
//Redirect if protocol is http
if(window.location.protocol == 'http:' && window.location.host == 'chratos.io')
	window.location.href = "https://chratos.io"
//Init Socket url and ports
//Vue.use(VueSocketio, window.location.origin)
Vue.use(VueSocketio, "http://localhost:8010")
Vue.use(VeeValidate)


Vue.mixin({
	data: function() {
		return {
			eventHub: eventHub,
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
		isAuthenticated() {
			if(localStorage.getItem('state'))
				return true
			return false
		},
		checkPermission: function() {
			var needAuthenticate = true
			var path = this.$route.path
			var allowedPaths = ['/login', '/signup']
			//Check if the uri is in allowedPaths.
			if(allowedPaths.indexOf(path) >= 0)
				needAuthenticate = false
			if(!needAuthenticate)
				return true
			if(! this.isAuthenticated()) {
				router.replace({path: "/"})
				return false
			}
			return true
		},
		saveSession(user, state) {
			localStorage.setItem('state', state)
			localStorage.setItem('userGUID', user.userGUID ? user.userGUID : '')
			localStorage.setItem('firstName', user.firstName)
			localStorage.setItem('lastName', user.lastName)
		},
        logout: function(event) {
            if (event) event.preventDefault()
            this.$socket.emit("security/logout", {method : "post"})
        },
		clearSession() {
			localStorage.clear()
		},
		fromSatoshi(number) {
			return number / 100000000.0
		},
		convertToCurrency(number, currency) {
			return this.fromSatoshi(number).toFixed(8).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency
		},
		dateToString(date) {
			if( (typeof date == "undefined") || (date == '') )
				return ''
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
