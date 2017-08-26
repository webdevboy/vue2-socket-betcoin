
<template>
	<div id="create-deposit">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Create Earning Distribution
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
	        		</div>
	        		
	        		<div class="card-block">
	        			<form action="#" method="post" class="subscribe-form" data-vv-scope="earning-d-form">
			        		
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="userID"> User ID </label>
			        				<input type="text" id="userID" class="form-control" v-model="earningD.userID" readonly/>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="type"> Type </label>
			        				<input type="text" id="type" name="type" class="form-control" v-model="earningD.type" v-validate="'required'" data-vv-as="type" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.type')"> 
				        				{{ errors.first('earning-d-form.type') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="currency"> Currency </label>
			        				<input type="text" id="currency" name="currency" class="form-control" v-model="earningD.currency" v-validate="'required'" data-vv-as="currency" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.currency')"> 
				        				{{ errors.first('earning-d-form.currency') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="walletAddress"> Wallet Address </label>
			        				<input type="text" id="walletAddress" name="walletAddress" class="form-control" v-model="earningD.walletAddress" v-validate="'required'" data-vv-as="wallet address" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.walletAddress')"> 
				        				{{ errors.first('earning-d-form.walletAddress') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="amountSatoshi"> Amount </label>
			        				<input type="text" id="amountSatoshi" name="amountSatoshi" class="form-control" v-model="earningD.amountSatoshi" v-validate="'required|decimal'" data-vv-as="amount" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.amountSatoshi')"> 
				        				{{ errors.first('earning-d-form.amountSatoshi') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="managementFeeSatoshi"> Management Fee </label>
			        				<input type="text" id="managementFeeSatoshi" name="managementFeeSatoshi" class="form-control" v-model="earningD.managementFeeSatoshi" v-validate="'required|decimal'" data-vv-as="management fee" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.managementFeeSatoshi')"> 
				        				{{ errors.first('earning-d-form.managementFeeSatoshi') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="electricityFeeSatoshi"> Electricity Fee </label>
			        				<input type="text" id="electricityFeeSatoshi" name="electricityFeeSatoshi" class="form-control" v-model="earningD.electricityFeeSatoshi" v-validate="'required|decimal'" data-vv-as="electricity fee" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.electricityFeeSatoshi')"> 
				        				{{ errors.first('earning-d-form.electricityFeeSatoshi') }} 
			                        </p>
			        			</div>
		        			</div>
			        		<div class="row">
			        			<div class="form-group col-md-12">
			        				<label for="status"> Status </label>
			        				<input type="text" id="status" name="status" class="form-control" v-model="earningD.status" v-validate="'required'" data-vv-as="status" />
				        			<p class="vv-invalid" v-if="errors.has('earning-d-form.status')"> 
				        				{{ errors.first('earning-d-form.status') }} 
			                        </p>
			        			</div>
		        			</div>

			        	</form>
		        	</div>

		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onCreateEarningDistribution">
		        			Create Earning Distribution
		        			<i class="fa fa-btn fa-spinner fa-spin" v-if="isSavingEarningD"></i>
		        		</button>
		        		<button class="btn btn-danger" v-on:click="onBackToEarningDistributions">Back to earning distribution list</button>
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
			earningD: {},
			isSavingEarningD: false,
		}
	},
	created: function() {
		this.earningD.userID = this.selectedUser
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		onCreateEarningDistribution: function() {
            if (event) event.preventDefault()
            this.$validator.validateAll('earning-d-form').then(()=>{
                this.isSavingEarningD = true
                this.earningD.method = "post"
                this.$socket.emit("earning/createEarningDistribution", this.earningD);
            }).catch(()=>{

            });
		},
		onBackToEarningDistributions: function() {
			router.replace({ path: '/dashboard/earning-distributions' })
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"earning/createEarningDistribution": function(val) {
			console.log(val)
			var createdEarningD = val.body.data
			this.isSavingEarningD = false
			this.onBackToEarningDistributions()
		}
	}
} 
</script>

<style scoped>
	.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
	.vv-invalid { margin-top: 3px; margin-bottom: 3px; padding-top: 0px; padding-bottom: 0px; text-align: left; letter-spacing: 0px; color: #dd0000; }
</style>
