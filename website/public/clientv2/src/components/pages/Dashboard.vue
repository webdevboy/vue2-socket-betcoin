
<template>
	<div id="dashboard">
		<div class="main-container">
			<div class="dashboard-header">
				<dashboard-header></dashboard-header>
			</div>
			<div class="dashboard-body">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardHeader from "../headers/DashboardHeader.vue"
import router from '../../router'

export default {
	name: 'dashboard',
	components: {
		dashboardHeader: DashboardHeader
	},
	created: function() {
		if(! this.checkPermission())
			return
		if(localStorage.getItem('state') != 3) {
			if(!localStorage.getItem('btcDepositAddress'))
				this.$socket.emit("users/createDeposits", {
					method: "post", 
					userGUID: localStorage.getItem('userGUID')
				})
		}
	},
	sockets: {
		"users/createDeposits": function(val) {
			console.log('created deposits', val)
			if(val.body.err == null) {
				var user = val.body.user
				localStorage.setItem('btcDepositAddress', user.btcDepositAddress)
				localStorage.setItem('ethDepositAddress', user.ethDepositAddress)
				localStorage.setItem('nlgDepositAddress', user.nlgDepositAddress)
			} else {
				alert("Server Connection Error!")
			}
		}
	}
} 
</script>

<style scoped>
	.main-container { width: 100%; }
	.dashboard-body { padding-top: 80px; background-color: #fafafa; padding-left: 30px; padding-right: 30px; }
</style>
