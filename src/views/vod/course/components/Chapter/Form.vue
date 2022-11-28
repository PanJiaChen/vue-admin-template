<template>
  <!-- 添加和修改章节表单 -->
  <el-dialog :visible="dialogVisible" title="添加章节" @close="close()">
    <el-form :model="chapter" label-width="120px">
      <el-form-item label="章节标题">
        <el-input v-model="chapter.title"/>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="chapter.sort" :min="0"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import chapterApi from '@/api/vod/chapter'
export default {

  data() {
    return {
      dialogVisible: false,
      chapter: {
        sort: 0
      }
    }
  },
  methods: {
    open(chapterId) {
      this.dialogVisible = true
      if (chapterId) {
        chapterApi.getById(chapterId).then(response => {
          this.chapter = response.data
        })
      }
    },

    close() {
      this.dialogVisible = false
      // 重置表单
      this.resetForm()
    },

    resetForm() {
      this.chapter = {
        sort: 0
      }
    },

    saveOrUpdate() {
      if (!this.chapter.id) {
        this.save()
      } else {
        this.update()
      }
    },

    save() {
      this.chapter.courseId = this.$parent.$parent.courseId
      chapterApi.save(this.chapter).then(response => {
        this.$message.success(response.message)
        // 关闭组件
        this.close()
        // 刷新列表
        this.$parent.fetchNodeList()
      })
    },

    update() {
      chapterApi.updateById(this.chapter).then(response => {
        this.$message.success(response.message)
        // 关闭组件
        this.close()
        // 刷新列表
        this.$parent.fetchNodeList()
      })
    }
  }
}
</script>
