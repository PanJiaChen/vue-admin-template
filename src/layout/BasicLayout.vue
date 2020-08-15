<template>
  <pro-layout
    :menus="$router.options.routes"
    :collapsed="!sidebar.opened"
    :theme="theme"
    :layout="layout"
    :content-width="contentWidth"
    :auto-hide-header="autoHideHeader"
    :media-query="query"
    :is-mobile="isMobile"
    :handle-media-query="handleMediaQuery"
    :handle-collapse="handleCollapse"
    :without-animation="sidebar.withoutAnimation"
    :fixed-header="fixedHeader"
  >
    <router-view />
  </pro-layout>
</template>

<script>
import ProLayout from '@/components/ProLayout'
import { mapGetters } from 'vuex'
export default {
  components: { ProLayout },
  data() {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      theme: 'dark'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    device() {
      return this.$store.state.app.device
    },
    isMobile() {
      return this.device === 'mobile'
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    }
  },
  methods: {
    handleMediaQuery(query) {
      this.query = query
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
      }
    },
    handleCollapse(payload) {
      this.$store.dispatch('app/toggleSideBar', payload)
    }
  }
}
</script>

<style>

</style>
