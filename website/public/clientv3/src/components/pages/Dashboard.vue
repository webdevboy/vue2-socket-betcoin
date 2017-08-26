
<template>
	<div id="dashboard" class="fix-header logo-center">
		<div id="main-wrapper">		
			<dashboard-header></dashboard-header>
			<top-menu></top-menu>
			<div class="page-wrapper">
			 	<div class="container-fluid">
					<router-view></router-view>
				</div>
			</div>
			<dashboard-footer></dashboard-footer>
		</div>
	</div>
</template>

<script>
import DashboardHeader from "../headers/DashboardHeader.vue"
import TopMenu from "../headers/TopMenu.vue"
import Footer from "../footers/Footer.vue"
import router from '../../router'

export default {
	name: 'dashboard',
	components: {
		dashboardHeader: DashboardHeader,
		dashboardFooter: Footer,
		topMenu: TopMenu
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
				swal("Server Connection Error!")
			}
		}
	},
	mounted: function(){
		$(function () {
			$(".preloader").fadeOut();
		});
		// this is for close icon when navigation open in mobile view
		$(".nav-toggler").click(function () {
			$("body").toggleClass("show-sidebar");
			$(".nav-toggler i").toggleClass("ti-menu");
			$(".nav-toggler i").addClass("ti-close");
		});

		$("#range_02").ionRangeSlider({
			min: 1,
			max: 5000,
			from: 1
		});
	}
} 
</script>

<style scoped>
	.main-container { width: 100%; }
	.page-wrapper { padding-top: 120px; }
	.dashboard-body { padding-top: 80px; background-color: #fafafa; padding-left: 30px; padding-right: 30px; }
	@media only screen and (max-width: 500px) {
		.page-wrapper { padding-top: 60px; }
	}

</style>