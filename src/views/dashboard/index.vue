<template>
  <div class="dashboard-container">
    <!-- <el-card>
      <div slot="header" class="clearfix">
        <span>更新日志</span>
      </div>
      <div class="text item">
      </div>
    </el-card> -->
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  computed: {
    name() {
      return this.$store.state.user.name
    },
    position() {
      return this.$store.state.user.position
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
