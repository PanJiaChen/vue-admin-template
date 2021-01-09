<template>
  <div class="app-container">
    <el-form inline style="margin-bottom:-10px" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryCustomer()" />
      </el-form-item>
      <el-button type="primary" plain @click="queryCustomer()">查询</el-button>
      <el-button type="primary" plain @click="getCustomers()">全部</el-button>
      <el-button type="success" plain @click="addCustomer()">添加</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="pageCustomers" :height="height-190+'px'">
      <el-table-column v-if="false" prop="customer_id" />
      <el-table-column prop="name" label="公司名称" width="200px" />
      <el-table-column prop="attribution" label="缩写" width="150px" />
      <el-table-column prop="contact" label="联系人" width="80px" />
      <el-table-column prop="contact_mobile" label="电话" width="150px" />
      <el-table-column prop="address" label="地址" width="250px" />
      <el-table-column prop="salesman" label="业务员" width="200px" />
      <el-table-column prop="discription" label="特征" width="300px" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="modifyCustomer(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
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
      <el-form ref="customerForm" :rules="rules" :model="customerForm" :inline="true" label-position="left" label-width="90px">
        <el-form-item label="公司名称:" prop="name">
          <el-input v-model="customerForm.name" />
        </el-form-item>
        <el-form-item label="缩写:" prop="attribution">
          <el-input v-model="customerForm.attribution" />
        </el-form-item>
        <el-form-item label="联系人:" prop="contact">
          <el-input v-model="customerForm.contact" />
        </el-form-item>
        <el-form-item label="电话:" prop="contact_mobile">
          <el-input v-model="customerForm.contact_mobile" />
        </el-form-item>
        <el-form-item label="地址:" prop="address" size="small">
          <el-input v-model="customerForm.address" style="width: 400px" />
        </el-form-item>
        <el-form-item label="备注:" prop="discription" size="small">
          <el-input
            v-model="customerForm.discription"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            style="width:300px"
          />
        </el-form-item>
        <div style="margin-bottom:20px">
          <el-row style="font-weight:bold">业务员：</el-row>
          <div v-for="(item, index) in salesman_group" :key="index" style="display:inline-block; margin-right:10px">
            <span>{{ item }}: </span>
            <el-checkbox v-model="customerForm.salesman[item]" />
          </div>
        </div>
      </el-form>
      <span>
        <el-button type="primary" @click="submitcustomerForm('customerForm')">确定</el-button>
        <el-button type="info" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryCustomers,
  addCustomers,
  modifyCustomers,
  deleteCustomers
} from '@/api/customer'
import { query_salesman } from '@/api/user'
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
        name: '',
        contact: '',
        contact_mobile: '',
        address: '',
        discription: '',
        attribution: ''
      },
      height: null,
      salesman_group: [],
      initial_salesman: null,
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        attribution: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact_mobile: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.device
    }
  },
  mounted() {
    this.getCustomers()
    this.height = document.documentElement.clientHeight
    this.get_salesman()
  },
  methods: {
    get_salesman() {
      query_salesman()
        .then((respond) => {
          const salesman = respond.data
          this.customerForm.salesman = {}
          this.salesman_group = salesman.map((item) => {
            this.customerForm.salesman[item.value] = false
            return item.value
          })
          this.initial_salesman = this.customerForm.salesman
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取业务员信息失败')
        })
    },
    getCustomers() {
      this.input = ''
      this.queryCustomer()
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
      var current_row = JSON.parse(JSON.stringify(row))
      var selected_salesman = current_row.salesman
      current_row.salesman = {}
      this.salesman_group.forEach((item) => {
        if (selected_salesman.indexOf(item) !== -1) {
          current_row.salesman[item] = true
        } else {
          current_row.salesman[item] = false
        }
      })
      this.customerForm = current_row
      this.dialogVisible = true
    },
    deleteCustomer(row) {
      this.$confirm(
        '是否删除客户：' + row.name + '联系人：' + row.contact + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteCustomers({ customer_id: row.customer_id })
          .then(() => {
            this.$message.success('删除客户成功')
            this.queryCustomer()
          })
          .catch((err) => {
            this.$message.error('删除客户失败' + err)
          })
      })
    },
    submitcustomerForm() {
      this.$refs['customerForm'].validate((valid) => {
        if (valid) {
          // 处理业务员
          var res = []
          this.salesman_group.forEach((item) => {
            if (this.customerForm.salesman[item] === true) {
              res.push(item)
            }
          })
          this.customerForm.salesman = res.join(',')
          if (this.dialogTitle === '添加客户资料') {
            addCustomers(this.customerForm)
              .then(() => {
                this.closeDialog()
                this.queryCustomer()
                this.$message.success('添加客户资料成功')
              })
              .catch((err) => {
                console.log(err)
                this.$message.error('添加客户失败')
              })
          } else {
            modifyCustomers(this.customerForm)
              .then(() => {
                this.closeDialog()
                this.queryCustomer()
                this.$message.success('修改客户资料成功')
              })
              .catch((err) => {
                console.log(err)
                this.$message.error('修改客户失败')
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
      this.$refs['customerForm'].resetFields()
      this.customerForm.customer_id = null
      this.customerForm.name = ''
      this.customerForm.contact = ''
      this.customerForm.contact_mobile = ''
      this.customerForm.address = ''
      this.customerForm.discription = ''
      this.customerForm.attribution = ''
      this.customerForm.salesman = this.initial_salesman
    }
  }
}
</script>

<style>
</style>
