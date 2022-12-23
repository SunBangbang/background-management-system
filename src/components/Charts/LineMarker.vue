<template>
  <div :id="id" :class="className" :style="{ height: height, width: width, margin: '8px 0' }">
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(obj) {
      const chartDom = document.getElementById(this.id);
      let chartOne = echarts.getInstanceByDom(chartDom);
      if (chartOne == undefined) {
        chartOne = echarts.init(chartDom)
      }
      chartOne.setOption({
        backgroundColor: "#ffffff",
        title: {
          top: 20,
          text: this.text,
          textStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#1890ff",
          },
          left: "1%",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#ffffff",
          formatter(value) {
            let frame = `<div style="background-color: #ffffff"> <div style="color: #1890ff;">${value[0].axisValue}</div><div style="color: #b2b2b2">显示日数据：${value[0].data}</div><div>`;
            return frame;
          },
          axisPointer: {
            lineStyle: {
              color: "#1890ff",
            },
          },
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          type: 'scroll',   //关键地方
          itemGap: 5,
          data: ["显示日数据", "CTCC", "CUCC"],
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#4c8cff",
          },
        },
        grid: {
          top: 100,
          left: "2%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#d9d8d8",
              },
            },
            axisLabel: { //设置x轴的字
              show: true,
              interval: 0,//使x轴横坐标全部显示
              textStyle: {//x轴字体样式
                color: "rgba(219,225,255,1)",
                margin: 15
              },
              rotate: 30
            },
            data: obj.xAxis

          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(%)",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#b6b6b6",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#f9f9f9",
                width: 2,
              },
            },
          },
        ],
        series: [
          {
            name: "CMCC",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
          },
          {
            name: "显示日数据",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1.5,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(86, 173, 255, 0.164)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 136, 212, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "#3d83ff",
                borderColor: "ffffff",
                borderWidth: 120,
              },
            },
            data: obj.yAxis,
          },
        ],
      }, true);
    },
  },
};
</script>
<style>
</style>

