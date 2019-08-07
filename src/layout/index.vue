<template>
  <div :class="classObj" class="layout--component">
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
        class="layout-main-wrapper"
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
import LayoutVariantMixin from './layout-variant'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'Layout',

  components: {
    LayoutNavbar,
    LayoutSidebar,
    LayoutRightPanel
  },

  mixins: [LayoutVariantMixin],

  props: {
    sidebaaar: {
      type: Object,
      default: () => {
        return {
          opened: true,
          withoutAnimation: false
        }
      }
    },

    rightPanel: {
      type: Object,
      default: () => {
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

    /**
     * Sidebar menu configuration.
     *
     * You can pass [any properties that Element UI el-menu][el-menu-attributes] can accept.
     *
     * [el-menu-attributes]: https://element.eleme.io/#/en-US/component/menu#menu-attribute
     *
     * For example:
     *
     * ```js
     * const sidebarMenuConfig = {
     *   backgroundColor: '#304156',
     *   textColor: '#bfcbd9',
     *   activeTextColor: '#409eff'
     * }
     * ```
     *
     * Then
     *
     * ```
     * <layout
     *   :sidebar-menu-config="sidebarMenuConfig"
     * />
     * ```
     */
    sidebarMenuConfig: {
      type: Object,
      default: () => ({})
    },

    /**
     * Sidebar navigation.
     *
     * We can either leverage Vue Router's Array of RouteConfig.
     * The main requirement is that each item has the following shape
     *
     * ```
     * {
     *   path: '/',
     *   name: 'home',
     *   meta: {
     *     title: 'Home',
     *     icon: 'home'
     *   }
     * }
     * ```
     *
     * Vue Router supports meta properties, if we set title and icon, it should work.
     * If you use Nuxt.js, [you can add a meta key in pages][nuxt-router-meta]
     *
     * [nuxt-router-meta]: https://github.com/nuxt/nuxt.js/tree/2.x/examples/routes-meta
     *
     * Or, alternatively, you can pass menu items directly.
     *
     * ```javascript
     * const routes = [
     *   {
     *     path: '/',
     *     redirect: '/dashboard',
     *     children: [
     *       {
     *         path: 'dashboard',
     *         name: 'Dashboard',
     *         meta: {
     *           title: 'Dashboard',
     *           icon: 'dashboard'
     *         }
     *       }
     *     ]
     *   },
     *   {
     *     path: '/about',
     *     name: 'About',
     *     meta: {
     *       title: 'About',
     *       icon: 'user'
     *     }
     *   }
     * ]
     * ```
     *
     * If you have a vue-router instance, when importing layout, you can pass it directly;
     *
     * ```
     * <layout
     *   :sidebar-menu-routes="$router.options.routes"
     * />
     * ```
     *
     * @type {Array<import('vue-router').RouteConfig>}
     */
    sidebarMenuRoutes: {
      type: Array,
      default: () => {
        /** @type {Array<import('vue-router').RouteConfig[]} */
        return [
          {
            path: '/',
            meta: {
              title: 'Home',
              icon: 'dashboard'
            }
          }
        ]
      }

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

.layout--component {
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
