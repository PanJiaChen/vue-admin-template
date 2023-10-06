import Vue from "vue";
import Router from "vue-router";
import clubHome from "../views/club/clubHome.vue";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "home" },
      },
    ],
  },

  {
    path: "/joinClub",
    component: Layout,
    redirect: "/joinClub/list",
    name: "JoinClub",
    meta: { title: "加入社团", icon: "el-icon-s-help" },
    children: [
      {
        path: "list",
        name: "List",
        component: () => import("@/views/joinClub/list"),
        meta: { title: "社团列表", icon: "list2" },
      },
    ],
  },

  {
    path: "/createClub",
    component: Layout,
    redirect: "/createClub/create",
    name: "createClub",
    meta: { title: "创建社团", icon: "user" },
    children: [
      {
        path: "create",
        name: "Create",
        component: () => import("@/views/createClub/create.vue"),
        meta: { title: "申请创建社团", icon: "form" },
      },
    ],
  },
  {
    path: "/club",
    component: Layout,
    name: "Club",
    redirect: "/club/home",
    meta: { title: "社团管理" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/myClub/home.vue"),
        meta: { title: "我的社团", icon: "club" },
      },
    ],
  },
  {
    path: "/manage",
    component: Layout,
    name: "Manage",
    meta: { title: "管理面板", icon: "nested" },
    children: [
      {
        path: "apply",
        name: "Apply",
        component: () => import("@/views/manage/apply.vue"),
        meta: { title: "申请管理" },
      },
      {
        path: "news",
        name: "News",
        component: () => import("@/views/manage/news.vue"),
        meta: { title: "公告管理" },
      },
      {
        path: "club",
        name: "club",
        component: () => import("@/views/manage/club.vue"),
        meta: { title: "社团管理" },
      },
    ],
  },
  {
    path: "/self",
    component: Layout,
    name: "Self",
    meta: { title: "个人中心", icon: "user" },
    children: [
      {
        path: "selfinfo",
        name: "selfinfo",
        component: () => import("@/views/self/selfinfo"),
        meta: { title: "个人信息", icon: "info" },
      },
      {
        path: "selfapply",
        name: "selfapply",
        component: () => import("@/views/self/selfapply"),
        meta: { title: "我的申请", icon: "apply" },
      },
    ],
  },

  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
