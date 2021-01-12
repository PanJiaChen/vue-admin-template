<template>
  <div class="error">
    <el-row>
      <el-button type="success" size="mini" plain @click="query_error">全部</el-button>
      <el-button type="danger" size="mini" plain @click="delete_error">清除</el-button>
    </el-row>
    <el-table :data="error_data" size="mini" border>
      <el-table-column prop="name" label="用户" />
      <el-table-column prop="err" label="错误" width="300px" />
      <el-table-column prop="vm" label="组件" width="100px" />
      <el-table-column prop="info" label="信息" width="100px" />
      <el-table-column prop="timestamp" label="时间戳" width="200px" />
    </el-table>
  </div>
</template>

<script>
import { error_query, error_delete } from '@/api/user'
export default {
  name: 'Error',
  data() {
    return {
      error_data: []
    }
  },
  activated() {
    this.query_error()
  },
  methods: {
    query_error() {
      error_query()
        .then((res) => {
          this.error_data = res.data
          this.$message.success('获取错误成功')
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取错误失败')
        })
    },
    delete_error() {
      error_delete()
        .then(() => {
          this.query_error()
          this.$message.success('获取错误成功')
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取错误失败')
        })
    }
  }
}
</script>

<style scoped>
.error {
    padding: 20px;
}
</style>
