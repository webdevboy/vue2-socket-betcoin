
<template>
	<div class="row">
		<div class="col-12">

			<div class="table-above row form-inline">
				<div class="col-6 no-padding">
					<div v-if="paginate && has_size_options" class="form-group">
						<label for="filter">
							<select v-model="store.page_size" class="form-control record-count" @change.stop="">
								<option v-for="size in sizeOptions" :value="size">{{ size }}</option>
							</select>
							records per page
						</label>
					</div>
				</div>
				<div class="col-6 no-padding">
					<div v-if="filterable" class="form-group float-right">
						<label for="filter">
							<span>Search:</span>
							<input type="text" v-bind:id="filterID" class="form-control input-search" v-model="store.filter" placeholder="">
						</label>
					</div>
				</div>
			</div>

			<table class="table table-hover table-striped table-bordered">
				<thead>
					<tr>
						<th class="text-center">
							No
						</th>
						<th v-for="head_column in column_props" :style="{'text-align': head_column.align}">
							{{ head_column.label }}
							<span
								v-if="head_column.sortable"
								:class="getHeaderColumnClass(head_column)"
								@click="store.sortBy(head_column.id)"
							></span>
						</th>
						<th class="text-center" v-if="type=='USER'">
							Profile
						</th>
						<th class="text-center" v-if="type=='USER' || type=='DEPOSIT'">
							Deposits
						</th>
						<th class="text-center" v-if="type=='USER' || type=='EARNING_DISTRIBUTION'">
							Earning <br/> Distributions
						</th>
						<th class="text-center" v-if="type=='EARNING'">
							Earnings
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in store.visible_rows" v-on:click="onClickRow(row.userGUID)">
						<td class="text-center">
							{{ index + 1 }}
						</td>
						<td v-for="row_column in column_props" :style="{'text-align': row_column.align}">
							<span v-if="row_column.field">{{ getRowFromField(row, row_column.field) }}</span>
							<span v-if="row_column.callback">{{ row_column.callback(row) }}</span>
							<component v-if="row_column.component" :is="row_column.component" :row="row"></component>
						</td>
						<td class="text-center" v-if="type=='USER'">
							<button class="btn btn-secondary" v-on:click="onEditProfile(row._id)">Edit</button>
						</td>
						<td class="text-center" v-if="type=='USER'">
							<button class="btn btn-secondary" v-on:click="onShowDeposits(row._id)">Show</button>
						</td>
						<td class="text-center" v-if="type=='USER'">
							<button class="btn btn-secondary" v-on:click="onShowEarningDistributions(row._id)">Show</button>
						</td>
						<td class="text-center" v-if="type=='DEPOSIT'">
							<button class="btn btn-secondary" v-on:click="onEditDeposit(row.transactionID)">Edit</button>
						</td>
						<td class="text-center" v-if="type=='EARNING_DISTRIBUTION'">
							<button class="btn btn-secondary" v-on:click="onEditEarningDistribution(row.earningsDistributionID)">Edit</button>
						</td>
						<td class="text-center" v-if="type=='EARNING'">
							<button class="btn btn-secondary" v-on:click="onEditEarning(row.transactionID)">Edit</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="table-below row form-inline">
				<div class="col-6 no-padding">
					<span>{{getStateString()}}</span>
				</div>
				<div class="col-6 no-padding">
					<span v-if="paginate" class="btn-group float-right">
						<button class="btn btn-secondary" v-bind:disabled="store.page == 1" @click="store.setPage(1, $event)">&lt;&lt;</button>
						<button class="btn btn-secondary" v-bind:disabled="store.page == 1" @click="store.setPage(store.page - 1, $event)">&lt;</button>
						<button class="btn btn-secondary" v-if="store.page - 3 >= 1" disabled>...</button>
						<button class="btn btn-secondary" v-if="store.page - 2 >= 1" @click="store.setPage(store.page - 2, $event)">
							{{store.page - 2}}
						</button>
						<button class="btn btn-secondary" v-if="store.page - 1 >= 1" @click="store.setPage(store.page - 1, $event)">
							{{store.page - 1}}
						</button>
						<button class="btn btn-secondary active">
							{{ store.page }}
						</button>
						<button class="btn btn-secondary" v-if="store.page + 1 <= store.last_page" @click="store.setPage(store.page + 1, $event)">
							{{store.page + 1}}
						</button>
						<button class="btn btn-secondary" v-if="store.page + 2 <= store.last_page" @click="store.setPage(store.page + 2, $event)">
							{{store.page + 2}}
						</button>
						<button class="btn btn-secondary" v-if="store.page + 3 <= store.last_page" disabled>...</button>
						<button class="btn btn-secondary" v-bind:disabled="store.page >= store.last_page" @click="store.setPage(store.page + 1, $event)">&gt;</button>
						<button class="btn btn-secondary" v-bind:disabled="store.page >= store.last_page" @click="store.setPage(store.last_page, $event)">&gt;&gt;</button>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import objectPath from 'object-path';
import json_store from './json.js';

export default {
	props: {
		columns: [Object, Array],
		data: [Object, Array, String],
		type: {
			type: String,
			default: 'USER'
		},
		filterID: {
			type: String,
			default: 'id1'
		},
		initSortField: {
			type: Number,
			default: -1
		},
		filterable: {
			type: Boolean,
			default: false
		},
		paginate: {
			type: Boolean,
			default: false
		},
		sizeOptions: {
			type: [Object, Array],
			default: function(){return [10, 25, 50, 100]; }
		},
		dataStore: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		store: null
	}),
	created(){
		this.updateStore(this.data);
	},
	computed: {
		column_props: function(){
			var i = 0;
			return this.columns.map(function(column){
				var sortable = typeof column.sortable === 'undefined' ? true : column.sortable;
				sortable = column.component ? false : sortable;
				
				var filterable = typeof column.filterable === 'undefined' ? true : column.filterable;
				filterable = column.component ? false : filterable;

				return {
					id: i++,
					label: column.label || '',
					align: column.align || 'left',
					sortable: sortable,
					filterable: filterable,
					field: column.field || null,
					callback: column.callback || null,
					component: column.component || null
				};
			});
		},
		has_size_options: function(){
			const is_array = (this.sizeOptions instanceof Array);
			const can_resize = this.store.can_resize;
			return is_array && can_resize;
		}
	},
	methods: {
		getHeaderColumnClass(head_column){
			const can_sort = this.store.sortable;

			const sort_none =
				head_column.id !== this.store.sort_by || !this.store.sort_dir;

			const sort_asc =
				head_column.id === this.store.sort_by && this.store.sort_dir === 'asc';
			
			const sort_dsc =
				head_column.id === this.store.sort_by && this.store.sort_dir === 'dsc';

			return {
				'fa': can_sort,
				'fa-sort': can_sort,
				'fa-sort': can_sort && sort_none,
				'fa fa-sort-asc': can_sort && sort_asc,
				'fa fa-sort-desc': can_sort && sort_dsc,
			}
		},
		updateStore(data){
			if(this.dataStore){
				this.store = new Vue(this.dataStore);
			}else{
				this.store = new Vue(json_store);
			}
			this.store.setTable(this);
			this.store.setData(data);
			this.store.setFilterable(this.filterable);
			this.store.setPaginate(this.paginate);
			this.store.setSortable(true);
		},
		getRowFromField(row, field) {
		    return objectPath.get(row, field)
		},
		getStateString() {
			var page_size = this.store.page_size;
			var startEntry = (this.store.page - 1) * page_size + 1;
			var endEntry = this.store.page * page_size;
			var totalEntry = this.store.filtered_rows.length;
			if( this.store.page == Math.ceil(totalEntry / page_size) ) {
				endEntry = startEntry + (totalEntry % page_size - 1);
			}
			if(totalEntry == 0) {
				startEntry = 0
				endEntry = 0
			}
			return "Showing "+ startEntry +" to " + endEntry + " of " + totalEntry + " entries";
		},
		onClickRow(userGUID) {
			if(this.type != 'USER')
				return
			this.$parent.$emit('onClickUserRow', userGUID)
		},
		onEditProfile(_id) {
			this.$parent.$emit('onEditProfile', _id)
		},
		onShowDeposits(_id) {
			this.$parent.$emit('onShowDeposits', _id)
		},
		onShowEarningDistributions(_id) {
			this.$parent.$emit('onShowEarningDistributions', _id)
		},
		onEditDeposit(transactionID) {
			this.$parent.$emit('onEditDeposit', transactionID)
		},
		onEditEarningDistribution(earningsDistributionID) {
			this.$parent.$emit('onEditEarningDistribution', earningsDistributionID)
		},
		onEditEarning(transactionID) {
			this.$parent.$emit('onEditEarning', transactionID)
		}
	},
	watch: {
		data(){
			this.updateStore(this.data);
			if(this.initSortField != -1) {
				this.store.sortBy(this.initSortField)
				this.store.sortBy(this.initSortField)
			}
		}
	}
}
</script>

<style scoped>
	.row { margin-left: 0px; margin-right: 0px; }
	.col-12 { padding: 0px; }
	.float-right { float: right; }
	.no-padding { padding-left: 0px; padding-right: 0px; margin-bottom: 8px; }

	.table-above, .table-below { padding: 0px 0px; }
	label{ font-weight: normal; }
	.record-count { width: 60px; margin-right: 10px; }
	.input-search { margin-left: 10px; }

	table thead th { white-space: nowrap; }
	table th .fa { cursor: pointer; }
	table tbody tr:hover { cursor: pointer; }
</style>