
<template>
	<!-- REPORTS section -->
	<div id="reports">
		<!-- REPORTS HEADER section-->
		<div class="row page-titles">
			<div class="col-md-5 col-8 align-self-center">
				<h3 class="text-themecolor m-b-0 m-t-0">Reports</h3>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
					<li class="breadcrumb-item active">Reports</li>
				</ol>
			</div>
		</div>
		<!-- end REPORTS HEADER section -->	<!-- REPORTS BODY section-->
		<div class="row">
			<div class="col-lg-12">
				<!-- DAILY EARNING CHART section-->
				<div class="card">
					<div class="card-block">
						<h3 class="card-title">Daily Earning Report<i class="fa fa-btn fa-spinner fa-spin" v-if="isChartLoading"></i></h3>
						<line-chart 
							:chartData="chartData" 
							:options="chartOption" 
							:height="350">
						</line-chart>
					</div>
				</div>
				<!-- end DAILY EARNING CHART section-->
			</div>
		</div>
		<div class="row">
			<!-- EARNING HISTORY TABLE section-->
			<div class="col-lg-12">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title">Earning History<i class="fa fa-btn fa-spinner fa-spin" v-if="isEarningsTableLoading"></i></h3>
						<data-table 
							:columns="earningColumns" 
							:data="earningRows" 
							:filterID="earningFilterID" 
							:initSortField="3" 
							paginate 
							filterable>
						</data-table>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<!-- end EARNING HISTORY TABLE section-->
			<!-- DEPOSIT HISTORY TABLE section-->
			<div class="col-lg-12">
				<div class="card">
					<div class="card-block">
						<h3 class="card-title">Deposit History <i class="fa fa-btn fa-spinner fa-spin" v-if="isDepositsTableLoading"></i></h3>
						<data-table :columns="depositColumns" :data="depositRows" :filterID="depositFilterID" :initSortField="2" paginate filterable></data-table>	
					</div>
				</div>
			</div>
			<!-- end DEPOSIT HISTORY TABLE section-->
		</div>
		<!-- end REPORTS BODY section-->
		
	    <!-- MODAL EARNING DETAIL section -->
		<div id="dlg-earning-detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" v-if="selectedEarning">
					<div class="modal-head">
						<h4 class="modal-title" id="myModalLabel">Earning Distribution Detail</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<p>
	                    	Type: 
	                    	<span> {{ selectedEarning.type }} </span> 
	                    </p>
	                    <p>
	                    	Currency: 
	                    	<span> {{ selectedEarning.currency }} </span> 
	                    </p>
	                    <p>
	                    	Wallet Address: 
	                    	<span> {{ selectedEarning.walletAddress }} </span> 
	                    </p>
	                    <p>
	                    	Amount: 
	                    	<span> {{ convertToCurrency(selectedEarning.amountSatoshi, selectedEarning.currency) }} </span> 
	                    </p>
	                    <p>
	                    	Management Fee: 
	                    	<span> {{ convertToCurrency(selectedEarning.managementFeeSatoshi, selectedEarning.currency) }} </span> 
	                    </p>
	                    <p>
	                    	Electricity Fee: 
	                    	<span> {{ convertToCurrency(selectedEarning.electricityFeeSatoshi, selectedEarning.currency) }} </span> 
	                    </p>
	                    <p>
	                    	Transaction ID: 
	                    	<span> {{ selectedEarning.transactionID }} </span> 
	                    </p>
	                    <p>
	                    	Created At: 
	                    	<span> {{ dateToString(selectedEarning.created) }} </span> 
	                    </p>
	                    <p>
	                    	Last Updated At: 
	                    	<span> {{ dateToString(selectedEarning.lastUpdated) }} </span> 
	                    </p>
	                    <p>
	                    	Status: 
	                    	<span> {{ selectedEarning.status }} </span> 
	                    </p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info waves-effect" data-dismiss="modal">Close</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
	    <!-- end MODAL EARNING DETAIL section -->

	    <!-- MODAL DEPOSIT DETAIL section -->
	    <div class="modal fade wbr-login" id="dlg-deposit-detail" tabindex="-1" role="basic" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content" v-if="selectedDeposit">
	                <div class="modal-header text-left modal-deposit">
	                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
	                    <h4 class="modal-title"> Deposit Detail </h4>
	                    <p>
	                    	Currency: 
	                    	<span> {{ selectedDeposit.currency }} </span> 
	                    </p>
	                    <p>
	                    	Amount: 
	                    	<span> {{ convertToCurrency(selectedDeposit.amountSatoshi, selectedDeposit.currency) }} </span> 
	                    </p>
	                    <p>
	                    	Net Amount: 
	                    	<span> {{ convertToCurrency(selectedDeposit.netAmountSatoshi, selectedDeposit.currency) }} </span> 
	                    </p>
	                    <p>
	                    	Converted Currency: 
	                    	<span> {{ selectedDeposit.convertedCurrency }} </span> 
	                    </p>
	                    <p>
	                    	Converted Amount: 
	                    	<span> {{ convertToCurrency(selectedDeposit.convertedAmount, selectedDeposit.convertedCurrency) }} </span> 
	                    </p>
	                    <p>
	                    	Conversion Fee: 
	                    	<span> {{ convertToCurrency(selectedDeposit.conversionFee, selectedDeposit.convertedCurrency) }} </span> 
	                    </p>
	                    <p>
	                    	Converted At: 
	                    	<span> {{ dateToString(selectedDeposit.convertedOn, selectedDeposit.convertedCurrency) }} </span> 
	                    </p>
	                    <p>
	                    	Transaction ID: 
	                    	<span> {{ selectedDeposit.transactionID }} </span> 
	                    </p>
	                    <p>
	                    	Last Updated At: 
	                    	<span> {{ dateToString(selectedDeposit.lastUpdated) }} </span> 
	                    </p>
	                </div>
	                <div class="modal-footer">
	                </div>
	            </div>
	        </div>
	    </div>
	    <!-- end MODAL DEPOSIT DETAIL section --> 
	</div>
	<!-- end REPORTS section -->
</template>

<script>
import LineChart from "../charts/LineChart.vue"
import DataTable from "../datatables/DataTable.vue"

export default {
	name: 'dashboard-home',
	components: {
		lineChart: LineChart,
        dataTable: DataTable,
	},
	data: function() {
		return {
			//User info
			userGUID: localStorage.getItem('userGUID'),
			//Info data and option for earning chart
			chartData: {},
			chartOption: {},

			isChartLoading: false,
			//Properties for earning table
			earningColumns: [],
			earningRows: [],
			earningFilterID: 'filter01',
			selectedEarning: null,

			isEarningsTableLoading: false,
			//Properties for deposit table
			depositColumns: [],
			depositRows: [],
			depositFilterID: 'filter02',
			selectedDeposit: null,

			isDepositsTableLoading: false,
		}
	},
	created: function() {
		var self = this
		//Load chart data
		this.getDailyEarnings()
		//Load earning table data
		this.getEarningsDistributionByUser()
		//Load deposit table data
		this.getDepositsByUser()

		this.$on('rowSelected', function(data) {
			for(var key in data.row) {
				data.row[key] = data.row[key] ? data.row[key] : ''
			}
			if(data.filterID == self.earningFilterID) {
				self.selectedEarning = data.row
				$('#dlg-earning-detail').modal('show')
			} else {
				self.selectedDeposit = data.row
				$('#dlg-deposit-detail').modal('show')
			}
		})
	},
	mounted: function() {
		//Table initializing
		var self = this
		this.earningColumns = [
				{ label: 'Currency', field: 'currency', filterable: true, align: 'center' },
				{
					label: 'Amount',
					callback: function(row) {
						return self.convertToCurrency(row.amountSatoshi, '')
					},
					align: 'center'
				},
				{ label: 'Status', field: 'status', filterable: true, align: 'center' },
				{
					label: 'Created Date', 
					callback: function(row) {
						return self.dateToString(row.created)
					}, 
					align: 'center', 
					filterable: true 
				}
			]
		this.depositColumns = [
				{ label: 'Currency', field: 'currency', filterable: true, align: 'center' },
				{ 
					label: 'Amount', 
					callback: function(row) {
						return self.convertToCurrency(row.amountSatoshi, '')
					}
				},
				{ 
					label: 'Created Date', 
					callback: function(row) {
						return self.dateToString(row.created)
					}, 
					filterable: true 
				}
			]

		//Chart initailizing
		var ctx = document.getElementById("line-chart").getContext('2d')

		var gradient1 = ctx.createLinearGradient(0, 0, 0, 400)
		gradient1.addColorStop(1, 'rgba(255,255,255,.4)')
		gradient1.addColorStop(0, 'rgba(183,236,240,.4)')

		var gradient2 = ctx.createLinearGradient(0, 0, 0, 400)
		gradient2.addColorStop(1, 'rgba(255,255,255,.0)')
		gradient2.addColorStop(0, 'rgba(253,96,91,.7)')

		var gradient3 = ctx.createLinearGradient(0, 0, 0, 400)
		gradient3.addColorStop(1, 'rgba(255,255,255,.0)')   
		gradient3.addColorStop(0, 'rgba(255,255,90,.7)')

		this.chartData = {
			datasets: [
				{
					label: 'NLG Earning',
					borderColor: "rgb(90,188,223)",
					borderWidth: 2,
					backgroundColor: gradient1,
					data: [],
					tension: 0
				},
				{
					label: 'CHR Earning',
					borderColor: "rgb(255,134,115)",
					borderWidth: 2,
					backgroundColor: gradient2,
					data: [],
					tension: 0
				},
				{
					label: 'USD Earning',
					borderColor: "rgb(230,230,90)",
					borderWidth: 2,
					backgroundColor: gradient3,
					data: [],
					tension: 0
				}
			],
			labels: []
		}

		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		var today = new Date()
		var utcYear = today.getUTCFullYear()
		var utcMonth = today.getUTCMonth()
		var xAxesLabel = monthNames[utcMonth] + ', ' + utcYear
		this.chartOption = {
			responsive: true,
    		maintainAspectRatio: false,
			title:{
				display:false,
				text:'Daily Earning'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: xAxesLabel
					},
					gridLines: {
						display: true,
						color: "rgba(244, 244, 246, 1)",
						lineWidth: 1
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Earning'
					},
					gridLines: {
						display: true,
						color: "rgba(244, 244, 246, 1)"
					}
				}]
			},
			scaleShowHorizontalLines: true,
			scaleShowVerticalLines: true
		}
	},
	beforeDestory: function() {
		this.$off('rowSelected')
	},
	methods: {
		getDailyEarnings: function() {
			this.isChartLoading = true
			this.$socket.emit("earning/getDailyEarnings", {
				method: "post", 
				userGUID: this.userGUID,
			})
		},
		getEarningsDistributionByUser: function() {
			this.isEarningsTableLoading = true
			this.$socket.emit("earning/getEarningsDistributionByUser", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
		getDepositsByUser: function() {
			this.isDepositsTableLoading = true
			this.$socket.emit("deposit/getDepositsByUser", {
				method: "post", 
				userGUID: this.userGUID
			})
		},
	},
	sockets: {
		"earning/getDailyEarnings": function(val) {
			console.log(val)
			var nlgEarning = val.body.data.nlgEarning
			var chrEarning = val.body.data.chrEarning
			var usdEarning = val.body.data.usdEarning
			var currentDay = val.body.data.currentDay

			var xAxesLabels = []
			var i = 0
			for(i = 0; i < currentDay;i ++) {
				xAxesLabels[i] = '' + (i + 1)
				nlgEarning[i] = this.toNonSatoshi(nlgEarning[i]).toFixed(8)
				chrEarning[i] = this.toNonSatoshi(chrEarning[i]).toFixed(8)
				usdEarning[i] = this.toNonSatoshi(usdEarning[i]).toFixed(8)
			}

			this.chartData = Object.assign({}, this.chartData, {})
			this.chartData.datasets[0].data = nlgEarning
			this.chartData.datasets[1].data = chrEarning
			this.chartData.datasets[2].data = usdEarning
			this.chartData.labels = xAxesLabels
			//this.chartOption = Object.assign({}, this.chartOption, {})
			this.isChartLoading = false
		},
		"earning/getEarningsDistributionByUser": function(val) {
			this.earningRows = val.body.data
			this.isEarningsTableLoading = false
		},
		"deposit/getDepositsByUser": function(val) {
			this.depositRows = val.body.data
			this.isDepositsTableLoading = false
		},
		"deposit": function(val) {
			//Load deposit table data
			this.getDepositsByUser()
		},
		"distribution": function(val) {
			//Load chart data
			this.getDailyEarnings()
			//Load earning table data
			this.getEarningsDistributionByUser()
		},
	}
} 
</script>

<style scoped>
	.row { margin:0px; }
	line-chart{ background-color: white; }

	.modal-earning, .modal-deposit { padding-left: 40px; padding-right: 40px; }
	.modal-earning>p>span { padding-left: 5px; color: #FFFF00; }
	.modal-deposit>p>span { padding-left: 5px; color: #FFFF00; }
</style>
