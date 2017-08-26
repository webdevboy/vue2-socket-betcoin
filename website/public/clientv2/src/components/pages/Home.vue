
<template>
	<!-- HOME section -->
	<div id='home'>
		<!-- HOME HEADER section -->
		<home-header></home-header>
		<!-- end HOME HEADER section -->

		<!-- INTRO section-->
		<div class="row intro-section">
			<div class="container">
				<h1>Passive income assets for the benefit of humanity. </h1>
				<h3>We create passive income assets for the benefit of humanity that is paid out live, like cryptocurrency mining.  Chratos benefits humanity by investing in things like clean energy and water.</h3>
			</div>
		</div>
		<!-- end INTRO section-->

		<!-- ATTRIBUTE section-->
		<div class="row attribute-section">
			<div class="container">
				<div class="col-md-6">
					<div class="col-md-12">
						<div class="col-md-3 att-icon"><img src="/static/img/icon-att1.png" alt="" /></div>
						<div class="col-md-9">
							<h3>LIVE INCOME EVERYWHERE</h3>
							<p>
							All of our earnings company-wide are being monitored and every time our wallet receives a payment, you will get your share. 
							</p>
						</div>
					</div>

					<div class="col-md-12">
						<div class="col-md-3 att-icon"><img src="/static/img/icon-att2.png" alt="" /></div>
						<div class="col-md-9">
							<h3>SAFE AND SECURE</h3>
							<p>Our platform is built on by top-notch developers and uses SSL, blockchain technology and other systems to secure your cryptocurrency funds.</p>
							
						</div>
					</div>
				</div>

				<div class="col-md-6">
					<div class="col-md-12">
						<div class="col-md-3 att-icon"><img src="/static/img/icon-att3.png" alt="" /></div>
						<div class="col-md-9">
							<h3>PASSIVE INCOME ASSETS</h3>
							<p>A portion of your earnings are automatically used to create more passive income assets, so as we grow, your income grows with it.</p>
						</div>
					</div>

					<div class="col-md-12">
						<div class="col-md-3 att-icon"><img src="/static/img/icon-att4.png" alt="" /></div>
						<div class="col-md-9">
							<h3>CRYPTOCURRENCY PAYMENT</h3>
							<p>Your earnings are distributed live through blockchain technology. You have control over your funds that no one else can touch. </p>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!-- end ATTRIBUTE section-->

		<!-- BUY section-->
		<div class="row buy-section">
			<div class="container">
				<h1>Get started right now and buy Chratos tokens today! </h1>
				<h3><a class="open-Dialog" data-toggle="modal" href="#dlg-register" data-title="" data-url="" v-on:click="modalRegister"> Click Here to Register </a> Register with and create your passive income stream today. </h3>
			</div>
		</div>
		<!-- end BUY section -->
		<!-- SLACK section-->
		<div class="row slack-section">
			<div class="container">
				<div class="col-md-6 content-about">
					<h3>You receive the best support <br/>from real users</h3>
					<p>
						The Chratos community makes sure new ideas spring to life and answer questions from new users. Anyone can sign up for the Chratos Slack to ask questions, propose ideas or meet new people within the Chratos community.
					</p>   
					<div class="social-box">
						<h4>We can also be found on:</h4>
						<div class="channels-options">
							<a href="https://twitter.com/chratos" class="target=&quot;_blank&quot;">twitter.com/chratos</a><br>
							<a href="https://facebook.com/chratos" target="_blank">facebook.com/chratos</a><br>
							<a href="http://www.meetup.com/chratos" target="_blank">meetup.com/chratos</a><br>
							<a href="https://medium.com/@chratos" target="_blank">medium.com/@chratos</a><br>
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
			this.$validator.validateAll('slack-form').then(() => {
				this.isInvitingToSlack = true
				this.$socket.emit("users/inviteToSlack", { 
					method: "post", 
					email: this.email 
				});
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
</style>
