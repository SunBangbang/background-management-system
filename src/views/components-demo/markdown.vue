<template>
  <div>
    <el-card class="elCard" v-loading="loading">
      <div class="chart-container">
        <chart
          height="100%"
          width="100%"
          text="关键监控指标"
          :x-axis="xAxis"
          :y-axis="yAxis"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import Chart from "./markdown/markdown4";
export default {
  name: "Markdown4",
  components: { Chart },
  data() {
    return {
      loading: true,
      xAxis: [],
      yAxis: [],
    };
  },
  created() {
    this.$api.get("/mgr/WeBASE-Node-Manager/group/transDaily/1", {}, (res) => {
      if (res.data.code == 0) {
        const INFO = res.data.data;
        let infos = this.MsgSort(INFO, "day");
        var AxisX = infos.map((el) => el.day)
        var AxisY = infos.map((el) => el.transCount)
        this.xAxis = AxisX.splice(0, 7)
        this.yAxis = AxisY.splice(0, 7)
        this.loading = false
      }else{
        this.$message.error(res.data.message)
        this.loading = false
      }
    });
  },
  methods: {
    MsgSort(obj, key) {
      obj.sort((a, b) => {
        let t1 = new Date(Date.parse(a[key].replace(/-/g, "/")));
        let t2 = new Date(Date.parse(b[key].replace(/-/g, "/")));
        return t1.getTime() - t2.getTime();
      });
      return obj;
    },
  },
};
</script>

<style scoped>
.elCard {
  margin: 1rem;
}
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
}

.suffix {
  width: 200px;
  height: 28px;
  border-radius: 20px;
  background-color: #f6f6f6;
  color: #969696;
  text-align: center;
  line-height: 28px;
  position: relative;
  top: -416px;
  left: 146px;
  font-size: 10px;
}
</style>