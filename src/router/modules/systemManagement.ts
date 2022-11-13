import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const systemManagementRouter: RouteConfig[] = [
  // 系统管理
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/menuManagement',
    meta: {
      title: 'systemManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'menuManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/systemManagement/menuManagement/index.vue'
          ),
        name: 'menuManagement',
        meta: {
          title: 'menuManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'roleManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/systemManagement/roleManagement/index.vue'
          ),
        name: 'roleManagement',
        meta: {
          title: 'roleManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 用户管理
      {
        path: 'personManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/systemManagement/personManagement/index.vue'
          ),
        name: 'personManagement',
        meta: {
          title: 'personManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 员工管理
      {
        path: 'employeeManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/systemManagement/employeeManagement/index.vue'
          ),
        name: 'employeeManagement',
        meta: {
          title: 'employeeManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'procurementProcess',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/procurementProcess/index.vue'
          ),
        name: 'procurementProcess',
        meta: {
          title: 'procurementProcess'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
    ]
  }
]

export default systemManagementRouter
