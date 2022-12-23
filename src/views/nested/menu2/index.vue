<template>
  <div>
    <el-card class="cardAccount">
      <div class="contentDistance">
        <el-button
          class="elButton"
          type="primary"
          size="small"
          @click="newAccount"
          >新增账号</el-button
        >
        <div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            :header-cell-style="{ backgroundColor: '#ececec' }"
          >
            <el-table-column prop="account" label="用户名" />
            <!-- <el-table-column prop="roleNameZh" label="角色" /> -->
            <el-table-column prop="email" label="邮箱" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span class="buttonDeep">
                  <el-button type="text" @click="delete_user(scope.row)"
                    >删除</el-button
                  >
                </span>
                <el-button type="text" @click="update_user(scope.row)"
                  >修改</el-button
                >
              </template>
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
        </div>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <span slot="title" class="titleStyle"> 创建账号</span>
      <el-form
        ref="formLabel"
        :model="formLabelAlign"
        inline
        size="small"
        label-width="80px"
      >
        <el-form-item label="账号">
          <el-input
            v-model="formLabelAlign.account"
            style="width: 18.75rem"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formLabelAlign.accountPwd"
            placeholder="请输入密码"
            style="width: 18.75rem"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="formLabelAlign.email"
            style="width: 18.75rem"
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改账号 -->
    <el-dialog
      :visible.sync="updataDialogVisible"
      width="30%"
      @close="handleClose"
    >
      <span slot="title" class="titleStyle"> 修改账号</span>
      <el-form
        ref="formLabel"
        :model="formLabelAlign"
        inline
        size="small"
        label-width="80px"
      >
        <el-form-item label="账号">
          <el-input
            v-model="formLabelAlign.account"
            style="width: 18.75rem"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="formLabelAlign.email"
            style="width: 18.75rem"
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataAddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      updataDialogVisible: false,
      dialogVisible: false,
      formLabelAlign: {
        account: "",
        accountPwd: "",
        email: "",
        roleId: "100000",
      },
      tableData: [],
      page: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    getRowClass() {
      return "background-color:#ececec;";
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList(currentPage = 1, pageSize = 10) {
      this.$api.get(
        `/mgr/WeBASE-Node-Manager/account/accountList/${currentPage}/${pageSize}`,
        {},
        ({ data }) => {
          this.tableData = data.data;
          this.page.totalCount = parseInt(data.totalCount);
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
    newAccount() {
      this.dialogVisible = true;
    },
    // 删除用户
    delete_user({ account }) {
      this.$confirm("是否永久删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.delete(
          `/mgr/WeBASE-Node-Manager/account/${account}`,
          {},
          (res) => {
            if (res.data.code === 0) {
              this.$message.success("删除成功！");
              this.getList();
            }
          }
        );
      });
    },
    // 修改用户
    update_user(row) {
      this.updataDialogVisible = true;
      this.formLabelAlign.account = row.account;
      this.formLabelAlign.email = row.email;
      this.formLabelAlign.accountPwd = row.email;
    },
    // 确定修改用户
    updataAddUser() {
      const { formLabelAlign } = this;
      this.$api.post(
        "/mgr/WeBASE-Node-Manager/account/accountInfo",
        formLabelAlign,
        (res) => {
          this.updataDialogVisible = false;
          this.getList();
        }
      );
    },
    // 添加用户
    addUser() {
      const { formLabelAlign } = this;
      var formData = JSON.parse(JSON.stringify(formLabelAlign))
     formData.accountPwd = this.$sha256(formData.accountPwd)
      this.$api.post(
        "/mgr/WeBASE-Node-Manager/account/accountInfo",
        formData,
        (res) => {
          if (res.data.code ==  202026) {
            this.$message.warning("账户信息已存在！")
          }
          this.dialogVisible = false;
          this.getList();
        }
      );
    },
    // 关闭弹窗
    handleClose() {
      this.$refs["formLabel"].resetFields();
    },
  },
};
</script>

<style scoped>
.buttonDeep >>> .el-button--text {
  color: red !important;
  padding-right: 0.5rem;
}
.buttonDeep >>> .el-form-item {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.cardAccount {
  margin: 1rem;
  .contentDistance {
    margin: 0 1rem;
  }
  .elButton {
    margin: 1rem 0;
  }
}
.titleStyle {
  font-size: 20px;
  font-weight: bold;
}
</style>
