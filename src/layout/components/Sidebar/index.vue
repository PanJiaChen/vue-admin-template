<template>
  <div :class="classObj" :data-logo-url="logoUrl">
    <sidebar-logo v-if="logoShow" :logo-url="logoUrl" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="collapsed"
        :unique-opened="false"
        :collapse-transition="false"
        v-bind="elMenuConfig"
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
  name: 'LayoutSidebar',

  components: {
    SidebarItem,
    SidebarLogo
  },

  inject: ['layout'],

  computed: {
    elMenuConfig() {
      const elMenuConfig = {}
      if ('sidebarMenuConfig' in this.layout) {
        const sidebarMenuConfig = this.layout.sidebarMenuConfig
        Object.assign(elMenuConfig, sidebarMenuConfig)
      }
      return elMenuConfig
    },

    /**
     * Access the App's root Vue Router's Array of RouteConfig.
     *
     * Type Annotation above might not work, but it's there should somebody else want to know.
     *
     * This computed method should return an array RouteConfig only if it finds it.
     *
     * ```javascript
     * const menuRoutes = [
     *   {
     *     path: "/login",
     *     hidden: true,
     *     component: {},
     *   },
     *   {
     *     path: "/",
     *     redirect: "/dashboard",
     *     children: [
     *       {
     *         path: "dashboard",
     *         name: "Dashboard",
     *         meta: {
     *           title: "Dashboard",
     *           icon: "dashboard"
     *         }
     *       }
     *     ]
     *   }
     * ]
     * ```
     */
    menuRoutes() {
      /** @type {Array<import('vue-router').RouteConfig[]} */
      const routes = []
      if (this.layout) {
        const { $router } = this.layout.$root
        const routerOptions = $router.options
        if ('routes' in routerOptions && Array.isArray(routerOptions.routes || false)) {
          routes.push(...routerOptions.routes)
        }
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
  },

  mounted() {
    const hasRoutes = this.menuRoutes.length > 1
    console.log('layout/components/sidebar', { hasRoutes })
    if (hasRoutes) {
      const routes = this.menuRoutes
      console.log('layout/components/sidebar routes', JSON.stringify(routes))
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
