<template>
  <div :class="classObj" class="layout-root">
    <div
      v-if="isMobileAndOpened"
      class="drawer-bg"
      @click="$emit('layout-sidebar', { opened: false })"
    />
    <layout-sidebar
      class="layout-sidebar"
      :show-logo="showLogo"
      :logo-url="sidebarLogoUrl"
      :collapsed="sidebarCollapsed"
      :menu-routes="sidebarMenuRoutes"
      :menu-config="sidebarMenuConfig"
    />
    <div class="layout-main">
      <div :class="{ 'fixed-header': fixedHeader }">
        <layout-navbar :sidebaaar="sidebaaar" @layout-hamburger-click="$emit('layout-sidebar-toggle')" />
      </div>
      <div class="layout-main-slot">
        <slot>
          <p>...</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Layout component.
 *
 * It should be possible to import this component directly without
 * any ties to vue-router, or vuex directly.
 */

import { Navbar, Sidebar } from './components'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Layout',
  components: {
    'layout-navbar': Navbar,
    'layout-sidebar': Sidebar
  },
  props: {
    sidebaaar: {
      type: Object,
      default: () => ({ opened: true, withoutAnimation: true })
    },
    sidebarLogoUrl: {
      type: String,
      required: false
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    sidebarMenuConfig: {
      type: Object,
      default: () => ({})
    },
    sidebarMenuRoutes: {
      type: Array,
      default: () => ([])
    },
    fixedHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sidebarCollapsed() {
      return this.sidebarOpened !== true
    },
    sidebarOpened() {
      const { opened = false } = this.sidebaaar
      // console.log('layout.computed.sidebarOpened', opened)
      return opened
    },
    isMobileAndOpened() {
      const mobile = this.layoutVariant === 'mobile'
      const opened = this.sidebarOpened
      return opened && mobile
    },
    classObj() {
      const opened = this.sidebarOpened
      const mobile = this.layoutVariant === 'mobile'
      const desktop = this.layoutVariant === 'desktop'
      const classMap = {
        'is-layout-sidebar-hidden': !opened,
        'is-layout-sidebar-opened': opened,
        'is-layout-mobile': mobile,
        'is-layout-desktop': desktop
      }
      // console.log('Layout.computed.classObj', classMap)
      return classMap
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.layout-root {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.is-layout-mobile.is-layout-sidebar-opened {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.is-layout-sidebar-hidden .fixed-header {
  width: calc(100% - 54px);
}

.is-layout-mobile .fixed-header {
  width: 100%;
}
</style>
