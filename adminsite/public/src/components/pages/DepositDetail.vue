
<template>
	<div id="deposit-detail">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Deposit Detail
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
	        			<router-link :to="'/dashboard/deposits'" class="nav-link d-inline-block" v-if="isUserSelected() && !isDepositSelected()">
	        				(Click here to select deposit.)
	        			</router-link>
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingDeposit"></i>
	        		</div>
	        		
	        		<div class="card-block">
	        			<form action="#" method="post" class="subscribe-form" data-vv-scope="deposit-form">
		        			<div v-if="isLoadingFinished()">

				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="userID"> User ID </label>
				        				<input type="text" id="userID" class="form-control" v-model="deposit.userID" readonly/>
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-4">
				        				<label for="currency"> Currency </label>
				        				<input type="text" id="currency" name="currency" class="form-control" v-model="deposit.currency" v-validate="'required'" data-vv-as="currency" />
					        			<p class="vv-invalid" v-if="errors.has('deposit-form.currency')"> 
					        				{{ errors.first('deposit-form.currency') }} 
				                        </p>
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="amountSatoshi"> Amount </label>
				        				<input type="text" id="amountSatoshi" name="amountSatoshi" class="form-control" v-model="deposit.amountSatoshi" v-validate="'required|decimal'" data-vv-as="amount" />
				        				<p class="vv-invalid" v-if="errors.has('deposit-form.amountSatoshi')"> 
			                                {{ errors.first('deposit-form.amountSatoshi') }} 
			                            </p>
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="netAmountSatoshi"> Net Amount </label>
				        				<input type="text" id="netAmountSatoshi" name="netAmountSatoshi" class="form-control" v-model="deposit.netAmountSatoshi" v-validate="'required|decimal'" data-vv-as="net amount" />
				        				<p class="vv-invalid" v-if="errors.has('deposit-form.netAmountSatoshi')"> 
			                                {{ errors.first('deposit-form.netAmountSatoshi') }} 
			                            </p>
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-4">
				        				<label for="convertedCurrency"> Converted Currency </label>
				        				<input type="text" id="convertedCurrency" name="convertedCurrency" class="form-control" v-model="deposit.convertedCurrency" v-validate="'required'" data-vv-as="converted currency" />
					        			<p class="vv-invalid" v-if="errors.has('deposit-form.convertedCurrency')"> 
					        				{{ errors.first('deposit-form.convertedCurrency') }} 
				                        </p>
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="convertedAmount"> Converted Amount </label>
				        				<input type="text" id="convertedAmount" name="convertedAmount" class="form-control" v-model="deposit.convertedAmount" v-validate="'required|decimal'" data-vv-as="converted amount" />
					        			<p class="vv-invalid" v-if="errors.has('deposit-form.convertedAmount')"> 
					        				{{ errors.first('deposit-form.convertedAmount') }} 
				                        </p>
				        			</div>
				        			<div class="form-group col-md-4">
				        				<label for="conversionFee"> Conversion Fee </label>
				        				<input type="text" id="conversionFee" name="conversionFee" class="form-control" v-model="deposit.conversionFee" v-validate="'required|decimal'" data-vv-as="conversion fee" />
					        			<p class="vv-invalid" v-if="errors.has('deposit-form.conversionFee')"> 
					        				{{ errors.first('deposit-form.conversionFee') }} 
				                        </p>
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="convertedOn"> Converted On </label>
				        				<input type="text" id="convertedOn" class="form-control" v-model="deposit.convertedOn" readonly />
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="transactionID"> Transaction ID </label>
				        				<input type="text" id="transactionID" class="form-control" v-model="deposit.transactionID" readonly />
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="created"> Created At </label>
				        				<input type="text" id="created" class="form-control" v-model="deposit.created" readonly />
				        			</div>
			        			</div>
				        		<div class="row">
				        			<div class="form-group col-md-12">
				        				<label for="lastUpdated"> Last Updated At </label>
				        				<input type="text" id="lastUpdated" class="form-control" v-model="deposit.lastUpdated" readonly />
				        			</div>
			        			</div>

			        		</div>
			        	</form>
		        	</div>

		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onUpdateDeposit">
		        			Update Deposit
		        			<i class="fa fa-btn fa-spinner fa-spin" v-if="isSavingDeposit"></i>
		        		</button>
		        		<button class="btn btn-danger" v-on:click="onBackToDeposits">Back to deposits list</button>
		        	</div>

	        	</div>
	        </div>
		</div>

		<modal title="Save changes" v-model="askSaveDlg" @ok="onSave()" effect="fade/zoom">
			<div slot="modal-header" class="modal-header">
				<h4 class="modal-title">Confirmation</h4>
			</div>
			Are you sure to save changes?
		</modal>
	</div>
</template>

<script>
import Modal from 'vue-strap/src/modal'
import DataTable from "../datatables/DataTable.vue"
import router from "../../router"

export default {
	name: 'deposit-detail',
	components: {
		modal: Modal,
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedUser: localStorage.getItem('selectedUser', null),
			selectedDeposit: localStorage.getItem('selectedDeposit', null),
			deposit: null,
			isLoadingDeposit: false,
			isSavingDeposit: false,
			askSaveDlg: false,
		}
	},
	created: function() {
		this.getDepositByTransactionID()
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		isDepositSelected() {
			return this.selectedDeposit ? true : false
		},
		isLoadingFinished() {
			return this.deposit ? true : false
		},
		getDepositByTransactionID: function() {
			if( !this.isUserSelected() || !this.isDepositSelected() )
				return
			this.isLoadingDeposit = true
			this.$socket.emit("deposit/getDepositByTransactionID", { 
				method: "post", 
				transactionID: this.selectedDeposit 
			})
		},
		onUpdateDeposit: function() {
            if (event) event.preventDefault()
            this.$validator.validateAll('deposit-form').then(()=>{
            	this.askSaveDlg = true
            }).catch(()=>{

            });
		},
		onSave: function() {
			this.askSaveDlg = false
			this.isSavingDeposit = true
			this.deposit.method = "post"
			this.$socket.emit("deposit/updateDeposit", this.deposit);
		},
		onBackToDeposits: function() {
			router.replace({ path: '/dashboard/deposits' })
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"deposit/getDepositByTransactionID": function(val) {
			this.deposit = val.body.data
			this.deposit.convertedOn = this.dateToString(this.deposit.convertedOn)
			this.deposit.created = this.dateToString(this.deposit.created)
			this.deposit.lastUpdated = this.dateToString(this.deposit.lastUpdated)
			this.isLoadingDeposit = false
		},
		"deposit/updateDeposit": function(val) {
			var updatedDeposit = val.body.data
			this.deposit.lastUpdated = this.dateToString(updatedDeposit.lastUpdated)
			this.isSavingDeposit = false
		}
	}
} 
</script>

<style scoped>
	.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
	.vv-invalid { margin-top: 3px; margin-bottom: 3px; padding-top: 0px; padding-bottom: 0px; text-align: left; letter-spacing: 0px; color: #dd0000; }
</style>
