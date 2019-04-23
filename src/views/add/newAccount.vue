<template>
  <div class="app-container">
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">添加新账户</header>
        <el-form :model="accountForm" :rules="accountrules" ref="accountForm" label-width="110px"
          class="form account_form">
          <el-form-item label="用户名" prop="loginName">
            <el-input v-model="accountForm.loginName" placeholder="请输入用户名（登录使用）"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="accountForm.password" placeholder="请输入密码（登录使用）"></el-input>
          </el-form-item>
          <el-form-item label="别名" prop="nick">
            <el-input v-model="accountForm.nick" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="authority">
            <el-select v-model="accountForm.authority" placeholder="请选择账户类型">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="editor"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="accountForm.phone" placeholder="请输入手机号" oninput="value=value.replace(/[^\d]/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="accountForm.address" placeholder="请输入账户注册地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAccount('accountForm')">添加账户</el-button>
            <el-button @click="resetForm('accountForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    validName
  } from '@/utils/validate'
  import {
    register
  } from '@/api/account'
  export default {
    data() {
      const validateLoginName = (rule, value, callback) => {
        if (!validName(value)) {
          callback(new Error('用户名必须是4~16位字母数字或符号！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!validName(value)) {
          callback(new Error('密码必须是4~16位字母数字或符号！'))
        } else {
          callback()
        }
      }
      return {
        accountForm: {
          loginName: "",
          password: "",
          nick: "",
          authority: "",
          phone: "",
          address: ""
        },
        accountrules: {
          loginName: [{
            required: true,
            validator: validateLoginName,
            trigger: "blur"
          }],
          password: [{
            required: true,
            validator: validatePassword,
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
        }
      };
    },
    created() {},
    methods: {
      addAccount(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            register(this.accountForm).then(response => {
              if (response.data) {
                this.$message({
                  type: "success",
                  message: "新账户添加成功!"
                });
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };

</script>

<style lang="scss">
  @import "../../styles/mixin";

  .form_header {
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .account_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
  }

</style>
