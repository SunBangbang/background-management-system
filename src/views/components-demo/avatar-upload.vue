<template>
  <div class="deposit_info">
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-form inline :model="deposit_info_search">
            <el-form-item>
              <el-input v-model="deposit_info_search.blockNumber" placeholder="请输入存证哈希" />
            </el-form-item>
            <el-form-item>
              <el-button @click="onSumit"  type="primary">查询</el-button>
              <el-button type="info" style="margin-left: 10px" @click="Reset" size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" highlight-current-row @row-click="rowClick" :row-key="getRowKeys"
            :expand-row-keys="expands" @expand-change="expandSelect" ref="tableList"
            header-cell-class-name="table-header">
            <el-table-column type="expand">
              <template slot-scope="scope" >
                <el-card v-loading="loading">
                  <div style="display: flex; height: 40px">
                    <div class="line" style="
                        width: 5px;
                        height: 20px;
                        background-color: #188efb;
                      " />
                    <div style="
                        color: #188efb;
                        font-size: 18px;
                        margin-left: 0.2rem;
                      ">
                      存证信息
                    </div>
                  </div>
                  <el-form inline>
                    <el-form-item label="区块哈希:" style="width: 100%">{{
                        expandsData.blockHash
                    }}</el-form-item>
                    <el-form-item label="区块高度:" style="width: 15%">{{
                        expandsData.blockNumber
                    }}</el-form-item>
                    <el-form-item label="发起者地址:" style="width: 40%">{{
                        expandsData.from
                    }}</el-form-item>
                    <el-form-item label="合约地址:" style="width: 40%">{{
                        expandsData.to
                    }}</el-form-item>
                    <el-form-item label="存证哈希:" style="width: 56%">{{
                        expandsData.transactionHash
                    }}</el-form-item>
                    <el-form-item label="时间戳:" style="width: 40%">{{
                        scope.row.blockTimestamp
                    }}</el-form-item>
                    <el-form-item label="存证数据:">
                      <div v-for="(item, index) in expandsData.input" :key="index">
                        <div @click="toPush">
                      <li class="el-icon-copy-document"></li>
                      <span style="margin: .8rem">{{ item }}</span>
                        </div>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-card>
              </template>
            </el-table-column>
            <el-table-column label="存证哈希" min-width="180" prop="transHash" />
            <el-table-column label="块高" prop="blockNumber" />
            <el-table-column label="创建时间" prop="createTime" />
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-col :span="12" :offset="9">
          <el-pagination :current-page="page.currentPage" :page-sizes="[10, 20, 50]" :page-size="page.pageSize"
            layout="total, prev, pager, next, jumper" :total="page.totalCount" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DepositInfo",
  data() {
    return {
      loading: true,
      expands: [],
      expandsData: "",
      tableData: [],
      deposit_info_search: {
        blockNumber: "",
        transactionHash: "",
      },
      showData: false,
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  watch: {
    "deposit_info_search.blockNumber": {
      handler(value) {
        this.showData = Boolean(value);
        this.deposit_info_search.transactionHash = value;
      },
    },
  },
  created() {
    // this.getList();
    this.getListSearch();
  },
  methods: {
    // 解析
    get_max(data) {
      let axiosData = {
        abiList: [],
        decodeType: 1,
        input: data,
      };
      this.$api.post(
        "http://117.73.255.53:5002/WeBASE-Front/tool/decode",
        axiosData,
        (res) => {
          let { expandsData } = this;
          expandsData.input = res.data;
          this.loading = false
          console.log(expandsData.input);
        }
      );
    },
    getRowKeys(row) {
      return row.transHash;
    },
    rowClick(row) {
      //点击行时展开收起
      this.$refs.tableList.toggleRowExpansion(row);
    },
    expandSelect(row, expandedRows) {
      this.loading = true
      if (expandedRows.length > 0) {
        this.$api.get(
          `/mgr/WeBASE-Node-Manager/transaction/transactionReceipt/1/${row.transHash}`,
          {},
          (res) => {
            if (res.data.code == 0) {
              this.expandsData = res.data.data;
              let inputData = { ...res.data.data };
              this.get_max(inputData.input);
            }
          }
        );
      }
    },
    getList(currentPage = 1, pageSize = 10, transactionHash) {
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/transaction/transList/1/${currentPage}/${pageSize}?transactionHash=${transactionHash}`,
        {},
        ({ data }) => {
          if (data.data != null) {
            this.tableData = data.data;
            this.page.totalCount = data.totalCount;
          }else{
            this.tableData =[]
          }
        }
      );
    },
    // 查询
    onSumit() {
      this.getList(
        this.page.currentPage,
        this.page.pageSize,
        this.deposit_info_search.transactionHash
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.showData = true;
      const { showData, getList, getListSearch } = this;
      showData ? getListSearch(val) : getList(val);
      console.log(`当前页: ${val}`);
    },
    getListSearch(currentPage = 1, pageSize = 10) {
      const { blockNumber, transactionHash } = this.deposit_info_search;
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/transaction/transList/1/${currentPage}/${pageSize}`,
        {},
        ({ data }) => {
          this.tableData = data.data;
          this.page.totalCount = parseInt(data.totalCount);
        }
      );
    },
    // 重置
    Reset() {
      this.deposit_info_search.blockNumber = "";
      this.getListSearch();
    },
    toPush() {
      this.$router.push({
        path: "/components/split-pane"
      })
    }
  },
};
</script>

<style scoped>
.deposit_info {
  padding: 1rem;
}

/* /deeep/样式穿透*/
/*1.取消原本展开的旋转动效*/
.deposit_info>>>.el-table__expand-icon {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

/*2.展开按钮未点击的样式是加号带边框*/
.deposit_info>>>.el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e6d9";
  border: 1px solid #ccc;
  border-radius: 100%;
  color: #fff;
  background: #188efb;
  padding: 1px;
}

/*2.按钮已点击展开之后的样式是减号带边框*/
.deposit_info>>>.el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e6d8";
}
</style>