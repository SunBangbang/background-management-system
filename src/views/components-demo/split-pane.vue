<template>
  <div class="block_info">
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-form inline :model="block_info_search" size="small">
            <el-form-item>
              <el-input
                v-model="block_info_search.blockNumber"
                placeholder="请输入区块哈希"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 10px"
                @click="search"
                size="small"
                >查询</el-button
              >
              <el-button
                type="info"
                style="margin-left: 10px"
                @click="Reset"
                size="small"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            :header-cell-style="{
              background: '#eaeaea',
              color: '#000',
              padding: '.8rem 1.5rem',
            }"
            :cell-style="{ padding: '1rem' }"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="expandSelect"
          >
            <el-table-column type="expand" class="fbox-card">
              <template slot-scope="scope">
                <el-card shadow="never" class="box-card">
                  <div style="display: flex; height: 40px">
                    <div
                      class="line"
                      style="
                        width: 5px;
                        height: 20px;
                        background-color: #188efb;
                      "
                    />
                    <div
                      style="
                        color: #188efb;
                        font-size: 18px;
                        margin-left: 0.2rem;
                      "
                    >
                      存证信息
                    </div>
                  </div>
                  <el-form inline>
                    <el-form-item label="区块哈希:" style="width: 100%">{{
                      scope.row.pkHash
                    }}</el-form-item>
                    <el-form-item label="区块高度:" style="width: 15%">{{
                      expandsData[0].blockNumber
                    }}</el-form-item>
                    <el-form-item label="发起者地址:" style="width: 40%">{{
                      expandsData[0].transFrom
                    }}</el-form-item>
                    <el-form-item label="合约地址:" style="width: 40%">{{
                      expandsData[0].transTo
                    }}</el-form-item>
                    <el-form-item label="存证哈希:" style="width: 56%">{{
                      expandsData[0].transHash
                    }}</el-form-item>
                    <el-form-item label="时间戳:" style="width: 40%">{{
                      expandsData[0].blockTimestamp
                    }}</el-form-item>
                  </el-form>
                </el-card>
              </template>
            </el-table-column>
            <el-table-column label="块高" prop="blockNumber" width="150" />
            <el-table-column label="存证" prop="transCount" width="120" />
            <el-table-column
              label="区块哈希"
              prop="pkHash"
              show-overflow-tooltip
            />
            <el-table-column label="创建时间" prop="createTime" width="200" />
          </el-table>
        </el-col>
      </el-row>
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
  name: "BlockInfo",
  data() {
    return {
      expands: [],
      tableData: [],
      expandsData: "",
      block_info_search: {
        blockNumber: "",
      },
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(currentPage = 1, pageSize = 10, block_info_search = {}) {
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/block/blockList/1/${currentPage}/${pageSize}`,
        {},
        ({ data }) => {
          this.$api.get(
            `/mgr/WeBASE-Node-Manager/block/blockList/1/${currentPage}/${pageSize}`,
            {},
            ({ data: res }) => {
              var list = data.data;
              this.tableData = list.map((el, index) => {
                el["info"] = res.data[index];
                return el;
              });
              this.page.totalCount = parseInt(data.totalCount);
            }
          );
        }
      );
    },

    getRowKeys(rows) {
      return rows.blockNumber;
    },
    // 展开项
    expandSelect(row, expandedRows) {
      if (expandedRows.length > 0) {
        this.$api.get(
          `mgr/WeBASE-Node-Manager/transaction/transList/1/${this.page.currentPage}/${this.page.pageSize}/?blockNumber=${row.blockNumber}`,
          {},
          ({ data }) => {
            if (data.code == 0) {
              this.expandsData = data.data;
              console.log(data.data);
            }
          }
        );
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getList(val);
    },
    search(currentPage = "1", pageSize = "10") {
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/block/blockList/1/1/${pageSize}?pkHash=${this.block_info_search.blockNumber}`,
        {},
        (res) => {
          var list = res.data.data;
          this.tableData = list.map((el, index) => {
            el["info"] = res.data.data[index];
            return el;
          });
          this.page.totalCount = parseInt(res.data.totalCount);
        }
      );
    },
    Reset() {
      this.block_info_search.blockNumber = "";
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">
.block_info {
  padding: 2rem;
}
</style>
<style scoped>
.block_info >>> .el-card__body {
  padding: 2.5rem;
}

.block_info >>> .el-table {
  padding: 0px;
}

.block_info >>> .el-table .has-gutter {
  font-size: 0.8rem;
}

.block_info >>> .el-table__expanded-cell {
  padding: 10px 20px;
}

.box-card .el-form-item {
  margin-bottom: 0px;
}

.box-card >>> .el-card__body {
  padding: 1.5rem;
}

/* /deeep/样式穿透*/
/*1.取消原本展开的旋转动效*/
.block_info >>> .el-table__expand-icon {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

/*2.展开按钮未点击的样式是加号带边框*/
.block_info >>> .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e6d9";
  border: 1px solid #ccc;
  border-radius: 100%;
  color: #fff;
  background: #188efb;
  padding: 1px;
}

/*2.按钮已点击展开之后的样式是减号带边框*/
.block_info >>> .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e6d8";
}
</style>
