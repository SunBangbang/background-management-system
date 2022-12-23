<template>
  <div :id="id" ref="echarts" :class="className" :style="{height:height,width:width,margin: '8px 0'}" />
</template>

<script>
import echarts from 'echarts'
import resize from '../../../components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    text: {
      type: String,
      default: ''
    },
    xAxis: {
      type: Array,
      default: () => []
    },
    yAxis: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    yAxis: {
      handler(value) {
        if (value.length) {
          this.initChart()
        }
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.echarts)
      const { xAxis, yAxis } = this
      this.chart.setOption({
        backgroundColor: '#ffffff',
        title: {
          top: 20,
          text: this.text,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#1890ff'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: "#ffffff",
          formatter(value) {
            let frame = `<div style="background-color: #ffffff"> <div style="color: #1890ff;">${value[0].data} 笔</div><div>`;
            return frame;
          },
          axisPointer: {
            lineStyle: {
              color: '#d9d8d8'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['CMCC', 'CTCC', 'CUCC'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#4c8cff'
          }
        },
        grid: { // 图表的大小
          top: 100,
          left: '2%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{ // 横坐标样式
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#d9d8d8'
            }
          },
          data: xAxis
        }],
        yAxis: [{ // 纵坐标样式
          type: 'value',
          name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              // 纵坐标线条颜色
              color: 'rgba(255, 255, 255, 0)'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#b6b6b6'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f9f9f9',
              width: 2
            }
          }
        }],
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10, // 原点大小
            showSymbol: false,
            lineStyle: { // 折线样式
              normal: {
                width: 1.5
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(86, 173, 255, 0.164)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#3d83ff',
                borderColor: 'ffffff',
                borderWidth: 120
              }
            },
            data: yAxis
          }
        ]
      })
    }
  }
}
</script>
