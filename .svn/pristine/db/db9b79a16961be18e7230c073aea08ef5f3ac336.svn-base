import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
const businessRouter: RouteConfig[] = [
  // 控制台
  {
    path: '/controlPanel',
    component: Layout,
    // redirect: '/controlPanel',
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/controlPanel/index.vue'
          ),
        name: 'controlPanel',
        meta: {
          title: 'controlPanel',
          icon: 'dashboard'
          // affix: true
        }
      }
    ]
  },
  // 数据决策
  {
    path: '/dataDecision',
    component: Layout,
    // redirect: '/controlPanel',
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/dataDecision/index.vue'
          ),
        name: 'dataDecision',
        meta: {
          title: 'dataDecision',
          icon: 'dashboard'
          // affix: true
        }
      }
    ]
  },
  // 权限管理
  {
    path: '/rightsManagement',
    component: Layout,
    redirect: '/rightsManagement/administratorManagement',
    meta: {
      title: 'rightsManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'administratorManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/administratorManagement/index.vue'
          ),
        name: 'administratorManagement',
        meta: {
          title: 'administratorManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'administratorLogs',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/administratorLogs/index.vue'
          ),
        name: 'administratorLogs',
        meta: {
          title: 'administratorLogs'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'characterGroup',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/characterGroup/index.vue'
          ),
        name: 'characterGroup',
        meta: {
          title: 'characterGroup'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 基础数据
  {
    path: '/infrastructure',
    component: Layout,
    redirect: '/infrastructure/dictionaryManagement',
    meta: {
      title: 'infrastructure',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'dictionaryManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/infrastructure/dictionaryManagement/index.vue'
          ),
        name: 'dictionaryManagement',
        meta: {
          title: 'dictionaryManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

export default businessRouter
