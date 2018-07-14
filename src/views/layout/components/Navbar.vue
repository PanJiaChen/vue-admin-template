<template>
  <el-menu class="navbar" mode="horizontal" router :default-active="$route.matched[0].path">
    <template v-if="DISTRIBUTED_MENU">
      <el-menu-item v-for="route in topRoutes" :key="route.path" :index="route.path">
        <svg-icon v-if="route.meta&&route.meta.icon" :icon-class="route.meta.icon"></svg-icon>
        <span v-if="route.meta&&route.meta.title" slot="title">{{route.meta.title}}</span>
      </el-menu-item>
    </template>

    <template v-else>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
    </template>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      DISTRIBUTED_MENU: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    topRoutes() {
      return this.$router.options.routes.filter(r => !r.hidden)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 56px;
  line-height: 56px;
  // border-radius: 0px !important;
  .el-menu-item {
    height: 100%;
  }
  .hamburger-container {
    line-height: 66px;
    height: 100%;
    float: left;
    padding: 0 10px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

