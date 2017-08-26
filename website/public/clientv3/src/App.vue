
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import router from './router'

export default {
	name: 'app',
	created: function () {
		this.$socket.emit("connection", {method: "get"})
		if(!("Notification" in window)) {
			alert("This browser does not support desktop notification!")
		} else {
			if(Notification.permission == "granted") {
			} else {
				Notification.requestPermission().then(function(result) {
					console.log("The request for desktop notification was ", result)
				})
			}
		}
	},
	sockets:{
		"connection" : function(val){
			console.log("Socket Connected!", val)
		},
		"authenticated": function(val) {
			console.log("Authenticated", val)
		},
		"unauthenticated": function(val) {
			console.log("Unauthenticated", val)
			this.clearSession()
			this.checkPermission()
		},
		"alert": function(msg) {
			this.showNotification("New message from chratos", msg)
		},
        "security/logout" : function(val) {
            if(!val.body.err) {
                this.clearSession()
                router.replace( { path: "/index" } )
            } else {
                alert("Server Connection Error!")
            }
        }
	},
	watch: {
		'$route': 'checkPermission'
	}
}
</script>

<style scoped>

</style>
