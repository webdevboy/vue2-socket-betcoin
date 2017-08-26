
<template>
	<div id="create-earning">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Earning Detail
	        			<router-link :to="'/dashboard/earnings'" class="nav-link d-inline-block" v-if="!isEarningSelected()">
	        				(Click here to select earning.)
	        			</router-link>
	        		</div>
	        		
	        		<div class="card-block">
	        			<form action="#" method="post" class="subscribe-form" data-vv-scope="earning-form">

			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="currency"> Currency </label>
			        				<input type="text" id="currency" name="currency" class="form-control" v-model="earning.currency" v-validate="'required'" data-vv-as="currency" />
				        			<p class="vv-invalid" v-if="errors.has('earning-form.currency')"> 
				        				{{ errors.first('earning-form.currency') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="amountSatoshi"> Amount </label>
			        				<input type="text" id="amountSatoshi" name="amountSatoshi" class="form-control" v-model="earning.amountSatoshi" v-validate="'required|decimal'" data-vv-as="amount" />
				        			<p class="vv-invalid" v-if="errors.has('earning-form.amountSatoshi')"> 
				        				{{ errors.first('earning-form.amountSatoshi') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="payoutTxID"> Payout Transaction ID </label>
			        				<input type="text" id="payoutTxID" name="payoutTxID" class="form-control" v-model="earning.payoutTxID" v-validate="'required'" data-vv-as="payout transaction ID" />
				        			<p class="vv-invalid" v-if="errors.has('earning-form.payoutTxID')"> 
				        				{{ errors.first('earning-form.payoutTxID') }} 
			                        </p>
			        			</div>
		        			</div>
			        	</form>
		        	</div>

		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onUpdateEarning">
		        			Update Earning
		        			<i class="fa fa-btn fa-spinner fa-spin" v-if="isSavingEarning"></i>
		        		</button>
		        		<button class="btn btn-danger" v-on:click="onBackToEarnings">Back to earning list</button>
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
	name: 'create-earning',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedEarning: localStorage.getItem('selectedEarning', null),
			earning: {},
			isSavingEarning: false,
		}
	},
	created: function() {
		this.getEarningByTransactionID()
	},
	methods: {
		isEarningSelected: function() {
			return this.selectedEarning ? true : false
		},
		getEarningByTransactionID: function() {
			this.$socket.emit("earning/getEarningByTransactionID", {
				method: "post",
				transactionID: this.selectedEarning
			})
		},
		onUpdateEarning: function() {
            if (event) event.preventDefault()
            this.$validator.validateAll('earning-form').then(()=>{
                this.isSavingEarning = true
                this.earning.method = "post"
                this.$socket.emit("earning/updateEarning", this.earning)
            }).catch(()=>{

            });
		},
		onBackToEarnings: function() {
			router.replace({ path: '/dashboard/earnings' })
		}
	},
	sockets: {
		"earning/getEarningByTransactionID": function(val) {
			this.earning = val.body.data
		},
		"earning/updateEarning": function(val) {
			console.log(val)
			this.earning = val.body.data
			this.isSavingEarning = false
			this.onBackToEarnings()
		}
	}
} 
</script>

<style scoped>
	.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
	.vv-invalid { margin-top: 3px; margin-bottom: 3px; padding-top: 0px; padding-bottom: 0px; text-align: left; letter-spacing: 0px; color: #dd0000; }
</style>
