<template>
  <div class="dashboard-container" style="padding:30px;">
    <div class="dashboard-text">name: {{ name }}</div>
    <dl>
      <dt>Right Panel</dt>
      <dd>
        <el-button @click="$store.dispatch('layout/toggleRightPanel')">Right Panel</el-button>
      </dd>
      <dt>Sidebar</dt>
      <dd>
        <el-button @click="$store.dispatch('layout/toggleSidebar')">Sidebar</el-button>
      </dd>
      <dt>SVG Icon</dt>
      <dd>
        <svg-icon />
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
