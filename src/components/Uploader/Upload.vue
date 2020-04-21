<template>
  <div class="app-container">
    <el-upload
      class="upload"
      drag
      action="/api/file/upload"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
  </div>
</template>

<script>
export default {

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

