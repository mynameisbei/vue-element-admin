import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

/* Layout */
import Layout from '@/layout/index.vue';

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

interface RouteConfig {
  hidden?: boolean;
  meta?: {
    [key: string]: any;
  };
}

export type RouteRaw = RouteRecordRaw & RouteConfig;

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: RouteRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index.vue'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouteRaw[] = [];

const _createRouter = () =>
  createRouter({
    scrollBehavior: () => ({ left: 0 }),
    history: createWebHashHistory(),
    routes: constantRoutes,
  });

const router = _createRouter();

export default router;
