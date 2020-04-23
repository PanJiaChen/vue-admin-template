<template>
  <div class="app-container">
    <el-upload
      class="upload"
      drag
      action="/api/file/upload"
      multiple
      :http-request="upload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    upload(parms) {
      const formData = new FormData()
      formData.append('uploadid', '123')
      formData.append('file', parms.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
        }
      }
      axios.post('/api/file/upload', formData, config).then(function(res) {
        console.log(res)
      })
    }
  }
}
</script>

<style>
.upload{
position: relative;
  left: 100px;
  top: 20px;
}
</style>
