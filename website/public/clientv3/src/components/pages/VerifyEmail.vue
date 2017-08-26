
<template>
	<div id="verify-email">
		<!-- GUESTS HEADER section -->
	  	<div class="row bckffc-hero">
			<guests-header></guests-header>
		</div>
		<!-- end GUESTS HEADER section -->
		<div class="form-gap">
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-md-offset-4">
		            <div class="panel panel-default">
		              	<div class="panel-body">
		                	<div class="text-center">
								<h3><i class="fa fa-envelope fa-4x"></i></h3>
								<h2 class="text-center">
									{{stateTitle}}
									<i class="fa fa-btn fa-spinner fa-spin" v-if="isVerifying"></i>
								</h2>
								<div class="panel-body">
									<p>{{stateDescription}}</p>
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
import Footer from "../footers/Footer.vue"
import router from '../../router'

export default {
	name: 'reset-password',
	components: {
		guestsHeader: GuestsHeader,
		homeFooter: Footer,
	},
	data: function() {
		return {
			userGUID: this.$route.params.guid,
			isVerifying: true,
			stateTitle: 'Verifying your email ...',
			stateDescription: 'This will take a few second. Please wait a moment to complete this process.',
		}
	},
	created: function() {
		this.$socket.emit("users/verifyEmail", {
			method: "post", 
			userGUID: this.userGUID
		});
	},
	sockets: {
		"users/verifyEmail": function(val) {
			this.isVerifying = false
			if(val.body.err == null) {
				this.stateTitle = "Your email has been verified."
				this.stateDescription = "Your email has been verified. You will be redirected to Chratos home page after 3 seconds."
			} else {
				this.stateTitle = "Email verification has been failed."
				this.stateDescription = "It seems like you have entered wrong verification url. Please confirm your email again."
			}
			setTimeout(function() {
				router.replace({path: '/index'})
			}, 3000)
		}
	}
}
</script>

<style scoped>
	.form-gap { height: 150px; }
	.footer-area { position: fixed; left: 0px; bottom: 0px; width: 100%; }
</style>
