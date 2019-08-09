/**
 * Layout Sidebar Menu (i.e. application main menu) mixin.
 *
 * Abstracts out how to define routes, either by using current vue-router
 * routes schema, or seeding from a different data source.
 */

/** @type {import('vue').VueConstructor} */
const main = {
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
