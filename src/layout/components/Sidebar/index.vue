<template>
  <div :class="classObj">
    <logo
      v-if="showLogo"
      :collapse="collapsed"
    />
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
import SidebarItem from './Item'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    menuRoutes: {
      type: Array,
      default: () => ([])
    },
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classObj() {
      const hasLogo = this.showLogo
      return {
        'has-logo': hasLogo,
        'layout-root-sidebar': true
      }
    }
  }
}
</script>
