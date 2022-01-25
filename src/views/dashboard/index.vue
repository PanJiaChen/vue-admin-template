<template>
  <div class="dashboard-container">
    <h5>解决el-mennu的下拉框选不中的问题</h5>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <!-- :hide-timeout="15000" -->
      <el-submenu popper-class="private-popper-calss" index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <!-- :hide-timeout="20000" -->
        <el-submenu popper-class="private-popper-two-calss" index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.private-popper-calss{
  width: 100px;
  // background-color: green;
  .el-menu--popup {
    min-width: 100px;
    width: 100px;
    // background-color: red;
  }
  .el-menu .el-menu-item {
    min-width: 100px;
    width: 100px;
    // background-color: aqua;
    .private-popper-two-calss{
      width: 100px;
      // background-color: green;
      .el-menu--popup {
        min-width: 100px;
        width: 100px;
        // background-color: red;
      }
      .el-menu .el-menu-item {
        width: 100px;
        min-width: 100px;
        background-color: aqua;
      }
    }
  }
}
</style>
