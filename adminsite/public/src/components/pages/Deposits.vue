
<template>
	<div id="deposits">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Deposits
	        			<router-link :to="'/dashboard/users'" class="nav-link d-inline-block" v-if="!isUserSelected()">
	        				(Click here to select user.)
	        			</router-link>
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingDeposits"></i>
	        		</div>
	        		<div class="card-block">
		        		<data-table :columns="depositColumns" :type="'DEPOSIT'" :data="depositRows" :filterID="'id3'" editable paginate filterable></data-table>
		        	</div>
		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onCreateDeposit">Create Deposit</button>
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
	name: 'deposits',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			selectedUser: localStorage.getItem('selectedUser', null),
			isLoadingDeposits: false,

			depositColumns: [],
			depositRows: []
		}
	},
	created: function() {
		//Init Table Format
		this.setTableFormat()
		//Load earning table data
		this.getDeposits()
		//Attach datatable event
		this.$on('onEditDeposit', function(transactionID) {
			localStorage.setItem('selectedDeposit', transactionID)
			router.replace({ path: '/dashboard/deposit-detail' })
		})
	},
	beforeDestroy: function() {
		this.$off('onEditDeposit')
	},
	methods: {
		isUserSelected() {
			return this.selectedUser ? true : false
		},
		setTableFormat: function() {
			var self = this
			this.depositColumns = [
				{label: 'Currency', field: 'currency', filterable: true, align: 'center' },
				{label: 'Satoshi', field: 'amountSatoshi', filterable: true, align: 'center'},
				{label: 'Net Satoshi', field: 'netAmountSatoshi', filterable: true, align: 'center'},
				{label: 'Converted Currency', field: 'convertedCurrency', filterable: true, align: 'center'},
				{label: 'Converted Amount', field: 'convertedAmount', filterable: true, align: 'center'},
				{label: 'Conversion Fee', field: 'conversionFee', filterable: true, align: 'center'},
				{label: 'Converted On', callback: function(row) {
					return self.dateToString(row.convertedOn)
				}, filterable: true, align: 'center'},
				{label: 'Transaction ID', field: 'transactionID', filterable: true, align: 'center'}
			]
		},
		getDeposits: function() {
			if( !this.isUserSelected() )
				return
			this.isLoadingDeposits = true
			this.$socket.emit("deposit/getDepositsByUserID", {
				method: "post", 
				_id: this.selectedUser
			})
		},
		onCreateDeposit: function() {
			router.replace({ path: '/dashboard/create-deposit' })
		},
		onBackToUsers: function() {
			router.replace({ path: '/dashboard/users' })
		}
	},
	sockets: {
		"deposit/getDepositsByUserID": function(val) {
			this.depositRows = val.body.data
			this.isLoadingDeposits = false
		}
	}
} 
</script>

<style scoped>
.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
</style>
