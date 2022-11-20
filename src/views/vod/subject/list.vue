<template>
  <div  class="app-container">
  <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
      prop="title"
      label="名称"
      width="150">
      </el-table-column>
      <el-table-column
      prop="createTime"
      label="创建时间">
      </el-table-column>
  </el-table>

  <div class="el-toolbar">
    <div class="el-toolbar-body" style="justify-content: flex-start;">
      <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 导出</el-button>
    </div>
  </div>

  </div>


</template>

<script>
import subjectApi from '@/api/vod/subject'
export default {
  data() {
      return {
          list:[] //数据字典列表数组
      }
  },
  created() {
      this.getSubList(0)
  },
  methods: {
      //数据字典列表
      getSubList(id) {
          subjectApi.getChildList(id)
              .then(response => {
                  this.list = response.data
              })
      },
      
      exportData() {
        window.open("http://localhost:8301/admin/vod/subject/exportData")
     },

      load(tree, treeNode, resolve) {
          subjectApi.getChildList(tree.id).then(response => {
              resolve(response.data)
          })
    }
  }
}
</script>
