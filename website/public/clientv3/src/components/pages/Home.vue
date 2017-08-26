
<template>
	<!-- HOME section -->
	<div id='main-wrapper' >
		<!-- HOME HEADER section -->
		<home-header></home-header>
		<!-- end HOME HEADER section -->
		
		<!-- INTRO section-->
		<div class="row intro-section">
			<div class="col-md-12 fix-width">
				<div class="text-center">
					<h1>Passive income assets for the benefit of humanity. </h1>
					<h3 class="intro-subtitle">We create passive income assets for the benefit of humanity that is paid out live, like cryptocurrency mining.  Chratos benefits humanity by investing in things like clean energy and water.</h3>
					<!-- Row -->
					<div class="row m-t-4">
						<!-- .col -->
						<div class="col-lg-3 col-md-6"> <img src="/static/img/icon-att1.png" alt="" />
							<h4 class="font-500 text-center">LIVE INCOME EVERYWHERE</h4>
							<p class="text-left">All of our earnings company-wide are being monitored and every time our wallet receives a payment, you will get your share. </p>
						</div>

						<!-- /.col -->
						<!-- .col -->
						<div class="col-lg-3 col-md-6"> <img src="/static/img/icon-att2.png" alt="" />
							<h4 class="font-500 text-center">SAFE AND SECURE</h4>
							<p class="text-left">Our platform is built on by top-notch developers and uses SSL, blockchain technology and other systems to secure your cryptocurrency funds.</p>
						</div>
						<!-- /.col -->
						<!-- .col -->
						<div class="col-lg-3 col-md-6"> <img src="/static/img/icon-att3.png" alt="" />
							<h4 class="font-500 text-center">PASSIVE INCOME ASSETS</h4>
							<p class="text-left">A portion of your earnings are automatically used to create more passive income assets, so as we grow, your income grows with it.</p>
						</div>
						<!-- /.col -->
						<!-- .col -->
						<div class="col-lg-3 col-md-6"> <img src="/static/img/icon-att4.png" alt="" />
							<h4 class="font-500 text-center">CRYPTOCURRENCY PAYMENT</h4>
							<p class="text-left">Your earnings are distributed live through blockchain technology. You have control over your funds that no one else can touch. </p>
						</div>
						<!-- /.col -->						
					</div>
				</div>
			</div>
		</div>
		<!-- end INTRO section-->

		<!-- BUY section-->
		<div class="light-blue buy-section">
			<div class="col-md-12">
				<div class="text-center">
					<h1>Get started right now and buy Chratos tokens today! </h1>
					<h3><router-link class="open-Dialog"to="/register" replace> Click Here to Register </router-link> Register with and create your passive income stream today. </h3>
				</div>
			</div>
		</div>
		<!-- end BUY section -->
		
		<!-- SLACK section-->
		<div class="row slack-section">
			<div class="row fix-width">
				<div class="col-md-6 m-t-20 content-about">
					<h3>You receive the best support <br/>from real users</h3>
					<p>
						The Chratos community makes sure new ideas spring to life and answer questions from new users. Anyone can sign up for the Chratos Slack to ask questions, propose ideas or meet new people within the Chratos community.
					</p>   
					<div class="">
						<h4>We can also be found on:</h4>
						<div class="channels-options text-center">
							<a href="https://twitter.com/chratos" class="target=&quot;_blank&quot;"><i class="mdi mdi-twitter"></i></a>
							<a href="https://facebook.com/chratos" target="_blank"><i class="mdi mdi-facebook"></i></a>
							<a href="http://www.meetup.com/chratos" target="_blank"><i class="mdi mdi-gmail"></i></a>
							<a href="https://medium.com/@chratos" target="_blank"><i class="mdi mdi-medium"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-6 content-about">
					<div class="signup-form">
						<h4 class="head-slack-form"> SIGN UP FOR CHRATOS.SLACK.COM </h4>
						<form data-vv-scope="slack-form">
							<div class="form-group">
								<input type="email" name="email" v-model="email" v-validate="'required|email'" class="form-control" placeholder="Enter your Email" v-on:keydown="inviteErrorMsg = '';errors.clear('slack-form');">
								<p class="vv-invalid" v-if="errors.has('slack-form.email')"> 
									{{ errors.first('slack-form.email') }} 
								</p>                        
								<p class="vv-invalid" v-if="inviteErrorMsg != ''">
	                        		{{ inviteErrorMsg }}
	                    		</p>
							</div>
							<button v-on:click="inviteToSlack" v-bind:disabled="isInvitingToSlack">
								Sign up
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isInvitingToSlack"></i>
							</button>
						</form>
						<div class="signup-disc">
							Shortly after applying you’ll receive an invitation for <a href="#" target="_blank">chratos.slack.com</a>. Channels are moderated and maintained by the Chratos Developers. <a href="https://slack.com" target="_blank">Click here</a> or more information about Slack.
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end SLACK section -->

		<!-- HOME FOOTER section -->
		<home-footer></home-footer>
		<!-- end HOME FOOTER section -->

	</div>
	<!-- end HOME section -->
</template>

<script>
import HomeHeader from "../headers/HomeHeader.vue";
import Footer from "../footers/Footer.vue";

export default {
	name: 'home',
	components: {
		homeHeader: HomeHeader,
		homeFooter: Footer
	},
	data: function() {
		return {
			email: '',
			isInvitingToSlack: false,
			inviteErrorMsg: '',
		}
	},
	methods: {
		inviteToSlack: function (event) {
			if (event) event.preventDefault()
			this.$validator.validateAll('slack-form').then(v => {
				if (v) {
					this.isInvitingToSlack = true
					this.$socket.emit("users/inviteToSlack", { 
						method: "post", 
						email: this.email 
					});
				}
			}).catch(() => {

			});
		},
		modalRegister: function(event) {
		}
	},
	sockets: {
		"users/inviteToSlack": function (val) {
			var ret = JSON.parse(val.body.data)
			if(ret.ok) {
				this.inviteErrorMsg = 'You have been successfully invited to chratos.slack.com. Please check your mailbox.'
			} else {
				this.inviteErrorMsg = 'You have been already invited. Please check your mailbox.'
			}
			this.isInvitingToSlack = false
		}
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
	.intro-section h1 { color: rgb(19, 77, 127); }
	.intro-section h3 { color: #99abb4; }
	.buy-section { background-color: rgba(6, 148, 216, 0.8); color: white; }
	.buy-section h1 { color: white; }
	.buy-section h3 { color: white; }
	.buy-section h3 a.open-Dialog{ color: #093b67; }
	.slack-section { background-color: white; padding: 60px 0; }
</style>
