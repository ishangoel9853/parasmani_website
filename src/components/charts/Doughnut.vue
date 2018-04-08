<script>
import { Doughnut } from 'vue-chartjs'

export default {
  props: ['data', 'options'],
  extends: Doughnut,
  mounted () {
    this.renderChart(this._props.data, this._props.options)
  }
}
</script>
