import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/construction',
    component: Layout,
    hidden: true,
    redirect: '/construction/index',
    children: [{
      path: 'index',
      name: '建设中',
      component: () => import('@/views/construction/index'),
      meta: { title: '', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/piccmp',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '以图识人',
        component: () => import('@/views/piccmp/index'),
        meta: { title: '以图识人', icon: 'facecompare' },
        // redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/videocmp',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '以片识人',
        component: () => import('@/views/videocmp/index'),
        meta: { title: '以片识人', icon: 'video' },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/schoolmgmt',
    component: Layout,
    redirect: '/schoolmgmt/display',
    name: '学校管理',
    meta: { title: '学校管理', icon: 'school', roles: ['admin'] },
    children: [
      {
        path: 'create',
        name: '创建学校',
        component: () => import('@/views/schoolmgmt/create/index'),
        meta: { title: '创建学校', icon: 'create', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'delete',
        name: '删除学校',
        component: () => import('@/views/schoolmgmt/delete/index'),
        meta: { title: '删除学校', icon: 'delete', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'display',
        name: '查看学校',
        component: () => import('@/views/schoolmgmt/display/index'),
        meta: { title: '查看学校', icon: 'display', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'update',
        name: '修改学校',
        component: () => import('@/views/schoolmgmt/update/index'),
        meta: { title: '修改学校', icon: 'update', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/usermgmt',
    component: Layout,
    redirect: '/usermgmt/display',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user', roles: ['admin'] },
    children: [
      {
        path: 'create',
        name: '创建用户',
        component: () => import('@/views/usermgmt/create/index'),
        meta: { title: '创建用户', icon: 'create', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'delete',
        name: '删除用户',
        component: () => import('@/views/usermgmt/delete/index'),
        meta: { title: '删除用户', icon: 'delete', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'display',
        name: '查看用户',
        component: () => import('@/views/usermgmt/display/index'),
        meta: { title: '查看用户', icon: 'display', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'update',
        name: '修改用户',
        component: () => import('@/views/usermgmt/update/index'),
        meta: { title: '修改用户', icon: 'update', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/facemgmt',
    component: Layout,
    redirect: '/facemgmt/display',
    name: '人脸库管理',
    meta: { title: '人脸库管理', icon: 'facegroup', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'create',
        name: '创建人脸库',
        component: () => import('@/views/facemgmt/create/index'),
        meta: { title: '创建人脸库', icon: 'create', roles: ['admin', 'editor'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'delete',
        name: '删除人脸库',
        component: () => import('@/views/facemgmt/delete/index'),
        meta: { title: '删除人脸库', icon: 'delete', roles: ['admin', 'editor'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'display',
        name: '查看人脸库',
        component: () => import('@/views/facemgmt/display/index'),
        meta: { title: '查看人脸库', icon: 'display', roles: ['admin', 'editor'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '系统设置',
        component: () => import('@/views/settings/index'),
        meta: { title: '系统设置', icon: 'settings', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },

  {
    path: '/logmgmt',
    component: Layout,
    redirect: '/logmgmt/userlog',
    name: '日志管理',
    meta: { title: '日志管理', icon: 'log', roles: ['admin'] },
    children: [
      {
        path: 'syslog',
        name: '系统日志',
        component: () => import('@/views/logmgmt/syslog/index'),
        meta: { title: '系统日志', icon: 'syslog', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      },
      {
        path: 'userlog',
        name: '用户操作日志',
        component: () => import('@/views/logmgmt/userlog/index'),
        meta: { title: '用户操作日志', icon: 'user', roles: ['admin'] },
        redirect: '/construction' //  TODO：未开发的功能会自动跳转到建设中页面，完成后请去除此行
      }
    ]
  },
  /*
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
      roles: ['admin']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
   */
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
