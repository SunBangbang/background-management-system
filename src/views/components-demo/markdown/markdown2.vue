<template>
  <div class="chart-container2">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'

export default {
  name: 'markdown2',
  components: { Chart }
}
</script>

<style scoped>

.chart-container2{
  position: relative;
  width: 40%;
  height: calc(40vh - 84px);
}

</style>

