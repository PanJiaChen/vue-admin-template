<template>
  <div class="layout-sidebar--component">
    <sidebar-logo v-if="showLogo" :collapse="collapse" :logo-url="logoUrl" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="collapse"
        :unique-opened="false"
        :collapse-transition="false"
        v-bind="menuConfig"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './Item'
import SidebarLogo from './Logo'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
    SidebarLogo
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    menuRoutes: {
      type: Array,
      default: () => []
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    logoUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    classObj() {
      const showLogo = this.showLogo
      return {
        'has-logo': showLogo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-sidebar--component {
  .layout-sidebar-logo--component {
    margin: 10px 0;
  }
}
</style>
