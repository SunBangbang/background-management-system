<template>
  <div class="node_front">
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="节点配置" name="1">
          <el-table :data="tableDataOne" stripe>
            <el-table-column label="前置编号" prop="frontId" />
            <el-table-column label="ip" prop="frontIp" />
            <el-table-column label="前置端口" prop="frontPort" />
            <el-table-column label="节点id" prop="nodeId" show-overflow-tooltip />
            <el-table-column label="节点版本" prop="clientVersion" />
            <el-table-column label="所属机构" prop="agency" />
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">
                <p>{{ scope.row.status | setStatus }}</p>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="150" />
            <el-table-column label="修改时间" prop="modifyTime" width="150" />
            <!-- <el-table-column label="操作"> -->
            <!-- <template slot-scope="scope"> -->
            <!-- <el-button type="text">删除</el-button> -->
            <!-- <el-button type="text">SDK证书下载</el-button> -->
            <!-- </template> -->
            <!-- </el-table-column> -->
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="节点列表" name="2">
          <el-table :data="tableDataTwo" stripe>
            <el-table-column label="节点id" prop="nodeId" show-overflow-tooltip />
            <el-table-column label="节点类型" prop="pbftView" width="100" />
            <el-table-column label="块高" prop="blockNumber" width="100" />
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">
                <p>{{ scope.row.nodeActive | setNodeActive }}</p>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top: 15px;">
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NodeFront',
  filters: {
    setStatus(status) {
      switch (status) {
        case 1: return '正常'
        default : return status
      }
    },
    setNodeActive(nodeActive) {
      switch (nodeActive) {
        case 1: return '活跃'
        default : return nodeActive
      }
    }
  },
  data() {
    return {
      tableDataOne: [],
      activeName: '1',
      tableDataTwo: [],
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getTableOne()
    this.getTableTwo()
  },
  methods: {
    getTableOne() {
      this.$api.get(`/mgr/WeBASE-Node-Manager/front/find/`, {}, ({ data }) => {
        this.tableDataOne = data.data
      })
    },
    getTableTwo(currentPage = 1, pageSize = 10) {
      this.$api.get(`/mgr/WeBASE-Node-Manager/node/nodeList/1/${currentPage}/${pageSize}`, {}, ({ data }) => {
        this.tableDataTwo = data.data
        this.page.totalCount = parseInt(data.totalCount)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.getTableTwo(val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="scss">
.node_front {
  padding: 1rem 1rem;
}
.box-card {
  padding: 0px 2rem;
}
</style>
