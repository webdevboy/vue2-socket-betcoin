
<template>
	<!-- LEADERBOARD section -->
	<div id="leader-board">
		<!-- LEADERBOARD HEADER section-->
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">Leader Board</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Leader Board</li>
				</ol>
			</div>
		</div>
		<!-- end LEADERBOARD HEADER section -->

		<!-- LEADERBOARD BODY section-->
		<div class="row">
			<!-- TOP 25 CHRATOS MEMBERS(CHR) section-->
			<div class="col-md-12">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title">Top 25 Chratos Members (CHR Balance Ranking) <i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingTopBalanceMembers"></i></h3>
						<data-table 
							:columns="topBalanceMemberColumns" 
							:data="topBalanceMemberRows" 
							:filterID="topBalanceMemberFilterID" 
							:initSortField="2" 
							paginate 
							filterable>
						</data-table>
					</div>
				</div>
			</div>
			<!-- end TOP 25 CHRATOS MEMBERS(CHR) section-->
			<!-- TOP 25 CHRATOS MEMBERS(REFERRAL RANKING) section-->
			<div class="col-md-12 margin-top-30">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title">Top 25 Chratos Members (Referral Ranking) <i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingTopReferralMembers"></i></h3>
						<data-table 
							:columns="topReferralMemberColumns" 
							:data="topReferralMemberRows" 
							:filterID="topReferralMemberFilterID" 
							:initSortField="2" 
							paginate 
							filterable>
						</data-table>
					</div>
				</div>
			</div>
			<!-- end TOP 25 CHRATOS MEMBERS(REFERRAL RANKING) section-->
		</div>
		<!-- end LEADERBOARD BODY section-->
	</div>
	<!-- end LEADERBOARD section -->
</template>

<script>
import DataTable from "../datatables/DataTable.vue"

export default {
	name: 'leader-board',
	components: {
        dataTable: DataTable,
	},
	data: function() {
		return {
			//Properties for Top 25 Chratos Members (CHR Balance Ranking)
			topBalanceMemberColumns: [],
			topBalanceMemberRows: [],
			topBalanceMemberFilterID: 'filter01',

			isLoadingTopBalanceMembers: false,
			//Properties for Top 25 Chratos Members (Top Referral Ranking)
			topReferralMemberColumns: [],
			topReferralMemberRows: [],
			topReferralMemberFilterID: 'filter02',
			
			isLoadingTopReferralMembers: false,
		}
	},
	created: function() {
		var self = this
		this.topBalanceMemberColumns = [
			{ label: 'Nick name', field: 'nickName', filterable: true, align: 'center' },
			{
				label: 'CHR Balance', 
				callback: function(row) {
					return self.convertToCurrency(row.chrBalance)
				}, 
				align: 'center',
			}
		]
		this.topReferralMemberColumns = [
			{ label: 'Nick name', field: 'nickName', filterable: true, align: 'center' },
			{ label: 'Referral', field: 'referral', filterable: true, align: 'center' },
		]
		this.getTopBalanceMembers()
		this.getTopReferralMembers()
	},
	methods: {
		getTopBalanceMembers() {
			this.isLoadingTopBalanceMembers = true
			this.$socket.emit("users/getTopBalanceMembers", {
				method: "post"
			})
		},
		getTopReferralMembers() {
			this.isLoadingTopReferralMembers = true
			this.$socket.emit("users/getTopReferralMembers", {
				method: "post"
			})
		}
	},
	sockets: {
		"users/getTopBalanceMembers": function(val) {
			this.topBalanceMemberRows = val.body.data
			this.isLoadingTopBalanceMembers = false
		},
		"users/getTopReferralMembers": function(val) {
			this.topReferralMemberRows = val.body.data
			this.isLoadingTopReferralMembers = false
		}
	}
} 
</script>

<style scoped>
	.row { margin:0px; }
</style>
