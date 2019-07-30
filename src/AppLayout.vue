<template>
  <layout
    :fixed-header="fixedHeader"
    :sidebar-opened="sidebarOpened"
    :sidebar-menu-config="sidebarMenuConfig"
    :sidebar-menu-routes="sidebarMenuRoutes"
    @layout-click-outside="handleClickOutside"
    @sidebar="handleSidebar"
    @logout="handleLogout"
    @toggle-sidebar="handleToggleSidebar"
    @layout-variant="handleLayoutVariant"
  >
    <app-main />
  </layout>
</template>

<script>
/**
 * Make use of vue-router for use locally.
 * If one were to import this project
 * as a dependency with something similar to
 * Nuxt.js, they'd have to re-implement bindings
 * similar to here.
 */

import { mapState } from 'vuex'
import Layout from '@/layout'
import AppMain from './AppMain'
import variables from '@/styles/variables.scss'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'AppLayout',
  components: {
    Layout,
    AppMain
  },
  computed: {
    ...mapState({
      fixedHeader: state => state.settings.fixedHeader,
      layoutVariant: state => state.app.device,
      sidebarLogo: state => state.settings.sidebarLogo,
      sidebarOpened: state => state.app.sidebar.opened
    }),
    variables() {
      return variables
    },
    sidebarMenuConfig() {
      const defaultActive = this.defaultActive
      const {
        menuBg = '#304156',
        menuText = '#bfcbd9',
        menuActiveText = '#409eff'
      } = this.variables
      return {
        defaultActive,
        backgroundColor: menuBg,
        textColor: menuText,
        activeTextColor: menuActiveText
      }
    },
    sidebarMenuRoutes() {
      return this.$router.options.routes
    },
    defaultActive() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  watch: {
    $route() {
      const isMobile = this.layoutVariant === 'mobile'
      if (isMobile && this.sidebarOpened) {
        this.$emit('layout-sidebar', { opened: false, withoutAnimation: true })
      }
    }
  },
  methods: {
    async handleSidebar({ opened = false }) {
      if (opened !== this.sidebarOpened) {
        await this.handleToggleSidebar()
      }
    },
    async handleLayoutVariant(layoutVariant) {
      const isString = typeof layoutVariant === 'string'
      if (isString && layoutVariant !== this.layoutVariant) {
        await this.$store.dispatch('app/toggleDevice', layoutVariant)
      }
    },
    async handleClickOutside() {
      await this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    async handleLogout() {
      const redirect = this.$route.fullPath
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${redirect}`)
    },
    async handleToggleSidebar() {
      await this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
