
<template>
	<div id="earnings">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-docs"></i>
	        			Earnings
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingEarning"></i>
	        		</div>
	        		<div class="card-block">
		        		<data-table :type="'EARNING'" :columns="earningColumns" :data="earningRows" :filterID="'id5'" editable paginate filterable>
		        		</data-table>
		        	</div>
		        	<div class="card-footer">
		        		<button class="btn btn-primary" v-on:click="onCreateEarning">Create Earning</button>
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
	name: 'earnings',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			isLoadingEarning: false,

			earningColumns: [],
			earningRows: []
		}
	},
	created: function() {
		//Init Table Format
		this.setTableFormat()
		//Load earning table data
		this.getEarnings()
		//Attach datatable event
		this.$on('onEditEarning', function(transactionID) {
			localStorage.setItem('selectedEarning', transactionID)
			router.replace({ path: '/dashboard/earning-detail' })
		})
	},
	beforeDestroy: function() {
		this.$off('onEditEarning')
	},
	methods: {
		setTableFormat: function() {
			var self = this
			this.earningColumns = [
				{label: 'Currency', field: 'currency', filterable: true, align: 'center'},
				{label: 'Amount', field: 'amountSatoshi', filterable: true, align: 'center'},
				{label: 'Created At', callback: function(row) {
					return self.dateToString(row.created)
				}, filterable: true, align: 'center'},
				{label: 'Last Updated At', callback: function(row) {
					return self.dateToString(row.lastUpdated)
				}, filterable: true, align: 'center'},
				{label: 'Processed At', callback: function(row) {
					return self.dateToString(row.processed)
				}, filterable: true, align: 'center'}
			]
		},
		getEarnings: function() {
			this.isLoadingEarning = true
			this.$socket.emit("earning/getEarnings", {
				method: "post"
			})
		},
		onCreateEarning: function() {
			router.replace({ path: '/dashboard/create-earning' })
		}
	},
	sockets: {
		"earning/getEarnings": function(val) {
			//console.log(val)
			this.earningRows = val.body.data
			this.isLoadingEarning = false
		}
	}
} 
</script>

<style scoped>
.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
</style>
