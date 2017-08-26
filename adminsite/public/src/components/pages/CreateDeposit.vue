
<template>
	<div id="create-deposit">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Create Deposit
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
	        		</div>
	        		
	        		<div class="card-block">
	        			<form action="#" method="post" class="subscribe-form" data-vv-scope="deposit-form">
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="userID"> User ID </label>
			        				<input type="text" id="userID" class="form-control" v-model="deposit.userID" readonly/>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="currency"> Currency </label>
			        				<input type="text" id="currency" name="currency" class="form-control" v-model="deposit.currency" v-validate="'required'" data-vv-as="currency" />
				        			<p class="vv-invalid" v-if="errors.has('deposit-form.currency')"> 
				        				{{ errors.first('deposit-form.currency') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="amountSatoshi"> Amount </label>
			        				<input type="text" id="amountSatoshi" name="amountSatoshi" class="form-control" v-model="deposit.amountSatoshi" v-validate="'required|decimal'" data-vv-as="amount" />
			        				<p class="vv-invalid" v-if="errors.has('deposit-form.amountSatoshi')"> 
		                                {{ errors.first('deposit-form.amountSatoshi') }} 
		                            </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="netAmountSatoshi"> Net Amount </label>
			        				<input type="text" id="netAmountSatoshi" name="netAmountSatoshi" class="form-control" v-model="deposit.netAmountSatoshi" v-validate="'required|decimal'" data-vv-as="net amount" />
			        				<p class="vv-invalid" v-if="errors.has('deposit-form.netAmountSatoshi')"> 
		                                {{ errors.first('deposit-form.netAmountSatoshi') }} 
		                            </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="convertedCurrency"> Converted Currency </label>
			        				<input type="text" id="convertedCurrency" name="convertedCurrency" class="form-control" v-model="deposit.convertedCurrency" v-validate="'required'" data-vv-as="converted currency" />
				        			<p class="vv-invalid" v-if="errors.has('deposit-form.convertedCurrency')"> 
				        				{{ errors.first('deposit-form.convertedCurrency') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="convertedAmount"> Converted Amount </label>
			        				<input type="text" id="convertedAmount" name="convertedAmount" class="form-control" v-model="deposit.convertedAmount" v-validate="'required|decimal'" data-vv-as="converted amount" />
				        			<p class="vv-invalid" v-if="errors.has('deposit-form.convertedAmount')"> 
				        				{{ errors.first('deposit-form.convertedAmount') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="conversionFee"> Conversion Fee </label>
			        				<input type="text" id="conversionFee" name="conversionFee" class="form-control" v-model="deposit.conversionFee" v-validate="'required|decimal'" data-vv-as="conversion fee" />
				        			<p class="vv-invalid" v-if="errors.has('deposit-form.conversionFee')"> 
				        				{{ errors.first('deposit-form.conversionFee') }} 
			                        </p>
			        			</div>
		        			</div>
			        	</form>
		        	</div>

		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onCreateDeposit">
		        			Create Deposit
		        			<i class="fa fa-btn fa-spinner fa-spin" v-if="isSavingDeposit"></i>
		        		</button>
		        		<button class="btn btn-danger" v-on:click="onBackToDeposits">Back to deposits list</button>
		        	</div>

	        	</div>
	        </div>
		</div>
	</div>
</template>

<script>
import DataTable from "../datatables/DataTable.vue"
import router from "../../router"

export default {
	name: 'create-deposit',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedUser: localStorage.getItem('selectedUser', null),
			deposit: {},
			isSavingDeposit: false,
		}
	},
	created: function() {
		this.deposit.userID = this.selectedUser
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		onCreateDeposit: function() {
            if (event) event.preventDefault()
            this.$validator.validateAll('deposit-form').then(()=>{
                this.isSavingDeposit = true
                this.deposit.method = "post"
                this.$socket.emit("deposit/createDeposit", this.deposit);
            }).catch(()=>{

            });
		},
		onBackToDeposits: function() {
			router.replace({ path: '/dashboard/deposits' })
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"deposit/createDeposit": function(val) {
			var createdDeposit = val.body.data
			this.isSavingDeposit = false
			this.onBackToDeposits()
		}
	}
} 
</script>

<style scoped>
	.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
	.vv-invalid { margin-top: 3px; margin-bottom: 3px; padding-top: 0px; padding-bottom: 0px; text-align: left; letter-spacing: 0px; color: #dd0000; }
</style>
