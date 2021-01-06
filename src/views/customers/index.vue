<template>
  <div class="app-container">
    <el-form size="small" inline @submit.native.prevent>
      <el-row>
        <el-form-item>
          <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryCustomer()" />
        </el-form-item>
        <el-button type="primary" size="small" plain @click="queryCustomer()">查询</el-button>
        <el-button type="primary" size="small" plain @click="getCustomers()">全部</el-button>
        <el-button type="success" size="small" plain @click="addCustomer()">添加</el-button>
      </el-row>
    </el-form>
    <el-table v-loading="listLoading" :data="pageCustomers" size="mini" :height="height-230 + 'px'">
      <el-table-column v-if="false" prop="uuid" />
      <el-table-column prop="company" label="公司名称" width="200px" />
      <el-table-column prop="attribution" label="缩写" width="150px" />
      <el-table-column prop="brand" label="品牌" width="150px" />
      <el-table-column prop="contact" label="联系人" width="80px" />
      <el-table-column prop="mobile" label="电话" width="150px" />
      <el-table-column prop="address" label="地址" width="250px" />
      <el-table-column prop="discription" label="特征" width="300px" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="modifyCustomer(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="deleteCustomer(scope.row)"
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
      <el-form ref="customerForm" :model="customerForm" :inline="true" label-position="left" label-width="80px" size="small">
        <el-row>
          <el-form-item label="公司名称: " prop="company">
            <el-input v-model="customerForm.company" />
          </el-form-item>
          <el-form-item label="缩写: " prop="attribution">
            <el-input v-model="customerForm.attribution" />
          </el-form-item>
          <el-form-item label="品牌: " prop="brand">
            <el-input v-model="customerForm.brand" />
          </el-form-item>
          <el-form-item label="联系人: " prop="contact">
            <el-input v-model="customerForm.contact" />
          </el-form-item>
          <el-form-item label="电话: " prop="mobile">
            <el-input v-model="customerForm.mobile" />
          </el-form-item>
          <el-form-item label="地址: " prop="address">
            <el-input v-model="customerForm.address" />
          </el-form-item>
          <el-form-item label="特征: " prop="discription">
            <el-input
              v-model="customerForm.discription"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              style="width:200px"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <span>
        <el-button type="primary" size="mini" @click="submitcustomerForm('customerForm')">确定</el-button>
        <el-button type="info" size="mini" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllCustomers,
  queryCustomers,
  addCustomers,
  modifyCustomers,
  deleteCustomers
} from '@/api/customer'
export default {
  // name: "users",
  data() {
    return {
      Customers: null,
      pageCustomers: null,
      listLoading: true,
      pagesize: 20,
      currentpage: 1,
      total: 0,
      input: '',
      dialogTitle: '',
      dialogVisible: false,
      dialogWidth: '70%',
      customerForm: {
        company: '',
        brand: '',
        contact: '',
        mobile: '',
        address: '',
        discription: '',
        attribution: ''
      },
      height: null
    }
  },
  mounted() {
    this.getCustomers()
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      this.mobile()
    }
    this.height = document.documentElement.clientHeight
  },
  methods: {
    mobile() {
      this.dialogWidth = '90%'
    },
    getCustomers() {
      this.listLoading = true
      getAllCustomers()
        .then((respond) => {
          console.log(respond)
          this.Customers = respond.data
          this.listLoading = false
          this.total = this.Customers.length
          this.getPageCustomers()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取客户信息失败' + err)
        })
    },
    getPageCustomers: function() {
      this.pageCustomers = []
      for (
        let i = (this.currentpage - 1) * this.pagesize;
        i < this.total;
        i++
      ) {
        this.pageCustomers.push(this.Customers[i])
        if (this.pageCustomers.length === this.pagesize) break
      }
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.getPageCustomers()
    },
    handleCurrentChange(pageNumber) {
      this.currentpage = pageNumber
      this.getPageCustomers()
    },
    queryCustomer() {
      this.listLoading = true
      queryCustomers({ inputStr: this.input })
        .then((respond) => {
          this.Customers = respond.data
          this.listLoading = false
          this.total = this.Customers.length
          this.getPageCustomers()
          this.input = ''
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('查询客户信息失败' + err)
        })
    },
    addCustomer() {
      this.dialogTitle = '添加客户资料'
      this.dialogVisible = true
    },
    modifyCustomer(row) {
      this.dialogTitle = '修改客户资料'
      this.dialogVisible = true
      this.customerForm = JSON.parse(JSON.stringify(row))
    },
    deleteCustomer(row) {
      this.$confirm(
        '是否删除客户：' + row.company + '联系人：' + row.contact + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteCustomers({ uuid: row.uuid })
          .then(() => {
            this.$message.success('删除客户成功')
            this.getCustomers()
          })
          .catch((err) => {
            this.$message.error('删除客户失败' + err)
          })
      })
    },
    submitcustomerForm() {
      if (this.dialogTitle === '添加客户资料') {
        addCustomers(this.customerForm)
          .then(() => {
            this.closeDialog()
            this.getCustomers()
          })
          .catch((err) => {
            this.$message.error('添加客户失败' + err)
          })
      } else {
        modifyCustomers(this.customerForm)
          .then(() => {
            this.closeDialog()
            this.getCustomers()
          })
          .catch((err) => {
            this.$message.error('修改客户失败' + err)
          })
      }
    },
    closeDialog() {
      this.dialogVisible = false
      this.customerForm.company = ''
      this.customerForm.brand = ''
      this.customerForm.contact = ''
      this.customerForm.mobile = ''
      this.customerForm.address = ''
      this.customerForm.discription = ''
      this.customerForm.attribution = ''
      // this.$refs['userForm'].resetFields()
    }
  }
}
</script>

<style>
</style>
