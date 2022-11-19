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
      load(tree, treeNode, resolve) {
          subjectApi.getChildList(tree.id).then(response => {
              resolve(response.data)
          })
    }
  }
}
</script>
