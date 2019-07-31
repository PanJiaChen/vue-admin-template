<template>
  <layout
    :sidebaaar="sidebar"
    :right-panel="rightPanel"
    :fixed-header="fixedHeader"
    :sidebar-menu-config="sidebarMenuConfig"
    :sidebar-menu-routes="sidebarMenuRoutes"
    :logo-url="logoUrl"
    :logo-hidden="logoHidden"
    @layout-click-outside="handleClickOutside"
    @layout-sidebar="handleLayoutSidebar"
    @layout-right-panel="handleLayoutRightPanel"
    @layout-variant="handleLayoutVariant"
    @logout="handleLogout"
  >
    <app-main />
    <template slot="right-panel">
      Hello world
    </template>
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
      logoHidden: state => false,
      rightPanel: state => state.layout.rightPanel,
      sidebar: state => state.layout.sidebar,
      /* TODO */
      fixedHeader: state => state.settings.fixedHeader,
      layoutVariant: state => state.layout.device,
      sidebarOpened: state => state.layout.sidebar.opened
    }),
    ...mapGetters(['device']),
    variables() {
      return variables
    },
    logoUrl() {
      return void 0
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
    handleLayoutSidebar(state = {}) {
      const changeset = { opened: false, ...state }
      this.$store.commit('layout/SIDEBAR_OPENED', changeset.opened)
    },
    handleLayoutRightPanel(state = {}) {
      const changeset = { opened: false, ...state }
      this.$store.commit('layout/RIGHT_PANEL_OPENED', changeset.opened)
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
    }

  }
}
</script>
