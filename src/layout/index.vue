<template>
  <div :class="classObj" class="layout-root">
    <div
      v-if="isMobileAndOpened"
      class="drawer-bg"
      @click="$emit('layout-click-outside')"
    />
    <layout-sidebar
      :show-logo="showLogo"
      :collapsed="sidebarOpened"
      :menu-routes="sidebarMenuRoutes"
      :menu-config="sidebarMenuConfig"
    />
    <div class="layout-root-main">
      <div :class="{ 'fixed-header': fixedHeader }">
        <layout-navbar v-bind="{ ...$attrs }" />
      </div>
      <slot>
        <p>...</p>
      </slot>
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
    sidebarOpened: {
      type: Boolean,
      default: true
    },
    showLogo: {
      type: Boolean,
      default: false
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
    isMobileAndOpened() {
      const mobile = this.layoutVariant === 'mobile'
      const opened = this.sidebarOpened
      return opened && mobile
    },
    classObj() {
      const opened = this.sidebarOpened
      const mobile = this.layoutVariant === 'mobile'
      const desktop = this.layoutVariant === 'desktop'
      return {
        'is-layout-sidebar-hidden': !opened,
        'is-layout-sidebar-opened': opened,
        'is-layout-mobile': mobile,
        'is-layout-desktop': desktop
      }
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
  &.mobile.is-layout-sidebar-opened {
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

.mobile .fixed-header {
  width: 100%;
}
</style>
