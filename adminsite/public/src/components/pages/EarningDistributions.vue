
<template>
	<div id="earning-distributions">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Earning Distributions
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingEarningD"></i>
	        		</div>
	        		<div class="card-block">
		        		<data-table :type="'EARNING_DISTRIBUTION'" :columns="earningDColumns" :data="earningDRows" :filterID="'id4'" editable paginate filterable>
		        		</data-table>
		        	</div>
		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onCreateEarningD">Create Earning Distribution</button>
		        		<button class="btn btn-danger" v-on:click="onBackToUsers">Back to Users</button>
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
	name: 'earning-distributions',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedUser: localStorage.getItem('selectedUser', null),
			isLoadingEarningD: false,

			earningDColumns: [],
			earningDRows: []
		}
	},
	created: function() {
		//Init Table Format
		this.setTableFormat()
		//Load earning table data
		this.getEarningD()
		//Attach datatable event
		this.$on('onEditEarningDistribution', function(earningsDistributionID) {
			localStorage.setItem('selectedEarningD', earningsDistributionID)
			router.replace({ path: '/dashboard/earning-distribution-detail' })
		})
	},
	beforeDestroy: function() {
		this.$off('onEditEarningDistribution')
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		setTableFormat: function() {
			var self = this
			this.earningDColumns = [
				{label: 'Type', field: 'type', filterable: true, align: 'center' },
				{label: 'Currency', field: 'currency', filterable: true, align: 'center'},
				{label: 'Wallet Address', field: 'walletAddress', filterable: true, align: 'center'},
				{label: 'Amount', field: 'amountSatoshi', filterable: true, align: 'center'},
				{label: 'Management Fee', field: 'managementFeeSatoshi', filterable: true, align: 'center'},
				{label: 'Electricity Fee', field: 'electricityFeeSatoshi', filterable: true, align: 'center'},
				{label: 'Status', field: 'status', filterable: true, align: 'center'},
				{label: 'Created At', callback: function(row) {
					return self.dateToString(row.created)
				}, filterable: true, align: 'center'},
				{label: 'Last Updated At', callback: function(row) {
					return self.dateToString(row.lastUpdated)
				}, filterable: true, align: 'center'}
			]
		},
		getEarningD: function() {
			if( !this.isUserSelected() )
				return
			this.isLoadingEarningD = true
			this.$socket.emit("earning/getEarningDistributionsByUserID", {
				method: "post", 
				userID: this.selectedUser
			})
		},
		onCreateEarningD: function() {
			router.replace({ path: '/dashboard/create-earning-distribution' })
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"earning/getEarningDistributionsByUserID": function(val) {
			this.earningDRows = val.body.data
			this.isLoadingEarningD = false
		}
	}
} 
</script>

<style scoped>
.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
</style>
