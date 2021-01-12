<template>
  <div class="app-container">
    <el-form inline style="margin-bottom:-10px" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryProvider()" />
      </el-form-item>
      <el-button type="primary" plain @click="queryProvider()">查询</el-button>
      <el-button type="primary" plain @click="getProviders()">全部</el-button>
      <el-button type="success" plain @click="addProvider()">添加</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="pageProviders" :height="height-190+'px'" :default-sort="{prop:'types'}">
      <el-table-column type="index" />
      <el-table-column v-if="false" prop="provider_id" label="provider_id" />
      <el-table-column prop="types" label="产品类型" width="100px" />
      <el-table-column prop="attribution" label="缩写" width="100px" />
      <el-table-column prop="provider" label="供应商" width="200px" />
      <el-table-column prop="address" label="工厂地址" width="200px" />
      <el-table-column prop="contact" label="联系人" width="80px" />
      <el-table-column prop="contact_mobile" label="手机号" width="120px" />
      <el-table-column prop="discription" label="特色介绍" width="300px" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            @click="modifyProvider(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            @click="deleteProvider(scope.row)"
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
      :width="device==='desktop'?'70%':'90%'"
      :before-close="closeDialog"
    >
      <el-form ref="providerForm" :rules="rules" :model="providerForm" :inline="true" label-position="left" label-width="90px">
        <el-row>
          <el-form-item label="产品类型: " prop="types">
            <el-input v-model="providerForm.types" />
          </el-form-item>
          <el-form-item label="供应商: " prop="provider">
            <el-input v-model="providerForm.provider" />
          </el-form-item>
          <el-form-item label="名称缩写: " prop="attribution">
            <el-input v-model="providerForm.attribution" />
          </el-form-item>
          <el-form-item label="工厂地址: " prop="address">
            <el-input v-model="providerForm.address" />
          </el-form-item>
          <el-form-item label="联系人: " prop="contact">
            <el-input v-model="providerForm.contact" />
          </el-form-item>
          <el-form-item label="手机号: " prop="contact_mobile">
            <el-input v-model="providerForm.contact_mobile" />
          </el-form-item>
          <el-form-item label="特色介绍: ">
            <el-input
              v-model="providerForm.discription"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              style="width:200px"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <span>
        <el-button type="primary" @click="submitproviderForm('providerForm')">确定</el-button>
        <el-button type="info" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryProviders,
  addProviders,
  modifyProviders,
  deleteProviders
} from '@/api/provider'
export default {
  // name: "users",
  data() {
    return {
      Providers: null,
      pageProviders: null,
      listLoading: true,
      pagesize: 20,
      currentpage: 1,
      total: 0,
      input: '',
      dialogTitle: '',
      dialogVisible: false,
      providerForm: {
        provider_id: '',
        types: '',
        attribution: '',
        provider: '',
        contact: '',
        contact_mobile: '',
        address: '',
        discription: ''
      },
      rules: {
        types: [{ required: true, message: '请输入产品类型', trigger: 'blur' }],
        attribution: [{ required: true, message: '请输入供应商缩写', trigger: 'blur' }],
        provider: [{ required: true, message: '请输入供应商具体名称', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        contact_mobile: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入具体地址', trigger: 'blur' }]
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
    this.getProviders()
    this.height = document.documentElement.clientHeight
  },
  methods: {
    getProviders() {
      this.input = ''
      this.queryProvider()
    },
    getPageProviders: function() {
      this.pageProviders = []
      for (
        let i = (this.currentpage - 1) * this.pagesize;
        i < this.total;
        i++
      ) {
        this.pageProviders.push(this.Providers[i])
        if (this.pageProviders.length === this.pagesize) break
      }
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.getPageProviders()
    },
    handleCurrentChange(pageNumber) {
      this.currentpage = pageNumber
      this.getPageProviders()
    },
    queryProvider() {
      this.listLoading = true
      queryProviders({ inputStr: this.input })
        .then((respond) => {
          this.Providers = respond.data
          this.listLoading = false
          this.total = this.Providers.length
          this.getPageProviders()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('查询供应商信息失败')
        })
    },
    addProvider() {
      this.dialogTitle = '添加供应商资料'
      this.dialogVisible = true
    },
    modifyProvider(row) {
      this.dialogTitle = '修改供应商资料'
      this.dialogVisible = true
      this.providerForm = JSON.parse(JSON.stringify(row))
    },
    deleteProvider(row) {
      this.$confirm(
        '是否删除供应商：' + row.provider + '联系人：' + row.contact + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteProviders({ provider_id: row.provider_id })
          .then(() => {
            this.$message.success('删除供应商成功')
            this.queryProvider()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('删除供应商失败')
          })
      })
    },
    submitproviderForm() {
      this.$refs['providerForm'].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '添加供应商资料') {
            addProviders(this.providerForm)
              .then(() => {
                this.closeDialog()
                this.queryProvider()
                this.$message.success('添加供应商资料成功')
              })
              .catch((err) => {
                console.log(err)
                this.$message.success('添加供应商资料失败')
              })
          } else {
            modifyProviders(this.providerForm)
              .then(() => {
                this.closeDialog()
                this.queryProvider()
                this.$message.success('修改供应商资料成功')
              })
              .catch((err) => {
                console.log(err)
                this.$message.error('修改供应商资料失败')
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.providerForm.types = ''
      this.providerForm.provider = ''
      this.providerForm.attribution = ''
      this.providerForm.contact = ''
      this.providerForm.contact_mobile = ''
      this.providerForm.address = ''
      this.providerForm.discription = ''
      this.$refs['providerForm'].resetFields()
    }
  }
}
</script>

<style>
</style>
