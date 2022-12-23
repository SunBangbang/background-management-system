<template>
  <div class="editor-container" v-loading="loading">
    <el-card>
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{
          background: '#eaeaea',
          color: '#000',
          padding: '0.9375rem',
        }"
        :cell-style="{ padding: '0.9375rem' }"
      >
        <el-table-column label="节点id" prop="nodeId" min-width="400" show-overflow-tooltip />
        <el-table-column label="城市" prop="agency" />
        <el-table-column label="块高" prop="blockNumber" />
        <el-table-column label="状态">
          <button
            style="
              background: #67bf3a;
              color: #ffffff;
              border-width: 0px;
              border-radius: 20px;
              width: 60px;
              line-height: 35px;
            "
          >
            运行
          </button>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 15px">
        <el-col :span="12" :offset="9">
          <el-pagination
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="page.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="page.totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NodeList",
  data() {
    return {
      tableData: [],
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(currentPage = 1, pageSize = 10) {
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/node/nodeList/1/${currentPage}/${pageSize}`,
        {},
        ({ data }) => {
          this.tableData = data.data;
          this.page.totalCount = parseInt(data.totalCount);
          this.loading = false
        }
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val);
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped>
.editor-container {
  padding: 1rem;
}
</style>
