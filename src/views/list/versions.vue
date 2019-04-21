<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="appData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="appKey" label="唯一号" width="120"></el-table-column>
        <el-table-column property="versionName" label="版本名" width="100"></el-table-column>
        <el-table-column property="versionCode" label="版本号" width="100"></el-table-column>
        <el-table-column property="appSize" label="应用大小" width="100"></el-table-column>
        <el-table-column property="forceUpdate" label="是否强制更新" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.forceUpdate ? "是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column property="uploadTime" label="发布日期" width="130"></el-table-column>
        <el-table-column property="modifyContent" label="更新内容" width="320"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="20" layout="total, prev, pager, next" :total="count"></el-pagination>
      </div>

      <el-dialog title="修改版本信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectApp" :rules="apprules" ref="appForm" label-width="100px">
          <el-form-item label="唯一号" prop="appKey">
            <el-input v-model="selectApp.appKey" placeholder="请输入应用的唯一号"></el-input>
          </el-form-item>
          <el-form-item label="版本名" prop="versionName">
            <el-input v-model="selectApp.versionName" placeholder="请输入应用版本名，例如：1.0.24"></el-input>
          </el-form-item>
          <el-form-item label="版本号" prop="versionCode">
            <el-input v-model="selectApp.versionCode" oninput="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入应用版本号，例如：24"></el-input>
          </el-form-item>
          <el-form-item label="是否强制更新" prop="updateStatus">
            <el-switch v-model="selectApp.updateStatus"></el-switch>
          </el-form-item>
          <el-form-item label="发布日期" prop="uploadTime">
            <el-date-picker v-model="selectApp.uploadTime" align="right" type="date" placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="更新内容" prop="modifyContent">
            <el-input type="textarea" v-model="selectApp.modifyContent" placeholder="请输入更新日志..."></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo('appForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        appData: [{
          appKey: "test",
          versionName: "1.0.24",
          versionCode: "24",
          appSize: "5M",
          forceUpdate: false,
          uploadTime: "2018-08-24",
          modifyContent: "1、优化api接口。\\r\\n2、添加使用demo演示。\\r\\n3、新增自定义更新服务API接口。\\r\\n4、优化更新提示界面。"
        }],
        apprules: {
          appKey: [{
            required: true,
            message: "请输入应用唯一号",
            trigger: "blur"
          }],
          versionName: [{
            required: true,
            message: "请输入版本名",
            trigger: "blur"
          }],
          versionCode: [{
            required: true,
            message: "请输入版本号",
            trigger: "blur"
          }]
        },
        selectApp: {},
        dialogFormVisible: false,
        currentRow: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
      },
      handleDownload(index, row) {
        this.$message({
          type: "success",
          message: "开始下载..."
        });
      },
      handleEdit(index, row) {
        this.selectApp = row;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm("版本删除后将无法恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.appData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {});
      },
      updateInfo(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
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