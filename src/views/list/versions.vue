<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="appData" v-loading="loading" highlight-current-row style="width: 100%" border>
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column property="appKey" label="唯一号" width="200" sortable></el-table-column>
        <el-table-column property="versionName" label="版本名" width="100"></el-table-column>
        <el-table-column property="versionCode" label="版本号" width="100" sortable></el-table-column>
        <el-table-column property="apkSize" label="应用大小(M)" width="100">
          <template slot-scope="scope">
            <span>{{(scope.row.apkSize / 1024).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="updateStatus" label="是否强制更新" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.updateStatus == 2 ? "是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column property="uploadTime" label="发布日期" width="130" sortable>
          <template slot-scope="scope">
            <span>{{changeDateFormat(scope.row.uploadTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="modifyContent" label="更新内容" width="320"></el-table-column>

        <el-table-column label="操作" min-width="230">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-download" circle @click="handleDownload(scope.$index, scope.row)">
            </el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)">
            </el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
        @pagination="fetchData" />

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
            <el-switch v-model="selectApp.updateStatus" :inactive-value="1" :active-value="2"></el-switch>
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
          <el-button type="primary" @click="updateInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getPagingVersions,
    deleteVersion,
    updateVersion
  } from '@/api/update'
  import {
    isEmpty
  } from '@/utils/validate'
  import {
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
        appData: [],
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
        getPagingVersions(this.listQuery).then(response => {
          const pageData = response.data;
          if (pageData) {
            this.appData = pageData.array;
            this.total = pageData.total;
            this.loading = false;
          }
        })
      },
      changeDateFormat(uploadTime) {
        if (isEmpty(uploadTime)) {
          return uploadTime;
        }
        var date = new Date(uploadTime);
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return (date.getFullYear() + "-" + month + "-" + day);
      },
      handleDownload(index, row) {
        //弹出浏览器下载
        if (!isEmpty(row.downloadUrl) && row.downloadUrl !== 'null') {
          window.location.href = process.env.VUE_APP_BASE_URL + "/update/apk/" + row.downloadUrl;
          this.$message({
            type: "success",
            message: "开始下载..."
          });
        } else {
          this.$message({
            type: "error",
            message: "暂无apk下载！"
          });
        }
      },
      handleEdit(index, row) {
        this.selectApp = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['appForm'].clearValidate()
        })
      },
      handleDelete(index, row) {
        this.$confirm("版本删除后将无法恢复, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            deleteVersion(row).then(response => {
              if (response.data) {
                deleteTableItem(this.appData, row, 'versionId');
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
        this.$refs["appForm"].validate(valid => {
          if (valid) {
            updateVersion(this.selectApp).then(response => {
              if (response.data) {
                this.dialogFormVisible = false;
                updateTableItem(this.appData, this.selectApp, 'versionId');
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
