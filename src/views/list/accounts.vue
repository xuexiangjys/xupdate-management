<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="accountData" v-loading="loading" highlight-current-row style="width: 100%" border>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="loginName" label="用户名" width="120"></el-table-column>
        <el-table-column property="password" label="密码" width="120"></el-table-column>
        <el-table-column property="nick" label="别名" width="120"></el-table-column>
        <el-table-column property="authority" label="权限" width="100">
          <template slot-scope="scope">
            <span>{{formatAuthority(scope.row.authority)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="phone" label="手机号" width="150"></el-table-column>
        <el-table-column property="registerTime" label="注册时间" width="160" sortable>
          <template slot-scope="scope">
            <span>{{changeDateFormat(scope.row.registerTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="注册地址" width="250"></el-table-column>

        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
        @pagination="fetchData" />

      <el-dialog title="修改账户信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectAccount" :rules="accountrules" ref="userForm" label-width="100px">
          <el-form-item label="用户名" prop="loginName">
            <el-input v-model="selectAccount.loginName" placeholder="请输入用户名（登录使用）"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="selectAccount.password" placeholder="请输入密码（登录使用）"></el-input>
          </el-form-item>
          <el-form-item label="别名" prop="nick">
            <el-input v-model="selectAccount.nick" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="authority">
            <el-select v-model="selectAccount.authority" placeholder="请选择账户类型">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="editor"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="selectAccount.phone" placeholder="请输入手机号" oninput="value=value.replace(/[^\d]/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="registerTime">
            <el-date-picker v-model="selectAccount.registerTime" align="right" type="datetime" placeholder="选择注册时间"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="selectAccount.address" placeholder="请输入账户注册地址"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getPagingAccounts,
    deleteAccount,
    updateAccount
  } from '@/api/account'
  import {
    isEmpty
  } from '@/utils/validate'
  import {
    formatDate,
    updateTableItem,
    deleteTableItem
  } from '@/utils/index'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        accountData: [],
        accountrules: {
          loginName: [{
            required: true,
            message: "请输入用户名（登录使用）",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码（登录使用）",
            trigger: "blur"
          }],
          nick: [{
            required: true,
            message: "请输入别名",
            trigger: "blur"
          }],
          authority: [{
            required: true,
            message: "请选择账户类型",
            trigger: "change"
          }]
        },
        selectAccount: {},
        dialogFormVisible: false,
        loading: true,
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        }
      };
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getPagingAccounts(this.listQuery).then(response => {
          const pageData = response.data;
          if (pageData) {
            this.accountData = pageData.array;
            this.total = pageData.total;
            this.loading = false;
          }
        })
      },
      formatAuthority(authority) {
        switch (authority) {
          case 'admin':
            return "管理员";
          case 'editor':
            return "普通用户";
          default:
            return "未知";
        }
      },
      changeDateFormat(registerTime) {
        if (isEmpty(registerTime)) {
          return registerTime;
        }
        return formatDate(new Date(registerTime), "yyyy-MM-dd HH:mm:ss");
      },
      handleEdit(index, row) {
        this.selectAccount = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['userForm'].clearValidate()
        })
      },
      handleDelete(index, row) {
        this.$confirm("账户删除后将无法恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            deleteAccount(row).then(response => {
              if (response.data) {
                deleteTableItem(this.accountData, row, 'accountId');
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
          })
          .catch(() => {});
      },
      updateInfo() {
        this.$refs['userForm'].validate(valid => {
          if (valid) {
            updateAccount(this.selectAccount).then(response => {
              if (response.data) {
                this.dialogFormVisible = false;
                updateTableItem(this.accountData, this.selectAccount, 'accountId');
                this.$message({
                  type: "success",
                  message: "编辑成功!"
                });
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  };

</script>

<style lang="scss">
  @import "../../styles/mixin";

  .table_container {
    padding: 20px;
  }

</style>
