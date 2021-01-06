<template>
  <div class="app-container">
    <el-form inline size="small" @submit.native.prevent>
      <el-row>
        <el-form-item>
          <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryMaterial()" />
        </el-form-item>
        <el-button type="primary" size="small" plain @click="queryMaterial()">查询</el-button>
        <el-button type="primary" size="small" plain @click="getMaterials()">全部</el-button>
        <el-button type="success" size="small" plain @click="addMaterial()">添加</el-button>
      </el-row>
    </el-form>
    <el-table v-loading="listLoading" :data="pageMaterials" size="mini" :height="height-230+'px'">
      <el-table-column v-if="false" prop="material_id" label="material_id" />
      <el-table-column v-if="false" prop="type_id" label="type_id" />
      <el-table-column prop="types" label="大类" width="200px" />
      <el-table-column prop="name" label="具体名称" width="300px" />
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="modifyMaterial(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="deleteMaterial(scope.row)"
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
      :width="dialogWidth"
      :before-close="closeDialog"
    >
      <el-form ref="materialForm" :model="materialForm" :inline="true" label-position="left" label-width="80px" size="small">
        <el-row>
          <el-form-item label="面/辅料: ">
            <el-select v-model="materialForm.type_id" placeholder="请选择">
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="类别: ">
            <el-input v-model="materialForm.types" />
          </el-form-item>
          <el-form-item label="具体名称: ">
            <el-input v-model="materialForm.name" />
          </el-form-item>
        </el-row>
      </el-form>
      <span>
        <el-button type="primary" size="mini" @click="submitmaterialForm('materialForm')">确定</el-button>
        <el-button type="info" size="mini" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllMaterials,
  queryMaterials,
  addMaterials,
  modifyMaterials,
  deleteMaterials
} from '@/api/material'
export default {
  // name: "users",
  data() {
    return {
      types: [{
        value: 1,
        label: '面料'
      }, {
        value: 2,
        label: '辅料'
      }, {
        value: 3,
        label: '工费'
      }
      ],
      Materials: null,
      pageMaterials: null,
      listLoading: true,
      pagesize: 20,
      currentpage: 1,
      total: 0,
      input: '',
      dialogTitle: '',
      dialogVisible: false,
      dialogWidth: '70%',
      materialForm: {
        material_id: '',
        type_id: '',
        types: '',
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
    this.getMaterials()
    if (this.device === 'mobile') {
      this.mobile()
    }
    this.height = document.documentElement.clientHeight
  },
  methods: {
    mobile() {
      this.dialogWidth = '90%'
    },
    getMaterials() {
      this.listLoading = true
      getAllMaterials()
        .then((respond) => {
          console.log(respond)
          this.Materials = respond.data
          this.listLoading = false
          this.total = this.Materials.length
          this.getPageMaterials()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取供应商信息失败')
        })
    },
    getPageMaterials: function() {
      this.pageMaterials = []
      for (
        let i = (this.currentpage - 1) * this.pagesize;
        i < this.total;
        i++
      ) {
        this.pageMaterials.push(this.Materials[i])
        if (this.pageMaterials.length === this.pagesize) break
      }
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.getPageMaterials()
    },
    handleCurrentChange(pageNumber) {
      this.currentpage = pageNumber
      this.getPageMaterials()
    },
    queryMaterial() {
      this.listLoading = true
      queryMaterials({ inputStr: this.input })
        .then((respond) => {
          this.Materials = respond.data
          this.listLoading = false
          this.total = this.Materials.length
          this.getPageMaterials()
          this.input = ''
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('查询供应商信息失败')
        })
    },
    addMaterial() {
      this.dialogTitle = '添加供应商资料'
      this.dialogVisible = true
    },
    modifyMaterial(row) {
      this.dialogTitle = '修改供应商资料'
      this.dialogVisible = true
      this.materialForm = JSON.parse(JSON.stringify(row))
    },
    deleteMaterial(row) {
      this.$confirm(
        '是否删除供应商：' + row.name + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteMaterials({ material_id: row.material_id })
          .then(() => {
            this.$message.success('删除供应商成功')
            this.getMaterials()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('删除供应商失败')
          })
      })
    },
    submitmaterialForm() {
      if (this.dialogTitle === '添加供应商资料') {
        addMaterials(this.materialForm)
          .then(() => {
            this.closeDialog()
            this.getMaterials()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error(err.toString())
          })
      } else {
        modifyMaterials(this.materialForm)
          .then(() => {
            this.closeDialog()
            this.getMaterials()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('修改供应商失败')
          })
      }
    },
    closeDialog() {
      this.dialogVisible = false
      this.materialForm.type_id = ''
      this.materialForm.types = ''
      this.materialForm.name = ''
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
