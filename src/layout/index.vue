<template>
  <div :class="classObj" class="layout--component">
    <div
      v-if="isMobileAndOpened"
      class="is-layout-focus-backdrop focus-backdrop"
      @click="$emit('layout-sidebar', { opened: false })"
    />
    <layout-sidebar class="layout-sidebar" :collapsed="sidebarCollapsed" />
    <div class="layout-main">
      <layout-navbar
        ref="layoutNavbarRef"
        class="layout-navbar-container"
        @layout-hamburger-click="toggleOpenedSidebar(sidebarState)"
      />
      <div class="layout-main-container" :style="layoutMainContainerStyles">
        <slot>
          <p>...</p>
        </slot>
      </div>
    </div>
    <layout-right-panel>
      <slot name="rightPanel" />
    </layout-right-panel>
  </div>
</template>

<script>
/**
 * Layout component.
 *
 * It should be possible to import this component directly without
 * any ties to vue-router, or vuex directly.
 */

import * as components from './components'
import { LayoutVariant, LayoutProvider, LayoutSidebarMenu } from './mixins'

/** @type {import('vue').VueConstructor} */
const main = {
  name: 'Layout',

  components,

  mixins: [LayoutVariant, LayoutSidebarMenu, LayoutProvider],

  props: {
    navbarState: {
      type: Object,
      default: () => {
        return {
          fixed: false
        }
      }
    },

    sidebarState: {
      type: Object,
      default: () => {
        return {
          opened: true,
          withoutAnimation: false
        }
      }
    },

    rightPanelState: {
      type: Object,
      default: () => {
        return {
          opened: false
        }
      }
    },

    navbarUserSessionBox: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          name: ''
        }
      }
    },

    avatarImageBaseUrl: {
      type: String,
      default: ''
    },

    logoUrl: {
      type: String,
      default:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    },

    logoTitle: {
      type: String,
      default: 'Vue Admin Template'
    },

    logoHidden: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // We'll use Vue to get a more accurate value, see at mounted LifeCycle hook.
      layoutNavbarHeight: '50px'
    }
  },

  computed: {
    layoutMainContainerStyles() {
      const paddingTop = this.layoutNavbarHeight
      const fixedHeader = this.fixedHeader
      const styles = {}
      if (fixedHeader) {
        Object.assign(styles, { paddingTop })
        // const minHeight = `calc(100vh - ${layoutNavbarHeight}`
        // Object.assign(styles, {minHeight})
      }
      return styles
    },

    fixedHeader() {
      return this.navbarState.fixed === true
    },

    sidebarCollapsed() {
      return this.sidebarOpened !== true
    },

    sidebarOpened() {
      const { opened = false } = this.sidebarState
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
      return classMap
    }
  },

  mounted() {
    /**
     * On mounted Vue LifeCycle hook, get the actual Navbar height.
     * Piggy back on the DOM to compute CSS, and get us its value.
     */
    this.$nextTick(() => {
      if ('layoutNavbarRef' in this.$refs) {
        const layoutNavbarRef = this.$refs.layoutNavbarRef
        const { $el } = layoutNavbarRef
        const {
          /** @type {import('Window').document} */
          ownerDocument
        } = $el
        const {
          /** @type {import('Window')} */
          defaultView
        } = ownerDocument
        // defaultView represent window. But this code is sensitive to
        // only running when it is client-side, but using Vue.js' so
        // we do not rely on global object, and will make this code
        // ALSO work on SSR
        const computedStyle = defaultView.getComputedStyle($el)
        const { height } = computedStyle
        this.layoutNavbarHeight = height
      }
    })
  },

  methods: {
    setSidebarState(state = {}) {
      const changeset = { opened: false, ...state }
      let hasChanges = false
      for (const [prop, val] of Object.entries(changeset)) {
        if (this.sidebarState[prop] !== val) {
          hasChanges = true
          this.$set(this.sidebarState, prop, val)
        }
      }
      if (hasChanges) {
        this.$emit('layout-sidebar', this.sidebarState)
      }
    },

    toggleOpenedSidebar(state = {}) {
      const changeset = { opened: false, ...state }
      const { opened } = changeset
      this.setSidebarState({
        opened: !opened
      })
    },

    setNavbarState(state = {}) {
      const changeset = { fixed: false, ...state }
      let hasChanges = false
      for (const [prop, val] of Object.entries(changeset)) {
        if (this.navbarState[prop] !== val) {
          hasChanges = true
          this.$set(this.navbarState, prop, val)
        }
      }
      if (hasChanges) {
        this.$emit('layout-navbar', this.navbarState)
      }
    },

    setRightPanelState(state = {}) {
      const changeset = { opened: false, ...state }
      let hasChanges = false
      for (const [prop, val] of Object.entries(changeset)) {
        if (this.rightPanelState[prop] !== val) {
          hasChanges = true
          this.$set(this.rightPanelState, prop, val)
        }
      }
      if (hasChanges) {
        this.$emit('layout-right-panel', this.rightPanelState)
      }
    },

    toggleOpenedRightPanel(state = {}) {
      const { opened } = state
      this.setRightPanelState({
        opened: !opened
      })
    },

    emitNavigate(event) {
      const isMobileAndOpened = this.isMobileAndOpened
      this.$emit('navigate', event)
      // console.log('Layout.methods.emitNavigate', { isMobileAndOpened })

      if (isMobileAndOpened) {
        this.setSidebarState({
          opened: false
        })
      }
    }
  }
}

export default main
</script>

<style>
.focus-backdrop {
  background: rgba(0, 0, 0, 0.8);
  transition: opacity 0.3s cubic-bezier(0.8, 0.3, 0.1, 1);
}
.is-layout-focus-backdrop {
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>

<style lang="scss" scoped>
.layout--component {
  position: relative;
  height: 100%;
  width: 100%;
  &.is-layout-mobile.is-layout-sidebar-opened {
    position: fixed;
    top: 0;
  }
}
.layout-main-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
