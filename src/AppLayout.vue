<template>
  <layout
    :sidebaaar="sidebar"
    :fixed-header="fixedHeader"
    :sidebar-menu-config="sidebarMenuConfig"
    :sidebar-menu-routes="sidebarMenuRoutes"
    :sidebar-logo-url="sidebarLogoUrl"
    :show-logo="sidebarLogo"
    @layout-click-outside="handleClickOutside"
    @layout-sidebar="handleSidebar"
    @layout-sidebar-toggle="handleLayoutToggleSidebar"
    @layout-variant="handleLayoutVariant"
    @logout="handleLogout"
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

import { mapState, mapGetters } from 'vuex'
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
      layoutVariant: state => state.layout.device,
      sidebarLogo: state => state.settings.sidebarLogo,
      sidebarOpened: state => state.layout.sidebar.opened
    }),
    ...mapGetters(['sidebar', 'device']),
    variables() {
      return variables
    },
    sidebarLogoUrl() {
      let sidebarLogoUrl = 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
      sidebarLogoUrl = 'http://lorempixel.com/400/200/'
      return sidebarLogoUrl
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
        this.$store.dispatch('layout/closeSideBar', { withoutAnimation: true })
      }
    }
  },
  methods: {
    async handleSidebar({ opened = false }) {
      const sidebarOpened = this.sidebar.opened
      if (opened !== sidebarOpened) {
        await this.handleLayoutToggleSidebar()
      }
    },
    async handleLayoutVariant(layoutVariant) {
      const isString = typeof layoutVariant === 'string'
      if (isString && layoutVariant !== this.layoutVariant) {
        await this.$store.dispatch('layout/toggleDevice', layoutVariant)
      }
    },
    async handleClickOutside() {
      await this.$store.dispatch('layout/closeSideBar', { withoutAnimation: false })
    },
    async handleLogout() {
      const redirect = this.$route.fullPath
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${redirect}`)
    },
    async handleLayoutToggleSidebar() {
      // const opened = this.sidebar.opened
      // console.log('handleSidebar', { opened })
      await this.$store.dispatch('layout/toggleSideBar')
    }
  }
}
</script>
