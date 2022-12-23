<template>
  <div>
    <el-card style="margin: 1.2rem">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item size="small">
          <el-input v-model="formInline.contractAddress" placeholder="请输入合约地址" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="contractManagement"
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{ backgroundColor: '#ececec' }"
      >
        <el-table-column label="合约地址" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-copy-document" style="font-size: .6rem; margin-right: .3rem;" @click="copyUrl(scope.row.address)" />
            <span>{{ scope.row.contractAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractName" label="合约名称" width="180" show-overflow-tooltip />
        <el-table-column prop="contractStatus" label="合约状态" show-overflow-tooltip />
        <el-table-column label="合约abi" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-copy-document" style="font-size: .6rem; margin-right: .3rem;" @click="copyUrl(scope.row.address)" />
            <span>{{ scope.row.contractAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      formInline: {
        contractName: '',
        contractAddress: ''
      },
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    // 'formInline.contractName': {
    //   handler(value) {
    //     this.formInline.contractAddress = value
    //   }
    // }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    getList(currentPage = 1, pageSize = 10) {
      const { formInline } = this
      this.$api.get(`/mgr/WeBASE-Node-Manager/abi/list/all/1/${currentPage}/${pageSize}`, formInline, ({ data }) => {
        this.tableData = data.data
        this.page.totalCount = parseInt(data.totalCount)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.getList(val)
      console.log(`当前页: ${val}`)
    },
    /*
    *点击复制
    */
    copyUrl(item) {
      var cInput = document.createElement('input')
      cInput.value = item
      document.body.appendChild(cInput)
      cInput.select()
      document.execCommand('copy')
      this.$message.success('复制成功')
      document.body.removeChild(cInput)
    }
  }
}
</script>

