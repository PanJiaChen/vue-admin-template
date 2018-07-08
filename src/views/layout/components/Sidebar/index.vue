<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
    >
      <sidebar-item v-for="route in availableRoutes" :key="route.name" :item="route" :base-path="topPath+route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

const DISTRIBUTED_MENU = true

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    topRoute() {
      return this.$route.matched[0]
    },
    topPath() {
      return DISTRIBUTED_MENU
        ? this.topRoute.path + '/'
        : ''
    },
    availableRoutes() {
      const {
        options: {
          routes
        }
      } = this.$router

      if (!DISTRIBUTED_MENU) {
        return routes
      }

      const theRoutes = routes.find(r => r.path === this.topRoute.path)

      return theRoutes.children || []
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
