
<template>
	<!-- TRADE section -->
	<div id="trade">
		<!-- TRADE HEADER section-->
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">Trade</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Trade</li>
				</ol>
			</div>
		</div>
		<!-- end TRADE HEADER section -->

		<!-- TRADE BODY section-->
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title"><i class="fa fa-recycle"></i> Send CHR to other users <i class="fa fa-btn fa-spinner fa-spin" v-if="isBusy"></i></h3>

						<div class="row p-t-10 p-b-10">
							<div class="col-md-8 offset-md-2">
								<div class="form-group row">
									<label class="control-label col-md-5"><strong>Available CHR: </strong></label>
									<div class="col-md-7">
										{{ chrBalance }}  CHR
									</div>
								</div>
							</div>
						</div>
						<div class="row p-t-10 p-b-10">
							<div class="col-md-8 offset-md-2">
								<div class="form-group row">
									<label class="control-label col-md-5"><strong>Receiver's email address or id: </strong></label>
									<div class="col-md-7">
										<input type="text" class="form-control" name="receiver" v-model="receiver" v-on:keydown="isValidReceiver=true" v-validate="'required'" data-vv-as="receiver's address" />
										<span class="vv-invalid" v-if="errors.has('deposit-form.receiver')"> 
											{{ errors.first('deposit-form.receiver') }} 
										</span>
										<span class="vv-invalid" v-if="!isValidReceiver"> 
											This receiver is not registered in Chratos.
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="row p-t-10 p-b-10">
							<div class="col-md-8 offset-md-2">
								<div class="form-group row">
									<label class="control-label col-md-5"><strong>Remittance (CHR): </strong></label>
									<div class="col-md-7">
										<input type="text" class="form-control" name="remittance" v-model="remittance" v-on:keydown="isInsufficient=false" v-validate="'required|decimal|min_value:0.00000001'" data-vv-as="remittance" />
										<span class="vv-invalid" v-if="errors.has('deposit-form.remittance')"> 
											{{ errors.first('deposit-form.remittance') }} 
										</span>
										<span class="vv-invalid" v-if="isInsufficient"> 
											Your CHR balance is insufficient to send this remittance.
										</span>
									</div>
								</div>
							</div>
						</div>

						<div class="row justify-content-center">
							<hr class="full-width" />
							<button class="btn btn-lg btn-primary" v-on:click="onSend"> 
								<i class="fa fa-send"></i>
								Send
								<i class="fa fa-btn fa-spinner fa-spin" v-if="isSending"></i>
							</button>						
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end TRADE BODY section-->

		<!-- MODAL SEND CONFIRM section -->
		<div id="dlg-deposit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="myModalLabel">Are you sure to send {{ remittance }} CHR?</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<p>
	                    	Please confirm receiver and remittance again. </br>
	                    	If there 's something wrong, please press "X" button.
	                    </p>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" v-on:click="onConfirmDeposit" data-dismiss="modal" href="#dlg-deposit" data-title="" data-url=""> 
							Send
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isSending"></i>
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
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
	.row { margin:0px; }
	.vertical-space-15 { margin-top: 15px; margin-bottom: 15px; }
	.close{ color: black; }
	.modal-content .modal-header{
		border-bottom: 1px solid #eceeef;
	}
	.modal-content .modal-body{
		border-bottom: 1px solid #eceeef;
	}
	@media only screen and (min-width: 500px) {
		label { text-align: right; }
	}
</style>
