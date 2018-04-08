<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
    props: ['data', 'options'],
    mounted () {
      this.renderChart(this._props.data, this._props.options)
    }
}
</script>
