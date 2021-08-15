<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.blogId }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.blogTitle }}
        </template>
      </el-table-column>
      <el-table-column label="自定义路径url">
        <template slot-scope="scope">
          {{ scope.row.blogSubUrl }}
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          <el-tag v-for="tage in scope.row.blogTags.split(',') " :key="tage" class="tag">
            {{ tage }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.blogViews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.blogStatus === 1" effect="dark" type="success">
            发布
          </el-tag>
          <el-tag v-if="scope.row.blogStatus === 0" effect="dark" type="info">
            草稿
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="评论" width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enableComment === 1" effect="dark" type="success">
            允许评论
          </el-tag>
          <el-tag v-if="scope.row.enableComment === 0" effect="dark" type="info">
            不允许评论
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后修改时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="120">
        <el-button-group slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editBlog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
        </el-button-group>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/blog'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.records
        this.listLoading = false
      })
    },
    editBlog(blog) {
      this.$router.push({ name: 'BlogEdit', query: { blogId: blog.blogId }})
    }
  }
}
</script>

<style scoped>
.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
