<template>
  <div class="app-container">
    <div>{{ path }}</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文件夹名">
        <el-input v-model="form.folderName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: ['path'],
  data() {
    return {
      form: {
        folderName: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const data = {
        'zones': this.path,
        'folderName': this.form.folderName
      }
      this.$store
        .dispatch('folder/addFolder', data)
        .then(() => {

        })
        .catch(() => {

        })
    }
  }
}

</script>

<style scoped>

</style>

