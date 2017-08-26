
<template>
	<div id="dashboard-home">
		<div class="row page-body">	
	        <div class="col-md-12">
	        	<div class="card">
	        		<div class="card-header">
	        			<i class="icon-people"></i>
	        			Users
						<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingUserData"></i>
	        		</div>
	        		<div class="card-block">
		        		<data-table :columns="userColumns" :data="userRows" :type="'USER'" :filterID="'id1'" editable paginate filterable></data-table>
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
	name: 'dashboard-home',
	components: {
        dataTable: DataTable
	},
	data: function() {
		return {
			isLoadingUserData: true,

			userColumns: [],
			userRows: []
		}
	},
	created: function() {
		//Init Table Format
		this.setTableFormat()
		//Load earning table data
		this.getUsers()
		//Attach datatable event
		this.$on('onClickUserRow', function(userGUID) {
			this.$socket.emit("users/enableLoginAsUser", {
				method: "post",
				userGUID: userGUID
			})
		})
		this.$on('onEditProfile', function(_id) {
			localStorage.setItem('selectedUser', _id)
			router.replace({ path: '/dashboard/profile' })
		})
		this.$on('onShowDeposits', function(_id) {
			localStorage.setItem('selectedUser', _id)
			router.replace({ path: '/dashboard/deposits' })
		})
		this.$on('onShowEarningDistributions', function(_id) {
			localStorage.setItem('selectedUser', _id)
			router.replace({ path: '/dashboard/earning-distributions' })
		})
	},
	beforeDestroy: function() {
		this.$off('onClickUserRow')
		this.$off('onEditProfile')
		this.$off('onShowDeposits')
		this.$off('onShowEarningDistributions')
	},
	methods: {
		setTableFormat: function() {
			var self = this
			this.userColumns = [
				{label: 'Name', callback: function(row) {
					return (typeof row.firstName == 'undefined' || row.firstName == 'undefined')?'No name': row.firstName + ' ' + row.lastName
				}, filterable: true, align: 'center' },
				{label: 'Email', field: 'email', filterable: true, align: 'center'},
				{label: 'Referrer', field: 'referrer', filterable: true, align: 'center'},
				{label: 'Created At', callback: function(row) {
					return self.dateToString(row.created)
				}, filterable: true, align: 'center' }, 
				{label: 'Updated At', callback: function(row) {
					return self.dateToString(row.lastUpdated)
				}, filterable: true, align: 'center' },
				{label: 'Last Login At', callback: function(row) {
					return self.dateToString(row.lastLogin)
				}, filterable: true, align: 'center' },]
		},
		getUsers: function() {
			this.isLoadingUserData = true
			this.$socket.emit("users/getUsers", {method: "post"})
		}
	},
	sockets: {
		"users/enableLoginAsUser": function(val) {
			if(val.body.err) {
				alert('Error in logging in as user')
			} else {
				var url = "http://localhost:8081/#/login/guid/" + val.body.user.GUID
				var win = window.open(url, '_blank')
				//win.focus()
			}
		},
		"users/getUsers": function(val) {
			this.userRows = val.body.user
			this.isLoadingUserData = false
		}
	}
} 
</script>

<style scoped>
.page-body { margin-left: 0px; margin-right: 0px; margin-top: 30px; }
</style>
