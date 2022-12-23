<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
export default {
  name: 'Markdown1',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 40%;
  height: calc(40vh - 84px);
}
</style>
