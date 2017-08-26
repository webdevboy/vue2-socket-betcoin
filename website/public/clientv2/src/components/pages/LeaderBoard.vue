
<template>
	<!-- LEADERBOARD section -->
	<div id="leader-board">
		<!-- LEADERBOARD HEADER section-->
		<div class="row bckffc-hero">
			<!-- INTRO section-->
			<div class="row intro-section">
				<div class="container">
					<h1>Leader Board</h1>
					<!-- <h3>Nullam et risus non leo venenatis scelerisque a viverra orci. <br/> Praesent a laoreet magna, vitae imperdiet ex.</h3> -->
				</div>
			</div>
			<!-- end INTRO section-->
		</div> 
		<!-- end LEADERBOARD HEADER section -->

		<!-- LEADERBOARD BODY section-->
		<div class="row profile-section">
			<div class="container">
				<!-- TOP 25 CHRATOS MEMBERS(CHR) section-->
		        <div class="col-md-12">
					<div class="card">
						<div class="card-header">
							<i class="fa fa-users"></i>
							Top 25 Chratos Members (CHR Balance Ranking)
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingTopBalanceMembers"></i>
						</div>
						<div class="card-block">
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
						<div class="card-header">
							<i class="fa fa-users"></i>
							Top 25 Chratos Members (Referral Ranking)
							<i class="fa fa-btn fa-spinner fa-spin" v-if="isLoadingTopReferralMembers"></i>
						</div>
						<div class="card-block">
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
</style>
