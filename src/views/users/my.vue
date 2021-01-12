<template>
  <div class="app-container">
    <el-row style="font-size:20px">个人资料</el-row>
    <el-row>姓名：{{ userForm.name }}</el-row>
    <el-image :src="imageUrl" class="avatar" />
    <el-row>
      <el-upload :http-request="uploadAvatar" action :show-file-list="false">
        <el-button size="small">上传头像</el-button>
      </el-upload>
    </el-row>
    <el-row>
      旧密码：
      <el-input v-model="userForm.oldpasswd" type="password" />
    </el-row>
    <el-row>
      新密码：
      <el-input v-model="userForm.newpasswd" type="password" />
    </el-row>
    <el-row>
      <el-button size="small" @click="modifyPasswd">确认修改</el-button>
    </el-row>
  </div>
</template>

<script>
import { upload, modifypasswd } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      imageUrl: '',
      userForm: {
        oldpasswd: '',
        newpasswd: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  mounted() {
    this.userForm.name = this.name
    this.imageUrl = process.env.VUE_APP_BASE_API + this.avatar
  },
  methods: {
    uploadAvatar(file) {
      const file_req = new FormData()
      file_req.append('path', 'avatar/')
      file_req.append('file', file.file)
      file_req.append('name', this.userForm.name)
      upload(file_req)
        .then((respond) => {
          this.imageUrl = process.env.VUE_APP_BASE_API + '/media/avatar/' + respond.data
          this.$message.success('上传成功')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    modifyPasswd() {
      modifypasswd(this.userForm)
        .then((respond) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '修改失败',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style>

.avatar {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 100px;
  height: 100px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
}
</style>
