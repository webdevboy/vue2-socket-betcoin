
<template>
	<!-- ABOUT section -->
	<div id="main-wrapper">
		<!-- HEADER section -->
		<guests-header></guests-header>
		<!-- end HEADER section -->

		<!-- INTRO section-->
		
		<div class="row about-section">
			<div class="col-md-12 about-header">
				<div class="row fix-width">
					<div class="col-md-2 about-icon">
						<i class="ti-world"></i>
					</div>
					<div class="col-md-10">
						<h1>About</h1>
						<h3>CHRATOS is a project with the ultimate goal of creating “enough” for everyone, everywhere.</h3>
					</div>
				</div>
			</div>
		
		<!-- end INTRO section-->

		<!-- ABOUT 1 section-->
			<div class="row col-md-12 about-content">
				<div class="row">
					<div class="card fix-width about-card">
						<div class="row card-block">
							<div class="col-md-9">
								<h3>How was CHRATOS born? </h3>
								<p>The ultimate goal of this project is to create a world where everyone, everywhere will have enough.</p> 
								<p>CHRATOS is born from two Greek words: <br />Chronos - The Greek God of Time. (Since we are paying out live, every second in this system we are changing the world). <br />Kratos - The personification of ultimate power, strength and authority.
								</p>
								<h3>What is CHRATOS?</h3>
								<p>
									Chratos is a project that creates passive income assets and allows everyone, everywhere to become part of its projects.
								</p>
								<p>
									You can buy CHRATOS tokens that give you the right to receive a percentage of our profits live into your wallet. 
								</p>
								<p>
									Right now we have one token that represents mining power. We have $660,000 worth of cryptocurrency mining hardware that is generating profits for CHRATOS every second. Every token represents 1 MH/s of Scrypt hashing power. 

								</p>
								<p>
									With these computers we are mining the most profitable coins and automatically exchange them to Gulden (NLG).
								</p>
								<p>
								These computers are very expensive, but we’re allowing users to buy a share of even one computer, so everyone gets a chance to join. 
								</p>
								<h3>Automatic compounding system</h3>
								<p>We will automatically allocate a portion of our profits to purchasing more mining power and other assets. You will receive tokens equal to that, so your income is growing as we are growing. All done for you and you can use your paid out Guldens as you please! </p>

								<h3>Roadmap</h3>
								<p>Right now we have a mining operation and this platform, but more things are coming. Our roadmap is as follows: 
								<ol>
									<li>CHRATOS platform development</li>
									<li>CHRATOS mining operation (in full operation)</li>
									<li>CHRATOS mining pool (in development)</li>
									<li>CHRATOS cryptocurrency exchange</li>
									<li>CHRATOS cryptocurrency trading fund</li>
									<li>CHRATOS charity fund</li>
									<li>CHRATOS solar power farm</li>
									<li>CHRATOS water purification facility</li>
								</ol>
								</p>

							</div>
							<div class="col-md-3 text-center"><img src="static/img/002.png" width="150" alt="" /></div>
						</div>
					</div>
				</div>
			</div> 
		</div>
		<!-- end ABOUT 1 section-->

		<!-- SLACK section-->
		<div class="row slack-section">
			<div class="row fix-width">
				<div class="col-md-6 content-about">
					<h3>You receive the best support <br/>from real users</h3>
					<p>
						The Chratos community makes sure new ideas spring to life and answer questions from new users. Anyone can sign up for the Chratos Slack to ask questions, propose ideas or meet new people within the Chratos community.
					</p>   
					<div class="">
						<h4>We can also be found on:</h4>
						<div class="channels-options text-center">
							<a href="https://twitter.com/chratos" target="_blank"><i class="mdi mdi-twitter"></i></a>
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

		<!-- FOOTER section -->
		<general-footer></general-footer>
		<!-- end FOOTER section -->
	</div>
	<!-- end ABOUT section -->
</template>

<script>
import GuestsHeader from "../headers/GuestsHeader"
import Footer from "../footers/Footer.vue"

export default {
	name: 'about',
	components: {
		guestsHeader: GuestsHeader,
		generalFooter: Footer,
	},
	data: function () {
		return {
			email: localStorage.getItem('email'),
			isInvitingToSlack: false,
			inviteErrorMsg: '',
		}
	},
	methods: {
		inviteToSlack: function (event) {
			if (event) event.preventDefault()
			this.$validator.validateAll('slack-form').then(() => {
				if (v) {
					this.isInvitingToSlack = true
					this.$socket.emit("users/inviteToSlack", { 
						method: "post", 
						email: this.email 
					});
				}
			}).catch(() => {

			});
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
	.row { margin: 0px auto; }
	.about-section .about-header { color: #fff; padding: 50px 0px 10px 0px; min-height: 200px; background-color: rgba(6, 148, 216, 0.8); }
	.about-section .about-header h1 { color:#fff; padding-top: 10px; font-weight:700;letter-spacing:3px; font-size:32px; }
	.about-section .about-header h3 { color: #fff; }
	.about-section .about-header .about-icon{ font-size: 5em; text-align: center; font-weight: normal; color: #fff; text-shadow: 1px 1px 1px rgba(0, 0, 0, 1); }
	.about-content{ background-color: #fff; padding-top: 20px; }
	.about-content p {color: #666;}
	.about-section .card { width: 100%; background-color: #fafafa; padding: 2.25rem 0; }
	.about-section .card .card-block{ padding: 2.25rem 1rem; }
	.about-section .card h3 { color: #184e7d; }	
	.slack-section{ background-color: white; padding-bottom: 60px; }
	.slack-section p { color: #666; }
	@media only screen and (max-width: 500px) {
		.about-section .about-header { text-align: center; }
	}
</style>
