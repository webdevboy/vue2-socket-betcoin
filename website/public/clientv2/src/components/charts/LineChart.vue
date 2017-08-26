
<script>
import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
	props: {
		chartData: {
			type: Object
		},
		options: {
			type: Object
		}
	},
	data: function() {
		return {}
	},
	mixins: [mixins.reactiveProp],
	mounted: function() {
		if ( this.chartData ) {
			this.renderChart(this.chartData, this.options)
		}
	}
})
</script>
