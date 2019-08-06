<template>
  <div :class="classObj" class="layout-root">
    <div
      v-if="isMobileAndOpened"
      class="drawer-bg"
      @click="$emit('layout-sidebar', { opened: false })"
    />
    <layout-sidebar
      class="layout-sidebar"
      :collapsed="sidebarCollapsed"
    />
    <div class="layout-main">
      <layout-navbar
        ref="layoutNavbarRef"
        @layout-hamburger-click="toggleOpenedSidebar(sidebaaar)"
      />
      <div
        class="layout-main-slot layout-main-wrapper"
        :style="layoutMainWrapperStyles"
      >
        <slot>
          <p>...</p>
        </slot>
      </div>
    </div>
    <layout-right-panel>
      <slot name="right-panel" />
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

import LayoutNavbar from './components/Navbar'
import LayoutSidebar from './components/Sidebar'
import LayoutRightPanel from './components/right-panel'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Layout',

  components: {
    LayoutNavbar,
    LayoutSidebar,
    LayoutRightPanel
  },

  props: {
    sidebaaar: {
      type: Object,
      default() {
        return {
          opened: true,
          withoutAnimation: false
        }
      }
    },
    rightPanel: {
      type: Object,
      default() {
        return {
          opened: false
        }
      }
    },
    logoUrl: {
      type: String,
      default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    },
    logoHidden: {
      type: Boolean,
      default: false
    },
    // Pass any parameters you get from Element UI theme
    // As parameters for an el-menu object
    // https://element.eleme.io/#/en-US/component/menu#menu-attribute
    sidebarMenuConfig: {
      type: Object,
      default: () => ({
        // backgroundColor: '#304156',
        // textColor: '#bfcbd9',
        // activeTextColor: '#409eff'
      })
    },
    fixedHeader: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      // We'll use Vue to get a more accurate value, see at mounted LifeCycle hook.
      layoutNavbarHeight: '50px'
    }
  },

  computed: {
    layoutMainWrapperStyles() {
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
  },

  provide() {
    return {
      layout: this
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
        // const layoutNavbarHeight = this.layoutNavbarHeight
        // console.log('layout.mounted $refs.layoutNavbarRef', { height, layoutNavbarHeight })
      }
    })
  },

  methods: {
    setSidebarState(state = {}) {
      const changeset = { opened: false, ...state }
      const previousState = { ...this.sidebaaar }
      let hasChanges = false
      for (const [prop, val] of Object.entries(changeset)) {
        if (this.sidebaaar[prop] !== val) {
          hasChanges = true
          this.$set(this.sidebaaar, prop, val)
        }
      }
      if (hasChanges) {
        this.$emit('layout-sidebar', this.sidebaaar)
      }
      const changedState = { ...this.sidebaaar }
      console.log('Layout.methods.setSidebarState', { hasChanges, changeset, previousState, changedState })
    },

    toggleOpenedSidebar(state = {}) {
      const changeset = { opened: false, ...state }
      const { opened } = changeset
      this.setSidebarState({
        opened: !opened
      })
    },

    setRightPanelState(state = {}) {
      const changeset = { opened: false, ...state }
      // const previousState = { ...this.rightPanel }
      let hasChanges = false
      for (const [prop, val] of Object.entries(changeset)) {
        if (this.rightPanel[prop] !== val) {
          hasChanges = true
          this.$set(this.rightPanel, prop, val)
        }
      }
      if (hasChanges) {
        this.$emit('layout-right-panel', this.rightPanel)
      }
      // const changedState = { ...this.rightPanel }
      // console.log('Layout.methods.setRightPanelState', { hasChanges, changeset, previousState, changedState })
    },
    toggleOpenedRightPanel(state = {}) {
      // console.log('Layout.methods.toggleOpenedRightPanel', { ...state })
      const { opened } = state
      this.setRightPanelState({
        opened: !opened
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.layout-main-wrapper {
  background-color: aqua;
}

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

.layout-main-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.layout-navbar.layout-navbar-fixed {
  width: calc(100% - #{$sideBarWidth});
}
.is-layout-sidebar-hidden .layout-navbar-fixed {
  width: calc(100% - 54px);
}
.is-layout-mobile .layout-navbar-fixed {
  width: 100%;
}
</style>
