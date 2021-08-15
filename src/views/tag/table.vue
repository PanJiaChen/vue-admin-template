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
          {{ scope.row.tagId }}
        </template>
      </el-table-column>
      <el-table-column label="标签名称">
        <template slot-scope="scope">
          {{ scope.row.tagName }}
        </template>
      </el-table-column>
      <el-table-column label="是否删除" width="110" align="center">
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.isDeleted" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"/>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
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
import { getList } from '@/api/tag'

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
    }
  }
}
</script>
