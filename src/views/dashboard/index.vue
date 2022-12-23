<template>
  <div class="index">
    <div class="topSize flex-row-between">
      <div class="top-left flex">
        <div class="arrow-left"></div>
        <div class="back" @click="backToHomePage">返回首页</div>
      </div>
      <div class="top-center flex align-center">
        <img src="../../assets/echartsImages/top-left.png" alt="" class="text-left" />
        <div class="text-center">山东省公共资源交易中心联盟链数据大屏</div>
        <img src="../../assets/echartsImages/top-right.png" alt="" class="text-right" />
      </div>
      <div class="data">{{ nowDate }}</div>
    </div>
    <div class="content">
      <div class="content-kuang flex-row-between">
        <div class="content-left flex-column-between">
          <div class="left-top flex-row-between" style="flex: 1;height: 0;">
            <div class="map-left flex-column-between">
              <div class="text-box flex-row-between">
                <div class="box">
                  <div class="box-bg-kuang">
                    <div class="data-title">节点数</div>
                    <div class="data-num blue">{{ nodeCount }}</div>
                  </div>
                </div>
                <div class="box">
                  <div class="box-bg-kuang">
                    <div class="data-title">总存证</div>
                    <div class="data-num yellow">{{ transactionCount }}</div>
                  </div>
                </div>
                <div class="box">
                  <div class="box-bg-kuang">
                    <div class="data-title">今日存证</div>
                    <div class="data-num red">{{ todayTransactionCount }}</div>
                  </div>
                </div>
                <div class="box">
                  <div class="box-bg-kuang">
                    <div class="data-title">部署合约</div>
                    <div class="data-num green">{{ contractCount }}</div>
                  </div>
                </div>
              </div>
              <div class="node">
                <div class="node-kuang">
                  <div class="text-title">节点存证列表</div>
                  <div class="node-content">
                    <div class="node-line flex-row-between">
                      <div class="node-left">存证哈希</div>
                      <div class="node-data">存证时间</div>
                    </div>
                    <div class="node-scroll">
                      <div class="node-line flex-row-between" v-for="(item, index) in List" :key="index">
                        <div class="node-left-shiji">
                          {{ item.transHash }}
                        </div>
                        <div class="node-kong"></div>
                        <div class="node-data-shiji">
                          {{ item.blockTimestamp }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="map">
              <div class="map-bg" id="shandongMap"></div>
              <!-- <img src="../../static/index/map.png" alt="" class="map-bg" /> -->
            </div>
          </div>
          <div class="state">
            <div class="state-kuang">
              <div class="text-title">节点状态监控</div>
              <div class="state-content flex-row-between">
                <div class="state-left flex-row-between">
                  <div class="state-box">
                    <div class="percent">{{ cpuPercent }}%</div>
                    <div class="state-circle" id="mychart-circle1"></div>
                    <div class="state-title">cpu</div>
                  </div>
                  <div class="state-box">
                    <div class="percent">{{ memoryPercent }}%</div>
                    <div class="state-circle" id="mychart-circle2"></div>
                    <div class="state-title">cpu</div>
                  </div>
                  <div class="state-box">
                    <div class="percent">{{ diskPercent }}%</div>
                    <div class="state-circle" id="mychart-circle3"></div>
                    <div class="state-title">cpu</div>
                  </div>
                </div>
                <div class="state-right" id="mychart-state-borken-line"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right flex-column-between">
          <div class="histogram">
            <div class="bg-kuang">
              <div class="text-title">7日总量</div>
              <div class="echart-histogram" id="mychart-histogram"></div>
            </div>
          </div>
          <div class="borken-line">
            <div class="bg-kuang">
              <div class="text-title">活跃节点</div>
              <div class="echart-histogram gird" id="mychart-borken-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

import shandong from "./shandong.json";

export default {
  name: "Index",
  data() {
    return {
      token: "",
      List: [],
      nodeCount: "", //节点数量
      contractCount: "", //部署合约数量
      todayTransactionCount: 0, //今日存证量
      transactionCount: "", //总存证量
      dayList: [],
      transCountList: [],
      blockNumberList: [],
      txbpsList: [],
      rxbpsList: [],
      cpuPercent: "",
      memoryPercent: "",
      diskPercent: "",
      nowTime: "",
      mapList: [],
      arr: [],
      nowDate: "",
    };
  },
  mounted() {
    this.initBorkenLine();
    this.initCircle();
    this.toLogin();
    this.getMap();
    this.getTime();
    this.currentTime();
  },
  methods: {
    backToHomePage() {
      this.$router.push({
        path: "/components/tinymce",
      });
    },
    initHistogram() {
      var option = {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0.5,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#FFF34D", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#FFB700", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        grid: {
          containLabel: true,
          top: "0",
          left: "1",
          bottom: "1px",
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(255, 255, 255,0.3)",
              width: 1,
            },
          },
          nameTextStyle: {
            color: "#FFFFFF",
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgb(255, 255, 255,0.3)",
              width: 1,
            },
          },
          data: this.dayList,
          type: "category",
          axisLabel: {
            color: "rgb(255, 255, 255,0.75)",
            fontFamily: "Noto Sans SC",
            fontWeight: "regular",
            fontSize: 12,
          },
        },
        series: [
          {
            type: "bar",
            data: this.transCountList,
            label: {
              show: true,
              position: "right",
              color: "#fff",
            },
          },
        ],
      };
      const myChart = echarts.init(
        document.getElementById("mychart-histogram")
      ); // 图标初始化
      myChart.setOption(option); // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initBorkenLine() {
      let showBalls = this.blockNumberList.map((item, index, arr) => {
        switch (arr.length) {
          case 1:
            return [
              Math.random() * 20 + 280,
              Math.random() * 150 + 40,
              item.agency,
              item.nodeIp,
            ];
          case 2:
            return [
              Math.random() * 20 + 110 * index + 40,
              Math.random() * 100 + 30,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];
          case 3:
            return [
              Math.random() * 20 + 100 * index + 40,
              Math.random() * 150 + 40,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];
          case 4:
            return [
              Math.random() * 30 + 90 * index + 30,
              Math.random() * 80 + 10,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];
          case 5:
            return [
              Math.random() * 20 + 80 * index + 40,
              Math.random() * 150 + 40,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];
          case 6:
            return [
              Math.random() * 20 + 60 * index + 40,
              Math.random() * 150 + 40,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];

          default:
            return [
              Math.random() * 100 + 50 * index,
              Math.random() * 180 + 40,
              item.agency,
              item.nodeIp,
              item.pbftView, //共识视图
              item.createTime,
            ];
        }
      });
      let ballsPoint = showBalls.map((item, index) => {
        return [item[0], item[1]];
      });
      let showPoint = [];
      for (let i = 0; i < showBalls.length - 1; i++) {
        for (let j = showBalls.length - 1; j > i; j--) {
          showPoint.push([
            {
              coord: showBalls[i],
            },
            {
              coord: showBalls[j],
            },
          ]);
        }
      }
      let option = {
        grid: {
          x: "5%",
          y: "10%",
          x2: "5%",
          y2: "5%",
          show: false,
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "cartesian2d",
            data: showBalls,
            symbolSize: function (value) {
              return value[2] == "jinzhiwen" ? 10 : 20;
            },
            rippleEffect: {
              brushType: "stroke",
            },
            color: "rgba(51, 113, 208, 1)",
            label: {
              color: "#4F94FF",
              position: "bottom",
              show: true,
              fontSize: 16,
              offset: [0, 10],
              fontFamily: "PingFang SC",
              fontWeight: "medium",
              formatter: function (p) {
                return p.value[2];
              },
            },
            tooltip: {
              // position: function (p) {
              //   //其中p为当前鼠标的位置
              //   return [0, 0];
              // },
              trigger: "item",
              formatter(params) {
                let arr = [params.value[2], "节点数：/s", params.value[3]];
                return (
                  "<div class='text-echarts' style='text-align: left'><p>机构IP：" +
                  params.value[3] +
                  "</p><p>机构名称：" +
                  params.value[2] +
                  "</p><p>共识视图：" +
                  params.value[4] +
                  "</p><p>创建时间：" +
                  params.value[5] +
                  "</p></p>"
                );
              },
              backgroundColor: "rgba(159,197,255, 0.15)",
              borderColor: "#3371D0",
              borderWidth: 1,
              extraCssText: "border-radius:0;border: 1px solid #3371D0;",
              padding: [10, 10],
              textStyle: {
                color: "#FFFFFF",
                fontFamily: "PingFang SC",
                fontWeight: "medium",
                fontSize: 16
              }
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              number: 2,
              scale: 1,
            },
            emphasis: {
              show: true,
              focus: "self",
              scale: true,
            },
            markLine: {
              data: showPoint,
              silent: true,
              symbol: "none",
            },
          },
        ],
      };

      const myChart = echarts.init(
        document.getElementById("mychart-borken-line")
      ); // 图标初始化
      myChart.setOption(option); // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initCircle() {
      const option1 = {
        tooltip: {
          trigger: "item",
        },
        color: ["#2876DB", "#44E7FF"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "90%"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
            ],
          },
        ],
      };
      const option2 = {
        tooltip: {
          trigger: "item",
        },
        color: ["#FFB700", "#FFF45C"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "90%"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
            ],
          },
        ],
      };
      const option3 = {
        tooltip: {
          trigger: "item",
        },
        color: ["#006765", "#00D6D2"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "90%"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
            ],
          },
        ],
      };
      const myChart1 = echarts.init(document.getElementById("mychart-circle1")); // 图标初始化
      const myChart2 = echarts.init(document.getElementById("mychart-circle2")); // 图标初始化
      const myChart3 = echarts.init(document.getElementById("mychart-circle3")); // 图标初始化
      myChart1.setOption(option1); // 渲染页面
      myChart2.setOption(option2); // 渲染页面
      myChart3.setOption(option3); // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
      });
    },
    initStateBorkenLine() {
      var option = {
        // backgroundColor: "rgba(51, 113, 208, 0.3)",
        color: ["#93CC77", "#4F94FF"],
        tooltip: {
          trigger: false,
        },
        legend: {
          data: ["上行宽带", "下行宽带"],
          textStyle: {
            color: "rgba(255, 255, 255, 0.75)",
            fontSize: 12,
          },
          top: 0,
          icon: "circle",
          itemWidth: 6,
        },
        grid: {
          left: "0",
          top: "24px",
          bottom: "5%",
          right: "6px",
          containLabel: true,
        },
        xAxis: {
          axisTick: {
            show: false,
          },
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
          },
          axisLabel: {
            //  color: "rgba(255, 255, 255, 0.75)",
            fontSize: "12",
            fontFamily: "Noto Sans SC",
            fontWeight: "regular",
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },

            axisLabel: {
              fontSize: "12",
              fontFamily: "Noto Sans SC",
              fontWeight: "regular",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.15)",
              width: 1,
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "上行宽带",
            type: "line",
            smooth: "true",
            showSymbol: false,
            data: this.txbpsList,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147,204,119, 0.2)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147,204,119, 0)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            name: "下行宽带",
            smooth: "true",
            type: "line",
            showSymbol: false,
            data: this.rxbpsList,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(79,148,255, 0.2)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(79,148,255, 0)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      const myChart = echarts.init(
        document.getElementById("mychart-state-borken-line")
      ); // 图标初始化
      myChart.setOption(option); // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initMap() {
      echarts.registerMap("shandong", shandong);
      const option = {
        tooltip: {
          formatter: (parames) => {
            return (
              parames.name +
              "\n" +
              "更新数量：" +
              (parames.value || 0) +
              "\n" +
              "新增数量：" +
              (parames.data ? parames.data.createdCount : 0)
            );
          },
        },
        series: [
          {
            type: "map",
            map: "shandong",
            roam: false,
            zoom: 1.3,
            label: {
              show: true,
            },
            itemStyle: {
              normal: {
                color: "#fff",
                borderWidth: 0.5, //区域边框宽度
                areaColor: "rgb(20,93,189)",
                borderColor: "#2A94DD",
                label: {
                  show: false,
                },
              },
              emphasis: {
                // 移入背景颜色
                areaColor: "rgba(20,93,189,0.5)",
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            top: "10%", //组件距离容器的距离
            data: this.mapList,
          },
        ],
        //地图上二开点线特效数组
      };
      const myChart = echarts.init(document.getElementById("shandongMap")); // 图标初始化
      myChart.setOption(option); // 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 左中 节点存证列表
    getNodeList() {
      this.$api.get(
        "/mgr/WeBASE-Node-Manager/transaction/transList/1/1/10",
        {},
        (r) => {
          var res = r.data;
          if (res.code == 0) {
            this.List = res.data;
          }
        }
      );
    },
    toLogin() {
      this.token = this.$Cookies.get("token");
      this.getNode();
      this.getNodeList();
      this.getPlaceNum();
      this.getState();
      this.getActiveNode();
    },
    // 左上 节点 右上 近七日数据总量
    getNode() {
      this.$api.get("/mgr/WeBASE-Node-Manager/group/general/1", {}, (r) => {
        var res = r.data;
        if (res.code == 0) {
          this.nodeCount = res.data.nodeCount; //节点数量
          this.contractCount = res.data.contractCount; //部署合约数量
          this.transactionCount = res.data.transactionCount; //总存证量
        }
      });
    },
    // 左上 今日存证量+近7日存证量（需要登陆）
    getPlaceNum() {
      this.$api.get(
        "/mgr/WeBASE-Node-Manager/group/transDaily/1",
        {},
        (res) => {
          console.log("大屏", res);
          var res = res.data;
          if (res.code == 0) {
            res.data.sort(function (a, b) { return new Date(a.day).getTime() - new Date(b.day).getTime() })

            this.arr = res.data.slice(res.data.length - 7)
            this.arr.forEach((item, index) => {
              this.transCountList.push(item.transCount);
              this.dayList.push(item.day);
              console.log(item.transCount,11111111111)
              if (index == res.data.length - 1) {
                this.todayTransactionCount = item.transCount;
              }
            });
            this.initHistogram();
          }
        }
      );
    },
    //中间 山东省地图
    getMap() {
      const url = "http://117.73.255.53:8083/api/chain/getStatisticsByCity";
      // 在axios中，使用promise语法代替回调函数
      this.axios({
        method: "get",
        url: url,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      })
        // 成功后执行
        .then((result) => {
          //result 就是请求的结果
          console.log("getStatisticsByCity",result);
          var res = result.data;
           console.log("res",res);
          if (res.code == 0) {
            res.data.forEach((item, index) => {
              this.mapList.push({
                name: item.name,
                value: item.updatedCount,
                createdCount: item.createdCount,
              });
            });
            console.log("this.mapList",this.mapList);
            this.initMap();
          }
        })
        // 错误处理
        .catch((err) => { });
    },
    getTime() {
      var g = new Date(); //北京时间：当前13位时间戳
      var year = g.getFullYear(); //取得4位数的年份
      var month = g.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = g.getDate(); //返回日期月份中的天数（1到31）
      var hour = g.getHours(); //返回日期中的小时数（0到23）
      var minute = g.getMinutes(); //返回日期中的分钟数（0到59）
      var second = g.getSeconds(); //返回日期中的秒数（0到59）
      this.nowTime =
        year +
        "-" +
        this.add(month) +
        "-" +
        this.add(date) +
        "  " +
        this.add(hour) +
        ":" +
        this.add(minute) +
        ":" +
        this.add(second);
      // setTimeout(() => {
      //   this.getTime()
      // }, 1000);
    },
    add(x) {
      return x < 10 ? "0" + x : x;
    },
    getArrayNull(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          return arr[i];
        }
      }
    },
    // 左下 节点状态监控
    getState() {
      var g = new Date(); //北京时间：当前13位时间戳
      var year = g.getFullYear(); //取得4位数的年份
      var month = g.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = g.getDate(); //返回日期月份中的天数（1到31）
      var hour = g.getHours(); //返回日期中的小时数（0到23）
      var minute = g.getMinutes(); //返回日期中的分钟数（0到59）
      var second = g.getSeconds(); //返回日期中的秒数（0到59）
      var todayDate = year + "-" + this.add(month) + "-" + this.add(date);
      var nowTime =
        this.add(hour) + ":" + this.add(minute) + ":" + this.add(second);

      this.$api.get(
        "/mgr/WeBASE-Node-Manager/performance/ratio/1?gap=60&beginDate=" +
        todayDate +
        "T00:00:00&endDate=" +
        todayDate +
        "T" +
        nowTime +
        "&contrastBeginDate=&contrastEndDate=&groupId=1",
        {},
        (result) => {
          //result 就是请求的结果
          var res = result.data;
          if (res.code == 0) {
            var list = res.data;
            list.forEach((item, index) => {
              if (item.metricType == "cpu") {
                this.cpu = item.data.lineDataList.valueList;
              }
              if (item.metricType == "memory") {
                this.memory = item.data.lineDataList.valueList;
              }
              if (item.metricType == "disk") {
                this.disk = item.data.lineDataList.valueList;
              }
              if (item.metricType == "txbps") {
                this.txbpsList = item.data.lineDataList.valueList;
              }
              if (item.metricType == "rxbps") {
                this.rxbpsList = item.data.lineDataList.valueList;
              }
            });
            this.cpuPercent = this.getArrayNull(this.cpu);
            this.memoryPercent = this.getArrayNull(this.memory);
            this.diskPercent = this.getArrayNull(this.disk);
            this.initStateBorkenLine();
          }
        }
      );
    },
    // 右下 活跃节点
    getActiveNode() {
      this.$api.get(
        "/mgr/WeBASE-Node-Manager/node/nodeList/1/1/100",
        {},
        (res) => {
          var res = res.data;
          if (res.code == 0) {
            this.blockNumberList = res.data.map((item, index) => {
              return {
                agency: item.agency ? item.agency : "-",
                nodeIp: item.nodeIp ? item.nodeIp : "-",
                pbftView: item.pbftView ? item.pbftView : "-", //共识视图
                createTime: item.createTime ? item.createTime : "-",
              };
            });
            this.initBorkenLine();
          }
        }
      );
    },
    getDay(beforeDate) {
      const temp = [];
      for (let i = 0; i < beforeDate; i++) {
        const time = new Date(new Date().setDate(new Date().getDate() - i));
        const year = `${time.getFullYear()}`;
        const month = `0${time.getMonth() + 1}`.slice(-2);
        const strDate = `0${time.getDate()}`.slice(-2);
        temp.push(`${year}-${month}-${strDate}`);
      }
      return temp;
    },
    /*
     *  右上时间
     */
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
  },
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate);
    }
  },
};
</script>

<style>
.text-echarts p {
  margin: 5px 0;
}
</style>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

/* .index {
  font-size: calc(100 * 100vw / 1200);
} */

body {
  margin: 0;
  padding: 0;
  font-size: 0.16rem;
}

/* ==================
          布局
 ==================== */

/*  -- flex弹性布局 -- */

.flex {
  display: flex;
}

.flex-twice {
  flex: 2;
}

.flex-treble {
  flex: 3;
}

.flex-direction {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-stretch {
  align-items: stretch;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: flex-center;
}

.self-end {
  align-self: flex-end;
}

.self-stretch {
  align-self: stretch;
}

.align-stretch {
  align-items: stretch;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.flex-row-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-row-around {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-column-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-grow-1 {
  flex-grow: 1;
}

.flex-shrink-zero {
  flex-shrink: 0;
}
</style>
