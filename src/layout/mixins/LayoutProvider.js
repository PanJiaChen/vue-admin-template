/**
 * LayoutProvider
 *
 * #UpdatingLocalSlot
 *
 * Refer to LayoutDependent mixin for mounting related tasks.
 *
 * In order to make a child component take up the contents of a slot AT USAGE TIME from
 * the top level component (e.g. the Layout component in this project) but keep
 * a way to use locally defined children, should an error occur.
 *
 * This is part of a proposal/question published on [PanJiaChen/vue-admin-template#499][issue-499]
 *
 * This is a solution based on research and lecture found in the following links:
 * - https://vuejs.org/v2/api/#component
 * - https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/render-slot.js#L34
 * - https://github.com/jackmellis/vue-hoc/blob/master/packages/vue-compose/src/utils/componentFromSlot.js#L3
 * - https://michaelnthiessen.com/advanced-vue-controlling-parent-slots
 *
 * [issue-499]: https://github.com/PanJiaChen/vue-admin-template/pull/449
 *
 * @type {() => import('vue').CreateElement}
 */
export const renderSlotHelper = (name) => ({
  functional: true,
  props: {
    ignoreChildrenIfNoError: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const contextData = context.data || {}
    const layoutComponentContext = context.parent.layout
    const scopedSlots = layoutComponentContext.$scopedSlots
    const fn = scopedSlots[name]
    // console.log(`----- renderSlotHelper.is.render for ${name}`, context )
    // console.log(`renderSlotHelper.is.render for ${name}`, { ...scopedSlots } )
    const vnodes = []
    if (fn) {
      const nodes = fn(contextData) || []
      vnodes.push(...nodes)
    } else {
      context.props.ignoreChildrenIfNoError = false
      // console.log(`renderSlotHelper.is.render NO functionalComponentSlotRenderFn for ${name}`)
    }
    if (!context.props.ignoreChildrenIfNoError) {
      // console.log(`renderSlotHelper.is.render ignoreChildrenIfNoError for ${name}`)
      const contextChildren = context.children || []
      vnodes.push(...contextChildren)
      const contextData = context.data
      return h('div', contextData, vnodes)
    }
    // console.log('renderSlotHelper.is.render ALL GOOD')
    return vnodes
  }
})

/** @type {import('vue').VueConstructor} */
const main = {
  provide() {
    return {
      layout: this
    }
  },
  methods: {
    renderSlotHelper
  },
  props: {

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
    }
  }
}

export default main
