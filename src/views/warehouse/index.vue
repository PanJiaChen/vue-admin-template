<template>
  <div class="app-container">
    <el-form inline style="margin-bottom:-10px" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryWarehouse()" />
      </el-form-item>
      <el-button type="primary" plain @click="queryWarehouse()">查询</el-button>
      <el-button type="primary" plain @click="getWarehouses()">全部</el-button>
      <el-button type="success" plain @click="addWarehouse()">添加</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="pageWarehouses" :height="height-190+'px'">
      <el-table-column v-if="false" prop="warehouse_id" />
      <el-table-column type="index" />
      <el-table-column prop="name" label="仓库名称" width="300px" />
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            @click="modifyWarehouse(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            @click="deleteWarehouse(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row inline="true" style="margin-top:10px">
      <el-col style="text-align:left">
        <el-pagination
          :current-page="currentpage"
          :page-sizes="[5, 20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <!-- dialog -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :width="device=='mobile'?'90%':'60%'"
      :before-close="closeDialog"
    >
      <el-form ref="warehouseForm" :model="warehouseForm" :inline="true" label-position="left" label-width="80px">
        <el-row>
          <el-form-item label="仓库位置: ">
            <el-input v-model="warehouseForm.name" />
          </el-form-item>
        </el-row>
      </el-form>
      <span>
        <el-button type="primary" @click="submitwarehouseForm('warehouseForm')">确定</el-button>
        <el-button type="info" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { query_warehouse, add_warehouse, modify_warehouse, delete_warehouse } from '@/api/storage'
export default {
  // name: "users",
  data() {
    return {
      Warehouses: null,
      pageWarehouses: null,
      listLoading: true,
      pagesize: 20,
      currentpage: 1,
      total: 0,
      input: '',
      dialogTitle: '',
      dialogVisible: false,
      dialogWidth: '50%',
      warehouseForm: {
        name: ''
      },
      height: null
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    this.getWarehouses()
    this.height = document.documentElement.clientHeight
  },
  methods: {
    // 获取全部
    getWarehouses() {
      this.input = ''
      this.queryWarehouse()
    },
    getPageWarehouses: function() {
      this.pageWarehouses = []
      for (
        let i = (this.currentpage - 1) * this.pagesize;
        i < this.total;
        i++
      ) {
        this.pageWarehouses.push(this.Warehouses[i])
        if (this.pageWarehouses.length === this.pagesize) break
      }
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.getPageWarehouses()
    },
    handleCurrentChange(pageNumber) {
      this.currentpage = pageNumber
      this.getPageWarehouses()
    },
    queryWarehouse() {
      this.listLoading = true
      query_warehouse({ name: this.input })
        .then((respond) => {
          this.Warehouses = respond.data
          this.listLoading = false
          this.total = this.Warehouses.length
          this.getPageWarehouses()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('查询仓库信息失败')
        })
    },
    addWarehouse() {
      this.dialogTitle = '添加仓库资料'
      this.dialogVisible = true
    },
    modifyWarehouse(row) {
      this.dialogTitle = '修改仓库资料'
      this.dialogVisible = true
      this.warehouseForm = JSON.parse(JSON.stringify(row))
    },
    deleteWarehouse(row) {
      this.$confirm(
        '是否删除仓库：' + row.name + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delete_warehouse({ warehouse_id: row.warehouse_id })
          .then(() => {
            this.$message.success('删除仓库成功')
            this.qeuryWarehouse()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('删除仓库失败')
          })
      })
    },
    submitwarehouseForm() {
      if (this.dialogTitle === '添加仓库资料') {
        add_warehouse(this.warehouseForm)
          .then(() => {
            this.closeDialog()
            this.queryWarehouse()
            this.$message.success('添加仓库资料成功')
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('添加仓库资料失败')
          })
      } else {
        modify_warehouse(this.warehouseForm)
          .then(() => {
            this.closeDialog()
            this.queryWarehouse()
            this.$message.success('修改仓库资料成功')
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('修改仓库资料失败')
          })
      }
    },
    closeDialog() {
      this.dialogVisible = false
      this.warehouseForm.name = ''
      // this.$refs['userForm'].resetFields()
    }
  }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
