<template>
  <layout
    :sidebar-state="sidebarState"
    :right-panel-state="rightPanel"
    :navbar-state="navbarState"
    :navbar-user-session-box="navbarUserSessionBox"
    :sidebar-menu-config="sidebarMenuConfig"
    :sidebar-menu-routes="$router.options.routes"
    :logo-hidden="logoHidden"
    @layout-sidebar="handleLayoutSidebar"
    @layout-navbar="handleLayoutNavbar"
    @layout-right-panel="handleLayoutRightPanel"
    @layout-variant="handleLayoutVariant"
    @logout="handleLogout"
  >
    <app-main />
    <template #rightPanel>
      <some-random-form />
    </template>
    <template #avatar>
      <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" width="30" height="30">
    </template>
    <template #avatarDropdown>
      <router-link to="/">
        <el-dropdown-item>
          Home
        </el-dropdown-item>
      </router-link>
      <a
        target="_blank"
        href="https://github.com/PanJiaChen/vue-admin-template/pull/449"
      >
        <el-dropdown-item>PanJiaChen/vue-admin-template#449</el-dropdown-item>
      </a>
      <a
        target="_blank"
        href="https://github.com/PanJiaChen/vue-admin-template/"
      >
        <el-dropdown-item>Github</el-dropdown-item>
      </a>
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

import { mapState } from 'vuex'
import Layout from '@/layout'
import AppMain from './AppMain'
import SomeRandomForm from './views/form'
import variables from '@/styles/variables.scss'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'AppLayout',

  components: {
    Layout,
    AppMain,
    'some-random-form': SomeRandomForm
  },

  computed: {
    ...mapState({
      logoHidden: state => state.settings.sidebarLogo === false,
      rightPanel: state => state.layout.rightPanel,
      sidebarState: state => state.layout.sidebar,
      navbarState: state => state.layout.navbar,
      layoutVariant: state => state.layout.device,
      avatarUrl: state => state.layout.device,
      sessionState: state => state.user
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
    navbarUserSessionBox() {
      const {
        avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name = 'Super Admin'
      } = this.sessionState
      return {
        avatar,
        name
      }
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
    handleLayoutNavbar(state = {}) {
      const changeset = { fixed: false, ...state }
      this.$store.commit('layout/NAVBAR_FIXED', changeset.fixed)
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
    async handleLogout() {
      const redirect = this.$route.fullPath
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${redirect}`)
    }
  }
}
</script>
