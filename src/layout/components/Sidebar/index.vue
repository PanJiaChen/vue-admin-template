<template>
  <div :class="classObj" :data-logo-url="logoUrl">
    <sidebar-logo v-if="logoShow" :logo-url="logoUrl" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="collapsed"
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

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutSidebar',

  components: {
    'sidebar-item': () => import('./Item'),
    'sidebar-logo': () => import('./Logo')
  },

  inject: ['layout'],

  props: {
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    menuRoutes: {
      type: Array,
      default: () => []
    }
  },

  computed: {
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
