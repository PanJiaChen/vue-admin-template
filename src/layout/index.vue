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
      :menu-routes="sidebarMenuRoutes"
      :menu-config="sidebarMenuConfig"
    />
    <div class="layout-main">
      <div :class="{ 'fixed-header': fixedHeader }">
        <layout-navbar @layout-hamburger-click="toggleOpenedSidebar(sidebaaar)" />
      </div>
      <div class="layout-main-slot">
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

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Layout',

  components: {
    'layout-navbar': () => import('./components/Navbar'),
    'layout-sidebar': () => import('./components/Sidebar'),
    'layout-right-panel': () => import('./components/right-panel')
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
  },

  provide() {
    return {
      layout: this
    }
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
