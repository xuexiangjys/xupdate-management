<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="accountData" v-loading="loading" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="loginName" label="用户名" width="120"></el-table-column>
        <el-table-column property="password" label="密码" width="120"></el-table-column>
        <el-table-column property="nick" label="别名" width="120"></el-table-column>
        <el-table-column property="authority" label="权限" width="100"></el-table-column>
        <el-table-column property="phone" label="手机号" width="150"></el-table-column>
        <el-table-column property="registerTime" label="注册时间" width="130">
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

      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="20" layout="total, prev, pager, next" :total="count"></el-pagination>
      </div>

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
            <el-date-picker v-model="selectAccountRegisterTime" align="right" type="date" placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="selectAccount.address" placeholder="请输入账户注册地址"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo('userForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getAccounts,
    deleteAccount,
    updateAccount
  } from '@/api/account'
  import {
    isEmpty
  } from '@/utils/validate'
  export default {
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
        selectIndex: 0,
        selectAccountRegisterTime: "",
        dialogFormVisible: false,
        loading: true,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
      };
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAccounts().then(response => {
          this.accountData = response.data;
          this.loading = false;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
      },
      changeDateFormat(registerTime) {
        if (isEmpty(registerTime)) {
          return registerTime;
        }
        var date = new Date(registerTime);
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return (date.getFullYear() + "-" + month +
          "-" + day);
      },
      handleEdit(index, row) {
        this.selectAccount = Object.assign({}, row) // copy obj
        this.selectAccountRegisterTime = this.changeDateFormat(row.registerTime);
        this.selectIndex = index;
        this.dialogFormVisible = true;
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
                this.accountData.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
          })
          .catch(() => {});
      },
      updateInfo(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const accountInfo = Object.assign({}, this.selectAccount)
            accountInfo.registerTime = new Date(this.selectAccountRegisterTime).getTime();
            updateAccount(accountInfo).then(response => {
              if (response.data) {
                this.dialogFormVisible = false;
                this.accountData.splice(this.selectIndex, 1, this.selectAccount);
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