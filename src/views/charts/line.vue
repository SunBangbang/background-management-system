<template>
  <div class="chart-container">
    <el-card shadow="never">
      <el-form size="small" inline :model="query">
        <el-form-item label="起止时间" prop="time" style="width: 100%">
          <el-date-picker
            v-model="query.time"
            type="daterange"
            unlink-panels
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd[T]HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button type="primary" style="margin-left: 1rem" @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div
      v-loading="loading"
      style="
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      "
    >
      <chart
        text="区块高度"
        height="300px"
        width="49%"
        ref="blockHeight"
        id="blockHeight"
      />
      <chart
        text="pbftView"
        height="300px"
        width="49%"
        ref="pbftView"
        id="pbftView"
      />
      <chart
        text="带打包的存证数"
        height="300px"
        width="49%"
        ref="pendingCount"
        id="pendingCount"
      />
      <chart
        text="平均块大小"
        height="300px"
        width="49%"
        ref="blockSizeEcharts"
        id="blockSizeEcharts"
      />
      <chart
        text="平均块周期"
        height="300px"
        width="49%"
        ref="blockCycleEcharts"
        id="blockCycleEcharts"
      />
      <chart text="平均TPS" height="300px" width="49%" ref="tps" id="tps" />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Charts/LineMarker";
function echartsData(timeArr, blockHeight) {
  const obj1 = {};
  timeArr.forEach((item, index) => {
    obj1[item] =
      obj1[item] == undefined
        ? blockHeight[index]
        : obj1[item] + blockHeight[index];
  });
  return obj1;
}
function forData(arr) {
  let arrData = [];
  for (let j = 0; j < arr.length; j++) {
    let valueList = arr[j];
    arrData.push(valueList);
  }
  return arrData;
}
export default {
  name: "LineChart",
  components: { Chart },

  data() {
    return {
      loading: true,
      query: {
        time: [],
        granularit: "1",
        xAxis: [],
        yAxis: [],
      },
    };
  },
  watch: {},
  // 查询
  mounted() {
    this.MonitoringList();
  },
  methods: {
    getBeforeDate() {
      var date = date || new Date(), timestamp, newDate;
      if (!(date instanceof Date)) {
        date = new Date(date.replace(/-/g, '/'));
      }
      timestamp = date.getTime();
      newDate = new Date(timestamp - 7 * 24 * 3600 * 1000);
      var month = newDate.getMonth() + 1;
      month = month.toString().length === 1 ? '0' + month : month;
      // var nowday = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
      // var nowMonth = date.getMonth() + 1
      // nowMonth = nowMonth.toString().length === 1 ? '0' + nowMonth : nowMonth
      var day = newDate.getDate().toString().length === 1 ? '0' + newDate.getDate() : newDate.getDate();
      return [newDate.getFullYear(), month, day].join('-')
      //  + '&' + [date.getFullYear(), nowMonth, nowday].join('-');
    },
    MonitoringList(startTime, endTimeS) {
      var time = new Date();
      var endTimeYear = time.getFullYear() + "",
        endTimeMonth = (time.getMonth() + 1).toString().padStart(2, "0"),
        endTimegetDate = time.getDate() + "",
        endTimeHours = time.getHours() + "",
      
        endtimeMinutes = time.getMinutes().toString().padStart(2, "0"),
        endTimeSeconds = time.getSeconds().toString().padStart(2, "0");
        if(endTimeHours<10){
          endTimeHours="0"+endTimeHours
        }
      const endDate = `${endTimeYear}-${endTimeMonth}-${endTimegetDate >= 10 ? endTimegetDate : '0' + endTimegetDate}T${endTimeHours}:${endtimeMinutes}:${endTimeSeconds}`;
      let url = null;
      let urlTow = null;
      if (!startTime || !endTimeS) {
        let endGetDate = this.getBeforeDate();
        // Math.abs(endTimegetDate - 7) >= 10 ? Math.abs(endTimegetDate - 7) : '0' + Math.abs(endTimegetDate - 7)
        url = `/mgr/WeBASE-Node-Manager/stat?beginDate=${endGetDate}T00:00:00&endDate=${endDate}&groupId=1`;
        urlTow = `/mgr/WeBASE-Node-Manager/chain/monitorInfo/1?beginDate=${endGetDate}T00:00:00&endDate=${endDate}&groupId=1`;
      } else {
        url = `/mgr/WeBASE-Node-Manager/stat?beginDate=${startTime}&endDate=${endTimeS}&groupId=1`;
        urlTow = `/mgr/WeBASE-Node-Manager/chain/monitorInfo/1?beginDate=${startTime}&endDate=${endTimeS}&groupId=1`;
      }
      this.$api.getMonitor(url, {}, (res) => {
        let arr = res.data.data.map((el) => el);
        let timAll = arr.map((el) => el.data.lineDataList);

        let timeArr = [];
        // 平均块大小
        let blockSizeList = [];
        // 块周期
        let blockCycle = [];
        // tps
        let tpsList = [];
        for (let i = 0; i < timAll.length; i++) {
          if (timAll[i].timestampList != null) {
            for (let j = 0; j < timAll[i].timestampList.length; j++) {
              let time = timAll[i].timestampList[j];
              let str = this.getDateTime(time);
              timeArr.push(str);
            }
            blockSizeList = forData(timAll[i].valueList);
            blockCycle = forData(timAll[1].valueList);
            tpsList = forData(timAll[2].valueList);
          }
        }
        this.$refs.blockSizeEcharts.initChart({
          xAxis: Object.keys(echartsData(timeArr, blockSizeList)),
          yAxis: Object.values(echartsData(timeArr, blockSizeList)),
        });
        this.$refs.blockCycleEcharts.initChart({
          xAxis: Object.keys(echartsData(timeArr, blockCycle)),
          yAxis: Object.values(echartsData(timeArr, blockCycle)),
        });
        this.$refs.tps.initChart({
          xAxis: Object.keys(echartsData(timeArr, tpsList)),
          yAxis: Object.values(echartsData(timeArr, tpsList)),
        });
      });
      // 其他三个
      this.$api.getMonitor(urlTow, {}, (res) => {
        let arr = res.data.data.map((el) => el);
        let timAll = arr.map((el) => el.data.lineDataList);
        let timeArr = [];
        // 区块高度
        let blockHeight = [];
        // pbftView
        let pbftView = [];
        // 带打包的存证数
        let pendingCount = [];
        for (let i = 0; i < timAll.length; i++) {
          if (timAll[i].timestampList != null) {
            for (let j = 0; j < timAll[i].timestampList.length; j++) {
              let time = timAll[i].timestampList[j];
              let str = this.getDateTime(time);
              timeArr.push(str);
            }
            blockHeight = forData(timAll[i].valueList);
            pbftView = forData(timAll[1].valueList);
            pendingCount = forData(timAll[2].valueList);
          }

          this.$refs.blockHeight.initChart({
            xAxis: Object.keys(echartsData(timeArr, blockHeight)),
            yAxis: Object.values(echartsData(timeArr, blockHeight)),
          });
          this.$refs.pbftView.initChart({
            xAxis: Object.keys(echartsData(timeArr, pbftView)),
            yAxis: Object.values(echartsData(timeArr, pbftView)),
          });
          this.$refs.pendingCount.initChart({
            xAxis: Object.keys(echartsData(timeArr, pendingCount)),
            yAxis: Object.values(echartsData(timeArr, pendingCount)),
          });
          this.loading = false;
        }
      });
    },
    // 格式化时间戳
    getDateTime(value) {
      let time = new Date(value);
      let year = time.getFullYear() + "/";
      let month = time.getMonth() + 1 + "/";
      let date = time.getDate();
      let str = String(year) + String(month) + String(date);
      return str;
    },
    search() {
      this.loading = true;
      this.MonitoringList(this.query.time[0], this.query.time[1]);
    },
  },
};
</script>

<style scoped>
.chart-container {
  padding: 20px;
  /* position: relative;
  width: 100%;
  height: calc(100vh - 84px); */
}
</style>
