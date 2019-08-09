<template>
  <div :class="classObj" :data-logo-url="logoUrl">
    <layout-sidebar-logo v-if="logoShow" :logo-url="logoUrl" />
    <el-scrollbar wrap-class="scrollbar-container">
      <el-menu v-bind="elMenuConfig">
        <layout-sidebar-item
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
import LayoutSidebarItem from './Item.vue'
import LayoutSidebarLogo from './Logo.vue'
import { LayoutDependent } from '../../mixins'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutSidebar',

  components: {
    LayoutSidebarItem,
    LayoutSidebarLogo
  },

  mixins: [LayoutDependent],

  computed: {
    elMenuConfig() {
      const collapse = this.collapsed
      const elMenuConfig = {
        collapse,
        mode: 'vertical',
        uniqueOpened: false,
        collapseTransition: false
      }
      if ('sidebarMenuConfig' in this.layout) {
        const sidebarMenuConfig = this.layout.sidebarMenuConfig
        Object.assign(elMenuConfig, sidebarMenuConfig)
      }
      return elMenuConfig
    },

    menuRoutes() {
      /** @type {Array<import('vue-router').RouteConfig[]} */
      const routes = []
      if (this.layout) {
        const sidebarMenuRoutes = this.layout.sidebarMenuRoutes
        routes.push(...sidebarMenuRoutes)
      }
      return routes
    },

    logoShow() {
      return this.layout.logoHidden === false
    },

    logoUrl() {
      const logoUrl = this.layout.logoUrl
      return logoUrl
    },

    collapsed() {
      const sidebarCollapsed = this.layout.sidebarCollapsed
      return sidebarCollapsed
    },

    classObj() {
      const logoShow = this.logoShow
      const logoUrlEmpty = String(this.logoUrl).length < 1
      return {
        'layout-sidebar--component': true,
        'layout-sidebar-logo-show': logoShow,
        'layout-sidebar-logo-url-empty': logoUrlEmpty
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
