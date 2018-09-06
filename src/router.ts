import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if `hidden: true`, this route will not show in the sidebar (default is false)
    alwaysShow: true             if set to true, it will always show the root menu
                                 if not set, only show with nested mode if there are more than one route under its children
  }
*/

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue') },
    { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue') },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      meta: { hidden: true },
      children: [{
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      }],
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
          component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
          meta: { title: 'Table', icon: 'table' },
        },
        {
          path: 'tree',
          name: 'Tree',
          component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
          meta: { title: 'Tree', icon: 'tree' },
        },
      ],
    },
    {
      path: '/form',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Form',
          component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
          meta: { title: 'Form', icon: 'form' },
        },
      ],
    },
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      name: 'Nested',
      meta: { title: 'Nested', icon: 'nested' },
      children: [
        {
          path: 'menu1',
          component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
          name: 'Menu1',
          meta: { title: 'menu1' },
          children: [
            {
              path: 'menu1-1',
              component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
              name: 'Menu1-1',
              meta: { title: 'menu1-1' },
            },
            {
              path: 'menu1-2',
              component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
              name: 'Menu1-2',
              meta: { title: 'menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                  name: 'Menu1-2-1',
                  meta: { title: 'menu1-2-1' },
                },
                {
                  path: 'menu1-2-2',
                  component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                  name: 'Menu1-2-2',
                  meta: { title: 'menu1-2-2' },
                },
              ],
            },
            {
              path: 'menu1-3',
              component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
              name: 'Menu1-3',
              meta: { title: 'menu1-3' },
            },
          ],
        },
        {
          path: 'menu2',
          component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
          name: 'Menu2',
          meta: { title: 'menu2' },
        },
      ],
    },
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/PanJiaChen/vue-admin-template/tree/typescript',
          meta: { title: 'ExternalLink', icon: 'link' },
        },
      ],
    },
    { path: '*', redirect: '/404' },
  ],
});
