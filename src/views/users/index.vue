<template>
  <div class="app-container">
    <el-form inline @submit.native.prevent>
      <el-row style="margin-bottom:-10px">
        <el-form-item>
          <el-input v-model="input" placeholder="输入查询条件" @keyup.enter.native="queryUser()" />
        </el-form-item>
        <el-button type="primary" plain @click="queryUser()">查询</el-button>
        <el-button type="primary" plain @click="getUsers()">全部</el-button>
        <el-button type="success" plain @click="addUser()">添加</el-button>
      </el-row>
    </el-form>
    <el-table v-loading="listLoading" :data="pageUsers" :height="height-190+'px'">
      <el-table-column v-if="false" prop="user_id" />
      <el-table-column v-if="false" prop="roles" />
      <el-table-column type="index" />
      <el-table-column prop="user" label="用户名" width="80px" />
      <el-table-column prop="name" label="姓名" width="80px" />
      <el-table-column prop="birthday" label="生日" width="100px" />
      <el-table-column prop="position" label="职位" width="80px" />
      <el-table-column prop="mobile" label="联系方式" width="120px" />
      <el-table-column prop="entry_time" label="入职日期" width="120px" />
      <el-table-column prop="address" label="地址" width="250px" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            @click="modifyUser(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            @click="deleteUser(scope.row)"
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
      width="80%"
      :before-close="closeDialog"
    >
      <el-form ref="userForm" :rules="rules" :model="userForm" :inline="true" label-position="left" label-width="90px">
        <el-row>
          <el-col :span="14">
            <el-form-item label="用户名:" prop="user">
              <el-input v-model="userForm.user" :disabled="isEdit" />
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="userForm.name" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="职务:" prop="position">
              <el-select v-model="userForm.position" placeholder="请选择用户组">
                <el-option label="管理员" value="管理员" />
                <el-option label="总经理" value="总经理" />
                <el-option label="业务" value="业务" />
                <el-option label="生产" value="生产" />
                <el-option label="核料" value="核料" />
                <el-option label="统计" value="统计" />
                <el-option label="财务" value="财务" />
                <el-option label="跟单" value="跟单" />
                <el-option label="采购" value="采购" />
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式: " prop="mobile">
              <el-input v-model="userForm.mobile" />
            </el-form-item>
            <el-form-item label="出生日期:">
              <el-date-picker
                v-model="userForm.birthday"
                type="date"
                placeholder="选择日期"
                style="width:200px"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="入职日期:">
              <el-date-picker
                v-model="userForm.entry_time"
                type="date"
                placeholder="选择日期"
                style="width:200px"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="地址:">
              <el-input v-model="userForm.address" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-row style="font-size:16px ">用户权限</el-row>
            <div v-for="(item, index) in roles" :key="index">
              <el-form-item style="margin-bottom:-5px; font" size="small" :label="item.label">
                <el-radio-group v-model="item.role">
                  <el-radio :label="2">编辑</el-radio>
                  <el-radio :label="1">查看</el-radio>
                  <el-radio :label="0">不可见</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span>
        <el-button type="primary" @click="submitUserForm('userForm')">确定</el-button>
        <el-button type="info" @click="closeDialog()">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryUsers,
  addUsers,
  modifyUsers,
  deleteUsers
} from '@/api/user'
export default {
  // name: "users",
  data() {
    return {
      Users: null,
      pageUsers: null,
      listLoading: true,
      pagesize: 20,
      currentpage: 1,
      total: 0,
      input: '',
      dialogTitle: '',
      dialogVisible: false,
      userForm: {
        user: '',
        password: '',
        name: '',
        position: '',
        mobile: '',
        entry_time: null,
        address: ''
      },
      roles: [{
        label: '测试',
        role: 0
      }, {
        label: '测试2',
        role: 0
      }],
      isEdit: false,
      height: null,
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入联系方式', trigger: 'blur' }]
      }
    }
  },
  computed: {
    position() {
      return this.$store.state.user.position
    }
  },
  mounted() {
    // if (this.position !== '管理员') {
    //   this.$router.push('/404')
    // }
    this.getUsers()
    this.height = document.documentElement.clientHeight
  },
  methods: {
    getUsers() {
      this.listLoading = true
      this.input = ''
      this.queryUser()
    },
    getPageUsers: function() {
      this.pageUsers = []
      for (
        let i = (this.currentpage - 1) * this.pagesize;
        i < this.total;
        i++
      ) {
        this.pageUsers.push(this.Users[i])
        if (this.pageUsers.length === this.pagesize) break
      }
    },
    handleSizeChange(size) {
      this.pagesize = size
      this.getPageUsers()
    },
    handleCurrentChange(pageNumber) {
      this.currentpage = pageNumber
      this.getPageUsers()
    },
    queryUser() {
      this.listLoading = true
      queryUsers({ inputStr: this.input })
        .then((respond) => {
          this.Users = respond.data
          this.listLoading = false
          this.total = this.Users.length
          this.getPageUsers()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addUser() {
      this.dialogTitle = '添加用户'
      this.isEdit = false
      this.dialogVisible = true
    },
    modifyUser(row) {
      this.isEdit = true
      this.dialogTitle = '修改用户'
      this.dialogVisible = true
      this.userForm = JSON.parse(JSON.stringify(row))
      if (this.userForm.roles) {
        this.roles = this.userForm.roles
      }
    },
    deleteUser(row) {
      this.$confirm(
        '是否删除用户：' + row.user + '姓名：' + row.name + '?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteUsers({ user_id: row.user_id })
          .then(() => {
            this.$message.success('删除用户成功')
            this.queryUsers()
          })
          .catch((err) => {
            this.$message.error('删除用户失败' + err)
          })
      })
    },
    submitUserForm() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.userForm.roles = this.roles
          if (this.dialogTitle === '添加用户') {
            addUsers(this.userForm)
              .then(() => {
                this.closeDialog()
                this.getUsers()
                this.$message.success('添加用户成功')
              })
              .catch((err) => {
                this.$message.error('添加用户失败' + err)
              })
          } else {
            modifyUsers(this.userForm)
              .then(() => {
                this.closeDialog()
                this.getUsers()
                this.$message.success('修改用户成功')
              })
              .catch((err) => {
                this.$message.error('修改用户失败' + err)
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
      this.$refs['userForm'].resetFields()
      this.userForm.user = ''
      this.userForm.password = ''
      this.userForm.name = ''
      this.userForm.position = ''
      this.userForm.mobile = ''
      this.userForm.entry_time = ''
      this.userForm.address = ''
    }
  }
}
</script>

<style>
.el-form .el-row {
  margin-bottom: 10px;
}
</style>
