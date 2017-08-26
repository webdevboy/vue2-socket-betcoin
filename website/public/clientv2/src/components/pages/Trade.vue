
<template>
	<!-- TRADE section -->
	<div id="trade">
		<!-- TRADE HEADER section-->
		<div class="row bckffc-hero">
			<!-- INTRO section-->
			<div class="row intro-section">
				<div class="container">
					<h1>Trade</h1>
					<!-- <h3>Nullam et risus non leo venenatis scelerisque a viverra orci. <br/> Praesent a laoreet magna, vitae imperdiet ex.</h3> -->
				</div>
			</div>
			<!-- end INTRO section-->
		</div> 	
		<!-- end TRADE HEADER section -->

		<!-- TRADE BODY section-->
		<div class="row profile-section">
			<div class="container">
				<div class="col-md-2">
				</div>
		        <div class="col-md-8">
					<div class="card">
						<div class="card-header">
							<i class="fa fa-recycle"></i>
							Send CHR to other users
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isBusy"></i>
						</div>
						<div class="card-block">
							<h5> - Available CHR </h5>
							<div class="col-xs-12 margin-bottom-15">
								<span> {{ chrBalance }} CHR </span>
							</div>
							<hr class="full-width" />

							<form action="#" method="post" data-vv-scope="deposit-form">
								<h5> - Receiver's email address or id </h5>
								<div class="vertical-space-15">
									<input type="text" class="full-width margin-bottom-5" name="receiver" v-model="receiver" v-on:keydown="isValidReceiver=true" v-validate="'required'" data-vv-as="receiver's address" />
									<span class="vv-invalid" v-if="errors.has('deposit-form.receiver')"> 
			                            {{ errors.first('deposit-form.receiver') }} 
			                        </span>
									<span class="vv-invalid" v-if="!isValidReceiver"> 
			                            This receiver is not registered in Chratos.
			                        </span>
								</div>
								<h5> - Remittance (CHR) </h5>
								<div class="vertical-space-15">
									<input type="text" class="full-width margin-bottom-5" name="remittance" v-model="remittance" v-on:keydown="isInsufficient=false" v-validate="'required|decimal|min_value:0.00000001'" data-vv-as="remittance" />
									<span class="vv-invalid" v-if="errors.has('deposit-form.remittance')"> 
			                            {{ errors.first('deposit-form.remittance') }} 
			                        </span>
									<span class="vv-invalid" v-if="isInsufficient"> 
			                            Your CHR balance is insufficient to send this remittance.
			                        </span>
								</div>
							</form>
							<hr class="full-width" />

							<button class="btn btn-primary button-edit" v-on:click="onSend"> 
								<i class="fa fa-send"></i>
								Send
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isSending"></i>
							</button>
						</div>
					</div>
		        </div>
				<div class="col-md-2">
				</div>
			</div>
		</div>
		<!-- end TRADE BODY section-->

		<!-- MODAL SEND CONFIRM section -->
	    <div class="modal fade wbr-login" id="dlg-deposit" tabindex="-1" role="basic" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <div class="modal-header text-center">
	                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
	                    <h4 class="modal-title"> Are you sure to send {{ remittance }} CHR? </h4>
	                    <p></p>
	                    <p>
	                    	Please confirm receiver and remittance again. </br>
	                    	If there 's something wrong, please press "X" button.
	                    </p>
	                    <hr />

						<button class="btn btn-primary button-edit" v-on:click="onConfirmDeposit" data-toggle="modal" href="#dlg-deposit" data-title="" data-url=""> 
							Send
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isSending"></i>
						</button>
	                </div>
	                <div class="modal-footer">
	                </div>
	            </div>
	        </div>
	    </div>
	    <!-- end MODAL SEND CONFIRM section -->
	</div>
	<!-- end TRADE section -->
</template>

<script>
export default {
	name: 'buy',
	data: function() {
		return {
			//User Data
			userGUID: localStorage.getItem('userGUID'),
			userID: localStorage.getItem('_id'),
			//Invoice Info
			chrBalance: 0,
			receiver: '',
			remittance: '',
			//States
			isBusy: false,
			isSending: false,
			isValidReceiver: true,
			isInsufficient: false,
		}
	},
	created: function() {
		//Get CHR Balances
		this.getCHRBalance()
	},
	methods: {
		getCHRBalance: function() {
			this.isBusy = true
			this.$socket.emit("deposit/getAllDepositBalances", { 
				method: "post", 
				userGUID: this.userGUID 
			})
		},
		onSend: function() {
			if (event) event.preventDefault()
            this.$validator.validateAll('deposit-form').then(()=>{
            	if( this.chrBalance < parseFloat(this.remittance) ) {
            		this.isInsufficient = true
            	} else {
            		$('#dlg-deposit').modal('show')
            	}
            }).catch(() => {

            })
		},
		onConfirmDeposit: function() {
			if (event) event.preventDefault()
			this.isSending = true
			this.$socket.emit("deposit/remit", {
				method: "post",
				_id: this.userID,
				userGUID: this.userGUID,
				receiver: this.receiver,
				remittance: this.toSatoshi(this.remittance),
			})
		}
	},
	sockets: {
		"deposit/getAllDepositBalances": function(val) {
			var balances = val.body.data
			this.chrBalance = balances['CHR'] ? balances['CHR'] : 0
			this.chrBalance = this.toNonSatoshi(this.chrBalance).toFixed(8)
			this.isBusy = false
		},
		"deposit/remit": function(val) {
			var self = this
			if(val.body.err != null) {
				this.isValidReceiver = false
			}
			this.isSending = false
			setTimeout(function() {
				self.getCHRBalance()
			}, 1000)
		}
	}
} 
</script>

<style scoped>
	.vertical-space-15 { margin-top: 15px; margin-bottom: 15px; }
</style>
