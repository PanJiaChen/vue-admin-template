<template>
  <div class="app-container">
    <div>{{ path }}</div>
    <el-upload
      class="upload"
      drag
      action="/api/file/upload"
      multiple
      :http-request="multipartUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { mapGetters } from 'vuex'
import store from '@/store'
import axios from 'axios'
import { UploadChunk } from '@/api/file'

export default {
  props: ['path'],
  store,
  data() {
    return {
      loadingtext: 'Loading1',
      fileHash: ''
    }
  },
  computed: {
    ...mapGetters([
      'UploadId'
    ])
  },
  methods: {
    multipartUpload(params) {
      const file = params.file
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

        // 初始化分块传输

        const res = this.multipartInit(fileSize, fileHash)
        this.fileHash = fileHash
        loading.close()
        res.then(function(response) {
          const uploadid = response.data.data.UploadId
          UploadChunk(file, uploadid)
        })
      })()
    },
    multipartInit(filesize, filehash) {
      const data = {
        filePath: this.path,
        fileHash: filehash,
        fileSize: filesize

      }

      // 发送 POST 请求
      return axios({
        method: 'post',
        url: '/api/file/chunk/init',
        data
      })
      // this.$store
      //   .dispatch('user/uploadInit', data) // 请求初始化
      //   .then(function(params) {
      //     // console.log('123123', params)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    // 分读取
    getStreamReader(file, chunkSize = 5 * 1024 * 1024) {
      const reader = new FileReader()
      let offset = 0
      return function() {
        return new Promise(function(resolve, reject) {
          if (offset >= file.size) return resolve(null)

          console.log('filename:', file.name, (offset / file.size) * 100 + '%')

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

