<template>
  <div>
    <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/swiper'

export default {
  data() {
    return {
      swiperList: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchList().then(res => {
        this.swiperList = res.data
        this.loading = false
      })
    },
    uploadSuccess(res) {
      if (res.id_list.length > 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.getList()
      }
    }
  }
}
</script>

<style></style>
