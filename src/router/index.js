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
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  }, {
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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '控制台',
        icon: 'dashboard',
        affix: true
      }
    }]
  },

  {
    path: '/list',
    component: Layout,
    redirect: '/list/versions',
    name: 'List',
    meta: {
      title: '数据管理',
      icon: 'example'
    },
    children: [{
        path: 'versions',
        name: 'Versions',
        component: () => import('@/views/list/versions'),
        meta: {
          title: '版本列表'
        }
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: () => import('@/views/list/accounts'),
        meta: {
          title: '账户列表',
        }
      }
    ]
  },

  {
    path: '/add',
    component: Layout,
    redirect: '/add/newVersion',
    name: 'Add',
    meta: {
      title: '数据添加',
      icon: 'form'
    },
    children: [{
        path: 'newVersion',
        name: 'NewVersion',
        component: () => import('@/views/add/newVersion'),
        meta: {
          title: '添加新版本'
        }
      },
      {
        path: 'newAccount',
        name: 'NewAccount',
        component: () => import('@/views/add/newAccount'),
        meta: {
          title: '添加新账户'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/add',
  component: Layout,
  redirect: '/add/newVersion',
  name: 'Add',
  meta: {
    title: '数据添加',
    icon: 'form',
    roles: ['admin', 'editor']
  },
  children: [{
      path: 'newVersion',
      name: 'NewVersion',
      component: () => import('@/views/add/newVersion'),
      meta: {
        title: '添加新版本',
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'newAccount',
      name: 'NewAccount',
      component: () => import('@/views/add/newAccount'),
      meta: {
        title: '添加新账户',
        roles: ['admin']
      }
    }
  ]
}, ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
