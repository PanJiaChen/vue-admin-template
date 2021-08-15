<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="form.blogTitle"/>
      </el-form-item>
      <el-form-item label="自定义路径">
        <el-input v-model="form.blogSubUrl"/>
      </el-form-item>
      <el-form-item label="文章标签">
        <template>
          <el-tag
            v-for="tag in blogTagsVo "
            :key="tag"
            class="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </template>
      </el-form-item>
      <el-form-item label="文章前言">
        <el-input v-model="form.blogPreface" type="textarea"/>
      </el-form-item>
      <el-form-item label="是否允许评论">
        <el-switch v-model="form.enableComment" active-text="允许" inactive-text="不允许" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"/>
      </el-form-item>
      <mavon-editor v-model="form.blogContent" :subfield="false"/>
      <el-form-item id="submit">
        <el-button type="primary" size="medium" @click="onSubmit">发布</el-button>
        <el-button type="primary" plain size="medium" @click="onSave">保存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBlogById, editBlog } from '@/api/blog'

export default {
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      blogTagsVo: [],
      form: {
        blogId: '',
        blogTitle: '',
        blogSubUrl: '',
        blogPreface: '',
        blogContent: '',
        blogCategoryId: '',
        blogCategoryName: '',
        blogTags: '',
        blogStatus: '',
        blogViews: '',
        enableComment: '',
        isDeleted: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  created() {
    this.getRouteQuery()
    this.fetchData()
  },
  methods: {
    handleClose(tag) {
      this.blogTagsVo.splice(this.blogTagsVo.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.blogTagsVo.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    onSubmit() {
      this.$message('submit!')
      this.form.blogTags = this.blogTagsVo.join(',')
      this.form.blog = 1
      editBlog(this.form)
    },
    onSave() {
      this.$message('save!')
      this.form.blogTags = this.blogTagsVo.join(',')
      this.form.blog = 0
      editBlog(this.form)
    },
    fetchData() {
      this.listLoading = true
      getBlogById(this.form.blogId).then(response => {
        this.form = response.data
        this.blogTagsVo = this.form.blogTags.split(',')
        this.listLoading = false
      })
    },
    getRouteQuery() {
      this.form.blogId = this.$route.query.blogId
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

#submit {
  margin-top: 22px;
  text-align: end;
}

.tag {
  margin-right: 11px;
}
</style>

