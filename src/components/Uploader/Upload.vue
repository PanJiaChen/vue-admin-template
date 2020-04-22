<template>
  <div class="app-container">
    <div>{{ path }}</div>
    <el-upload
      class="upload"
      drag
      action="/api/file/upload"
      multiple
      :http-request="multipartUpload"
      :before-upload="InitmultipartUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
export default {
  props: ['path'],
  data() {
    return {
      loadingtext: 'Loading1',
      fileHash: ''
    }
  },
  methods: {
    InitmultipartUpload(file) {
      const fileName = file.name
      const fileSize = file.size
      // const fileType = file.type

      // 加载动画
      const loading = this.$loading({
        lock: true,
        text: '正在加载' + ' : ' + fileName,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log('init')

      const read = this.getStreamReader(file);
      (async() => {
        let chunk
        const hasher = sha1.create()
        while ((chunk = await read())) {
          hasher.update(chunk)
        }
        // 生成文件Hash
        var fileHash = hasher.hex()
        console.log(fileHash)

        loading.close()

        // 初始化分块传输
        await this.multipartInit(fileSize, fileHash)
      })()
    },
    multipartUpload(params) {
      console.log('upload')
    },
    multipartInit(filesize, filehash) {
      const data = {
        filePath: this.path,
        fileHash: filehash,
        fileSize: filesize
      }
      console.log(data)

      this.$store
        .dispatch('file/uploadInit', data) // 请求初始化
        .then(() => {

        })
        .catch(() => {
          console.log('catch')
        })
    },
    // 分读取
    getStreamReader(file, chunkSize = 5 * 1024 * 1024) {
      const reader = new FileReader()
      let offset = 0
      return function() {
        return new Promise(function(resolve, reject) {
          if (offset >= file.size) return resolve(null)

          // console.log('filename:', file.name, (offset / file.size) * 100 + '%')

          reader.onloadend = function() {
            resolve(reader.result)
            offset = offset + chunkSize
          }
          reader.onerror = reject
          reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
        })
      }
    }

  }
}

</script>

<style scoped>
.upload{
 text-align: center; /*让div内部文字居中*/

    width: 300px;
    height: 350px;
    margin: auto;
    position: relative;
    top: 0;
    left: 80;
    right: 0;
    bottom: 0;
}
 .bg-purple {
    background: blue;
  }

</style>

